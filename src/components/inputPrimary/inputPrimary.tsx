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
}

const InputPrimary = ({
  label,
  value = "",
  onChange,
  variant,
  disabled,
  setIsValid,
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
        variant="outlined"
        onChange={handleChange}
        error={hasError} // Exibe erro se houver erro de validação ou erro passado como prop
        value={value}
        disabled={disabled}
        inputProps={{
          maxLength: variant === "cpf" ? 14 : undefined, // Define o tamanho máximo para senha
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: hasError
                ? "var(--color-error)" // Cor da borda em estado de erro
                : "var(--color-gray-light)", // Cor padrão da borda
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: hasError
                ? "var(--color-error)" // Cor da borda ao passar o mouse em estado de erro
                : "var(--color-gray-light)", // Cor da borda ao passar o mouse
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: hasError
                ? "var(--color-error)" // Cor da borda em foco em estado de erro
                : "var(--color-white)", // Cor da borda em foco
            },
          },
          "& .MuiInputLabel-root": {
            color: "var(--color-gray-light)", // Cor padrão do label
            "&.Mui-focused": {
              color: hasError ? "var(--color-error)" : "var(--color-white)", // Cor do label em foco
            },
            "&.Mui-error": {
              color: "var(--color-error)", // Cor do label em estado de erro
            },
          },
          width: "100%",
          "& .MuiOutlinedInput-input": {
            color: "var(--color-white)", // Cor do texto digitado
          },
        }}
      />
    </div>
  );
};

export default InputPrimary;
