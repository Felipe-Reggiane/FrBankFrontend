import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

interface PasswordInputProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  setHasError: (value: boolean) => void;
  hasError: boolean;
  setIsValid: (isValid: boolean) => void;
  password?: string;
  isConfirmPassword?: boolean;
  inputVariant?: "outlined" | "filled" | "standard";
}

const PasswordInput = ({
  value = "",
  onChange,
  disabled = false,
  setHasError,
  hasError = false,
  setIsValid,
  password,
  isConfirmPassword = false,
  inputVariant = "outlined",
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,9}$/;

    if (newValue.length >= 6) {
      const isPasswordValid = passwordRegex.test(newValue);
      if (isConfirmPassword && password) {
        setHasError(newValue !== password || !isPasswordValid);
        setIsValid(newValue === password && isPasswordValid);
      } else {
        setHasError(!isPasswordValid);
        setIsValid(isPasswordValid);
      }
    } else {
      setHasError(true);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <FormControl sx={{ width: "100%" }} variant="outlined" error={hasError}>
      <InputLabel
        htmlFor="outlined-adornment-password"
        sx={{
          color: "var(--color-gray-light)", // Cor padrão do label
          "&.Mui-focused": {
            color: "var(--color-white)", // Cor do label em foco
          },
          "&.Mui-error": {
            color: "var(--color-error)", // Cor do label em estado de erro
          },
        }}
      >
        {isConfirmPassword ? "Confirme a senha" : "Senha"}
      </InputLabel>
      <Tooltip
        title={
          isConfirmPassword
            ? "As senhas devem ser iguais"
            : "A senha deve ao menos 1 caracter de cada tipo: letra minúscula, maiúscula, número e caracter especial"
        }
        open={hasError}
        placement="top"
        arrow
        slotProps={{
          popper: {
            sx: {
              "& .MuiTooltip-tooltip": {
                minWidth: "130px",
                fontSize: "16px",
              },
            },
          },
        }}
      >
        {inputVariant === "standard" ? (
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            error={hasError}
            value={value}
            disabled={disabled}
            inputProps={{ maxLength: 9 }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "var(--color-white)" }} />
                  ) : (
                    <Visibility sx={{ color: "var(--color-white)" }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              "& .MuiInput-input": {
                color: "var(--color-white)",
              },
              "&:before": {
                borderBottom: hasError
                  ? "2px solid var(--color-error)"
                  : "1px solid var(--color-white)",
              },
              "&:hover:not(.Mui-disabled, .Mui-error):before": {
                borderBottom: hasError
                  ? "2px solid var(--color-error)"
                  : "1px solid var(--color-white)",
              },
              "&.Mui-focused:after": {
                borderBottom: hasError
                  ? "2px solid var(--color-error)"
                  : "2px solid var(--color-white)",
              },
            }}
          />
        ) : (
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            label={"Senha"}
            onChange={handleChange}
            error={hasError}
            value={value}
            disabled={disabled}
            inputProps={{
              maxLength: 9,
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff
                      sx={{
                        color: "var(--color-white)",
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  ) : (
                    <Visibility
                      sx={{
                        color: "var(--color-white)",
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--color-gray-light)", // Cor da borda padrão
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--color-white)", // Cor da borda ao passar o mouse
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--color-white)", // Cor da borda em foco
              },
              "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--color-error)", // Cor da borda em estado de erro
              },
              "& .MuiOutlinedInput-input": {
                color: "var(--color-white)", // Cor do texto digitado
              },
            }}
          />
        )}
      </Tooltip>
    </FormControl>
  );
};

export default PasswordInput;
