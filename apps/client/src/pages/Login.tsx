// src/pages/Login.tsx

import React from "react";

import FilledBtn from "../components/buttons/filled/FilledBtn";
import Input, { InputType } from "../components/input/Input";
import { validatePassword, validatePhoneNumber } from "../utils/validation";

const Login: React.FC = () => {
    // const handleLogin = async () => {};

    return (
        <div className="">
            <div className="">
                <h1 className="">Login</h1>
                {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}
                {/* <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className=""
                /> */}
                <Input
                    type={InputType.tel}
                    label="Phone"
                    required={true}
                    validate={validatePhoneNumber}
                    err={true}
                />
                {/* {passwordError && <div className="">{passwordError}</div>} */}
                {/* <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className=""
                /> */}
                <Input
                    type={InputType.password}
                    label="Password"
                    required={true}
                    validate={validatePassword}
                    err={true}
                />
                {/* {phoneNumberError && <div className="">{phoneNumberError}</div>} */}

                <FilledBtn text="Login" />
            </div>
        </div>
    );
};

export default Login;
