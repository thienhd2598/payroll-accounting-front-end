import { ApiResponse } from 'services/types';

// Type signIn
type signInKey = "email" | "password";
type SignInParams = Record<signInKey, string>;

type SignInResponse = ApiResponse<{
    access_token: string;
    token_type: string;
    data: {
        id: number;
        phone: string;
        type: string;
        email: string;
        name: string;
        status: string;
        gender: string;
        address: null;
        created_at: Date | null;
        updated_at: Date | null;
        deleted_at: Date | null;
    };
    expires_at: Date | null;
}>

// Type signUp
type signUpKey = "name" | "email" | "phone" | "password" | "passwordConfirmation";
type SignUpParams = Record<signUpKey, string>;

type SignUpResponse = ApiResponse<string>

// Type signOut
type SignOutResponse = ApiResponse<string>;

// Type sendEmailResetPassword
type SendEmailResetPasswordParams = SignInParams;

// Type resetPassword
type ResetPasswordParams = Record<Exclude<signInKey, 'password'>, string>;


export {
    SignInParams,
    SignInResponse,
    SignUpParams,
    SignUpResponse,
    SignOutResponse,
    SendEmailResetPasswordParams,
    ResetPasswordParams
};