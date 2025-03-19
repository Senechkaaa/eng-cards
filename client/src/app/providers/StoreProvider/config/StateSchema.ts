import { LoginSchema } from "@features/AuthByUsername/model/types/LoginSchema";
import { AxiosInstance } from "axios";

export interface StateSchema {
    loginForm?: LoginSchema
    
}

export interface ThunkExtraArg {
    api: AxiosInstance;
  }
  

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
  }