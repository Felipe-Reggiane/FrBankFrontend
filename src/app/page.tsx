"use client";

import styles from "./page.module.css";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

import { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { InputPrimary, PasswordInput } from "@/components";
import { login } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function Home() {
  useAuthGuard(false);
  const router = useRouter();
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const [isCpfValid, setIsCpfValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const { loginSaveToken } = useAuth();

  const handleRegisterClick = () => {
    router.push("/register"); // Redireciona para a página register
  };

  console.log("password", password);

  const onLoginClick = async () => {
    try {
      const response = await login({ cpf, password });
      const data = await response.json();
      if (!response.ok) {
        alert(data.erro || "Erro ao logar");
        return;
      }
      loginSaveToken(data.token);
      router.push("/home");
    } catch (err) {
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formTitle}>
          <CurrencyBitcoinIcon
            sx={{ color: "var(--color-white)", margin: 0, padding: 0 }}
            fontSize="large"
          />
          <h1 className={styles.title}>ank</h1>
        </div>
        <div className={styles.form}>
          <p className={styles.formTitle}>Acessar conta:</p>
          <div className={styles.input}>
            <InputPrimary
              label="CPF"
              variant="cpf"
              onChange={setCpf}
              value={cpf}
              setIsValid={setIsCpfValid}
            />
          </div>
          <div className={styles.input}>
            <PasswordInput
              hasError={hasError}
              setHasError={setHasError}
              onChange={setPassword}
              value={password}
              setIsValid={setIsPasswordValid}
            />
          </div>
          <div className={styles.button}>
            <Button
              variant="contained"
              onClick={onLoginClick}
              disabled={!isCpfValid || !isPasswordValid}
              sx={{
                minWidth: "130px",
                width: "50%",
                backgroundColor: "var(--color-gray-light)",
                color: "var(--color-black)",
                "&:hover": {
                  backgroundColor: "var(--color-primary-light)", // Cor de fundo ao passar o mouse
                  color: "var(--color-white)", // Cor do texto ao passar o mouse
                },
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.registerContainer}>
        <p className={styles.registerText}>Não tem uma conta?</p>
        <Button
          variant="text"
          onClick={handleRegisterClick}
          sx={{
            minWidth: "130px",
            backgroundColor: "var(--color-white)",
            color: "var(--color-primary-dark)",
            "&:hover": {
              backgroundColor: "var(--color-primary)", // Cor de fundo ao passar o mouse
              color: "var(--color-white)", // Cor do texto ao passar o mouse
            },
          }}
        >
          Cadastre-se
        </Button>
      </div>
    </div>
  );
}
