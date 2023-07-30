import React, { useState } from "react";

const FormInputs = (props) => {
  const [focused, setFocused] = useState(false);
  const { handleChange, errorMessage, id, error, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <input
        {...inputProps}
        onChange={handleChange}
        className="peer p-2 rounded-md w-full"
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      {(id === 0 && error === "no user" && (
        <span className="text-xs text-red-600">{errorMessage}</span>
      )) ||
        (id === 1 && error === "wrong password" && (
          <span className="text-xs text-red-600">{errorMessage}</span>
        ))}
      {focused && (
        <span className="peer-invalid:block hidden text-xs text-red-600">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormInputs;
