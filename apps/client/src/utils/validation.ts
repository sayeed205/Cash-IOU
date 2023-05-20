// src/utils/validation.ts
import { isValidNumber } from "libphonenumber-js";

export const validatePhoneNumber = (phoneNumber: string): string | null => {
    if (!phoneNumber) {
        return "Phone is required";
    }
    const isValid = isValidNumber(phoneNumber);
    if (!isValid) {
        return "Phone must be a valid number";
    }

    return null; // Return null if the phone number is valid
};

export const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required";
    if (password.length < 8) return "at least 8 characters long";
    if (!password.match(/[a-z]/g)) return "at least one lowercase letter";
    if (!password.match(/[A-Z]/g)) return " at least one uppercase letter";
    if (!password.match(/[0-9]/g)) return " at least one number";
    if (!password.match(/[^a-zA-Z\d]/g))
        return " at least one special character";
    return null;
};
