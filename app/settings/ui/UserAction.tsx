import { FormEvent, useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@store/rootReducer";
import { updateUser } from "@store/slices/user";

import { User } from "@widgets/User";
import { Popup } from "@ui/Popup";
import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { CodeInput } from "@features/code-input";

interface FormData {
  name: string;
  email: string;
}

const CODE = "1111";

export const UserAction = () => {
  const dispatch = useDispatch();

  const { name, email } = useSelector((state: RootState) => state.user.user);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCodePopup, setShowCodePopup] = useState(false);

  // локальный черновик формы
  const [formData, setFormData] = useState<FormData>({
    name,
    email,
  });

  // email, который ждёт подтверждения через код
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  // код + ошибка
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [isCorrect, setIsCorrect] = useState(true);

  // сохранение
  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();

    // обновляем имя сразу (если изменилось)
    if (formData.name !== name) {
      dispatch(updateUser({ key: "name", value: formData.name }));
    }

    // обновляем email только если он был подтверждён кодом
    if (pendingEmail) {
      dispatch(updateUser({ key: "email", value: pendingEmail }));
      setPendingEmail(null);
    }

    // закрываем все попапы
    setShowEditPopup(false);
    setShowCodePopup(false);

    // сброс кода
    setCode(["", "", "", ""]);
  };

  // проверка кода
  const handleCodeSubmit = (e: FormEvent) => {
    e.preventDefault();

    // если код неверный - показываем ошибку
    if (code.join("") !== CODE) {
      setIsCorrect(false);
      return;
    }

    setIsCorrect(true);
    setShowCodePopup(false);

    // продолжаем сохранение
    handleSubmit();
  };

  // кнопка Save в edit popup
  const handleSaveClick = () => {
    // если email изменился нужен код подтверждения
    if (formData.email !== email) {
      setPendingEmail(formData.email);
      setShowEditPopup(false);
      setShowCodePopup(true);
    } else {
      // иначе просто сохраняем
      setShowEditPopup(false);
      handleSubmit();
    }
  };

  return (
    <>
      {/* USER - Redux */}
      <User
        id={""}
        name={name}
        email={email}
        onClick={() => setShowEditPopup(true)}
        isAccount
      />

      {/* EDIT POPUP */}
      {showEditPopup && (
        <Popup heading="Profile edit" onClose={() => setShowEditPopup(false)}>
          <div className="flex flex-col gap-8">
            {/* локальная форма (черновик) */}
            <div className="flex flex-col gap-4">
              <Input
                id="name"
                placeholder="Name"
                value={formData.name}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, name: value }))
                }
              />

              <Input
                id="email"
                placeholder="Email"
                value={formData.email}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, email: value }))
                }
              />
            </div>

            <Button content="Save" onClick={handleSaveClick} />
          </div>
        </Popup>
      )}

      {/* CODE POPUP */}
      {showCodePopup && (
        <Popup
          heading="Confirm new email"
          onClose={() => {
            // возвращаемся в edit без сохранения
            setShowCodePopup(false);
            setShowEditPopup(true);

            // сброс кода
            setCode(["", "", "", ""]);
            setIsCorrect(true);

            // ВАЖНО:
            // не трогаем Redux и не применяем изменения
            // просто возвращаем старый email в форму
            setFormData((prev) => ({
              ...prev,
              email,
            }));
          }}
        >
          <form className="flex flex-col gap-8" onSubmit={handleCodeSubmit}>
            <div className="flex flex-col gap-2">
              <p>
                Please enter the verification code sent to your new email
                address.
              </p>

              {/* feature input */}
              <CodeInput
                code={code}
                setCode={setCode}
                isCorrect={isCorrect}
                setIsCorrect={setIsCorrect}
              />
            </div>

            <Button
              type="submit"
              content="Save"
              disabled={code.some((c) => c === "")}
            />
          </form>
        </Popup>
      )}
    </>
  );
};
