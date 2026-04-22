import { useDispatch } from "react-redux";
import { clearUser } from "@store/slices/user";

export const useClearSession = () => {
  const dispatch = useDispatch();

  return () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
  };
};
