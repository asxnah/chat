import type { FormEvent, MouseEvent } from "react";

interface ConfirmProps {
  content: string;
  submit: () => void;
  onDecline: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Confirm = ({ content, submit, onDecline }: ConfirmProps) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <form
      className="w-75 rounded-xl bg-(--white) overflow-hidden"
      onSubmit={onSubmit}
    >
      <p className="p-4">{content}</p>
      <div className="flex">
        <button
          type="submit"
          className="flex-1 p-3 px-4 border-0 text-center text-base text-(--red) cursor-pointer"
        >
          Yes
        </button>
        <button
          type="button"
          className="flex-1 p-3 px-8 border-0 text-center text-base cursor-pointer"
          onClick={onDecline}
        >
          No
        </button>
      </div>
    </form>
  );
};
