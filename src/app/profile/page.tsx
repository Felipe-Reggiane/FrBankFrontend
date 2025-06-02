"use client";

import { ButtonDefault, InputPrimary, PasswordInput } from "@/components";
import styles from "./profile.module.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { updateClient } from "@/services/clientService";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const Profile = () => {
  useAuthGuard(true);
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [hasPasswordError, setHasPasswordError] = useState<boolean>(false);
  const [hasConfirmPasswordError, setHasConfirmPasswordError] =
    useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
    useState<boolean>(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setName(decoded.nome || "");
      setCpf(decoded.cpf || "");
      setUserId(decoded.id || null);
      console.log("Dados do cliente:", decoded);
    }
  }, []);

  useEffect(() => {
    if (isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPasswordValid, isPhoneValid]);

  const handleUpdate = async () => {
    if (!userId) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const data: { phone?: string; password?: string } = {};
    if (phone) {
      data.phone = phone;
    }
    if (password) {
      data.password = password;
    }

    try {
      await updateClient(userId, data, token);
      router.push("/home");
    } catch (err) {
      alert("Erro ao atualizar dados");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        <h1 className={styles.title}>Dados Pessoais</h1>
        <InputPrimary
          label="Nome"
          variant="text"
          onChange={setName}
          value={name}
          setIsValid={() => {}}
          disabled
        />
        <div className={styles.infosContainerMobile}>
          <InputPrimary
            label="CPF"
            variant="cpf"
            onChange={setCpf}
            value={cpf}
            setIsValid={() => {}}
            disabled
          />
          <PasswordInput
            hasError={hasPasswordError}
            setHasError={setHasPasswordError}
            onChange={setPassword}
            value={password}
            setIsValid={setIsPasswordValid}
            inputVariant="standard"
          />
          <PasswordInput
            hasError={hasConfirmPasswordError}
            setHasError={setHasConfirmPasswordError}
            onChange={setConfirmPassword}
            value={confirmPassword}
            setIsValid={setIsConfirmPasswordValid}
            password={password}
            isConfirmPassword
            inputVariant="standard"
          />
          <InputPrimary
            label="Telefone"
            variant="phone"
            onChange={setPhone}
            value={phone}
            setIsValid={setIsPhoneValid}
            inputVariant="standard"
          />
        </div>
        <ButtonDefault
          handleClick={handleUpdate}
          text="Editar"
          disabled={!isButtonEnabled}
        />
      </div>
    </div>
  );
};

export default Profile;
