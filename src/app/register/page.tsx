"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Button, useMediaQuery } from "@mui/material";
import { PasswordInput, InputPrimary } from "@/components";
import { useRouter } from "next/navigation";
import { createClient } from "@/services/clientService";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function RegisterScreen() {
  useAuthGuard(false);

  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const [isCpfValid, setIsCpfValid] = useState<boolean>(false);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (isCpfValid && isPhoneValid && isNameValid && isPasswordValid) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCpfValid, isNameValid, isPasswordValid, isPhoneValid]);

  const onRegisterClick = async () => {
    try {
      console.log(name, cpf, password, phone);
      const response = await createClient({ name, cpf, password, phone });
      if (!response.ok) {
        const data = await response.json();
        alert(data.erro || "Erro ao cadastrar");
        return;
      }
      alert("Cadastrado com sucesso!");
      router.push("/");
    } catch (err) {
      alert("Erro de conexão com o servidor");
    }
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registro de Clientes</h1>
      <div
        className={isMobile ? styles.formContainerMobile : styles.formContainer}
      >
        <div className={styles.nameContainer}>
          <InputPrimary
            label="Nome"
            variant="text"
            onChange={setName}
            value={name}
            setIsValid={setIsNameValid}
          />
        </div>
        <div
          className={
            isMobile ? styles.infosContainerMobile : styles.infosContainer
          }
        >
          <InputPrimary
            label="CPF"
            variant="cpf"
            onChange={setCpf}
            value={cpf}
            setIsValid={setIsCpfValid}
          />
          <PasswordInput
            hasError={hasError}
            setHasError={setHasError}
            onChange={setPassword}
            value={password}
            setIsValid={setIsPasswordValid}
          />
          <InputPrimary
            label="Telefone"
            variant="phone"
            onChange={setPhone}
            value={phone}
            setIsValid={setIsPhoneValid}
          />
        </div>
        <div className={styles.button}>
          {isButtonEnabled ? (
            <Button
              variant="contained"
              disabled={!isButtonEnabled}
              onClick={onRegisterClick}
              sx={{
                minWidth: "130px",
                width: "50%",
                backgroundColor: "var(--color-gray-light)",
                color: "var(--color-black)",
                "&:hover": {
                  backgroundColor: "var(--color-primary-light)",
                  color: "var(--color-white)",
                },
              }}
            >
              Cadastrar
            </Button>
          ) : (
            <p className={styles.description}>Preencha todos os dados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
