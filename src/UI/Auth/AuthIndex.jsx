import CreatePassword from "./CreatePassword"
import ForgotPassword from "./ForgotPassword"
import ResetPassword from "./ResetPassword"
import SignIn from "./SignIn"
import OberonSignup from "./SignUpOberon"

import AuthSuccess from "./Success"
import AuthVerify from "./Verify"

export const AuthSignIn = ()=>{
    return <SignIn />
}
export const AuthSignUp = ()=>{
    return <OberonSignup />
}
export const AuthForgotPassword = ()=>{
    return <ForgotPassword />
}
export const AuthResetPassword = ()=>{
    return <ResetPassword />
}

export const AuthCreatePassword = ()=>{
    return <CreatePassword />
}

export const AuthVerified= ()=>{
    return <AuthVerify />
}

export const AuthSuccessful= ()=>{
    return <AuthSuccess />
}

