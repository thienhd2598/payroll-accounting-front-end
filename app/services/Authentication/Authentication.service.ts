import apiClient from "services";
import { PromiseResponse } from "services/types";
import {
  SignInParams,
  SignUpParams,
  SignInResponse,
  SignUpResponse,
  SignOutResponse
} from './Authentication.types';

const signIn = async (payload: SignInParams): PromiseResponse<SignInResponse> => {
  const response = await apiClient.post<SignInResponse>("/auth/signin", payload);  

  return response.data;
};

const signUp = async (payload: SignUpParams): PromiseResponse<SignUpResponse> => {
  const response = await apiClient.post<SignUpResponse>("/auth/signup", payload);

  return response.data;
};

const signOut = async (): PromiseResponse<SignOutResponse> => {
  const response = await apiClient.post<SignOutResponse>("auth/signout");

  return response.data
};

const AuthenService = { signIn, signUp, signOut };

export default AuthenService;