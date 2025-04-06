import { TOKEN_LOCALSTORAGE_KEY } from "@shared/const/localStorage";
import { loginActions } from "../slice/loginSlice";
import { userActions } from "@entities/User";
import { AuthResponce } from "@shared/types/AuthResponce";
import { AppDispatch } from "@app/providers/StoreProvider/config/store";

export function handleAuthSuccess(dispatch: AppDispatch, data: AuthResponce) {
    dispatch(loginActions.setAuth(true));
    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, data.access_token);
    dispatch(userActions.setAuthData(data.user));
}
