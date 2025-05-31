"use client";

import styles from "./page.module.css";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

import { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { InputPrimary, PasswordInput } from "@/components";

export default function Home() {
  const router = useRouter();
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const handleRegisterClick = () => {
    router.push("/register"); // Redireciona para a página register
  };

  console.log("password", password);

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
            />
          </div>
          <div className={styles.input}>
            <PasswordInput
              hasError={hasError}
              setHasError={setHasError}
              onChange={setPassword}
              value={password}
            />
          </div>
          <div className={styles.button}>
            <Button
              variant="contained"
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
