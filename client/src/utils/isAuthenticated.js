import { useSelector } from "react-redux";

export const isAuthenticated = () => {
    const authValue = useSelector((state) => state.auth);

    return authValue.isAuthenticated
}