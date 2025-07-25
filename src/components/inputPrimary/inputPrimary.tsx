import { formatCPF, formatPhone } from "@/utils/format";
import { validateCPF } from "@/utils/validate";
import { TextField } from "@mui/material";
import { useState } from "react";

interface InputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "phone" | "cpf" | "cash" | "text";
  disabled?: boolean;
  setIsValid: (isValid: boolean) => void;
  inputVariant?: "outlined" | "filled" | "standard";
  primaryColor?: boolean;
}

const InputPrimary = ({
  label,
  value = "",
  onChange,
  variant,
  disabled,
  setIsValid,
  inputVariant = "outlined",
  primaryColor = false,
}: InputProps) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    if (variant === "cpf") {
      newValue = formatCPF(newValue);
      if (newValue.length >= 14) {
        const isCpfValid = validateCPF(newValue);
        setIsValid(isCpfValid);
        setHasError(!isCpfValid);
      } else {
        setIsValid(false);
        setHasError(true);
      }
    } else if (variant === "phone") {
      newValue = formatPhone(newValue);
      if (newValue.length >= 15) {
        setIsValid(true);
        setHasError(false);
      } else {
        setIsValid(false);
        setHasError(true);
      }
    } else if (variant === "text" && value.length >= 2) {
      setIsValid(true);
    } else {
      setIsValid(false);
      setHasError(false);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <TextField
        id="outlined-basic"
        label={label}
        variant={inputVariant}
        onChange={handleChange}
        error={hasError}
        value={value}
        disabled={disabled}
        inputProps={{
          maxLength: variant === "cpf" ? 14 : undefined,
        }}
        sx={{
          width: "100%",
          // Outlined styles
          ...(inputVariant === "outlined" && {
            "& .MuiOutlinedInput-root": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: primaryColor
                  ? "var(--color-primary)"
                  : hasError
                  ? "var(--color-error)"
                  : "var(--color-gray-light)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: primaryColor
                  ? "var(--color-primary)"
                  : hasError
                  ? "var(--color-error)"
                  : "var(--color-gray-light)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: primaryColor
                  ? "var(--color-primary)"
                  : hasError
                  ? "var(--color-error)"
                  : "var(--color-white)",
              },
            },
            "& .MuiOutlinedInput-input": {
              color: primaryColor ? "var(--color-black)" : "var(--color-white)",
            },
            "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
              {
                borderColor: primaryColor
                  ? "var(--color-primary)"
                  : "var(--color-gray-light)",
              },
          }),
          // Standard styles
          ...(inputVariant === "standard" && {
            "& .MuiInput-input": {
              color: "var(--color-white)",
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: hasError
                ? "var(--color-error)"
                : "var(--color-gray-light)",
            },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: hasError
                ? "var(--color-error)"
                : "var(--color-gray-light)",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: hasError
                ? "var(--color-error)"
                : "var(--color-white)",
            },
            "&.Mui-disabled .MuiInput-underline:before": {
              borderBottomColor: "var(--color-gray-light)",
            },
          }),
          // Label styles
          "& .MuiInputLabel-root": {
            color: primaryColor
              ? "var(--color-primary)"
              : "var(--color-gray-light)",
            "&.Mui-focused": {
              color: primaryColor
                ? "var(--color-primary)"
                : hasError
                ? "var(--color-error)"
                : "var(--color-white)",
            },
            "&.Mui-error": {
              color: "var(--color-error)",
            },
          },
          "& .Mui-disabled": {
            color: primaryColor
              ? "var(--color-primary)"
              : "var(--color-white) !important",
            WebkitTextFillColor: primaryColor
              ? "var(--color-primary)"
              : "var(--color-white) !important",
          },
        }}
      />
    </div>
  );
};

export default InputPrimary;
