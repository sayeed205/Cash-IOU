import { useState } from "react";
import "./Input.css";

export enum InputType {
    text = "text",
    password = "password",
    tel = "tel",
    email = "email",
    number = "number",
    date = "date",
    time = "time",
    url = "url",
    search = "search",
    color = "color",
    range = "range",
    file = "file",
    month = "month",
    week = "week",
    datetimeLocal = "datetime-local",
    hidden = "hidden",
    image = "image",
    reset = "reset",
    submit = "submit",
}

interface InputProps {
    type: InputType;
    label: string;
    required: boolean;
    validate?: (value: string) => string | null;
    err?: boolean;
}

const Input = (props: InputProps) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (props.validate && props.err) {
            setError(props.validate(newValue) || "");
        }
    };

    return (
        <div className="input-box">
            <input
                type={props.type}
                required={props.required}
                value={value}
                onChange={handleChange}
                className={error ? "error" : ""}
            />
            <label htmlFor="" className={error ? "error-info" : ""}>
                {error ? error : props.label}
            </label>
            {/* {error && <p className="error error-info">{error}</p>} */}
        </div>
    );
};

export default Input;
