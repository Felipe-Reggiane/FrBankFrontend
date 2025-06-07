"use client";

import styles from "./transfer.module.css";
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import {
  getAccounts,
  getAllAccounts,
  transfer,
} from "@/services/accountsService";

const Transfer = () => {
  useAuthGuard(true);

  const [clientAccounts, setClientAccounts] = useState<any[]>([]);
  const [allAccounts, setAllAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [accountOrigin, setAccountOrigin] = useState<any | null>(null);
  const [accountDestination, setAccountDestination] = useState<any | null>(
    null
  );
  const [value, setValue] = useState("");

  const fetchAccounts = async (token: string) => {
    const updatedClientAccounts = await getAccounts(token);
    const updatedAllAccounts = await getAllAccounts(token);
    setClientAccounts(
      Array.isArray(updatedClientAccounts) ? updatedClientAccounts : []
    );
    setAllAccounts(Array.isArray(updatedAllAccounts) ? updatedAllAccounts : []);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetchAccounts(token);
  }, []);

  const handleTransfer = async () => {
    if (!accountOrigin || !accountDestination || !value) {
      alert("Preencha todos os campos.");
      return;
    }

    if (accountOrigin.number === accountDestination.number) {
      alert("A conta origem e destino devem ser diferentes.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await transfer(
        token,
        accountOrigin.number,
        accountDestination.number,
        value
      );

      if (response && response.erro) {
        alert(response.erro);
        return;
      }

      if (!response) {
        const error = await response.json();
        alert(error.erro || "Erro ao realizar transferência.");
        return;
      }

      alert("Transferência realizada com sucesso!");
      setAccountOrigin(null);
      setAccountDestination(null);
      setValue("");
      await fetchAccounts(token);
    } catch (err) {
      alert(err && err.message ? err.message : "Erro de conexão.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Transferência entre Contas</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={styles.form}>
          <Autocomplete
            options={clientAccounts}
            getOptionLabel={(option) =>
              `${option.number} — Saldo + Limite: R$ ${(
                Number(option.balance) + Number(option.limit)
              ).toFixed(2)}`
            }
            value={accountOrigin}
            onChange={(_event, newValue) => setAccountOrigin(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Conta Origem" variant="outlined" />
            )}
          />
          <Autocomplete
            options={allAccounts}
            getOptionLabel={(option) =>
              `${option.number} — Saldo + Limite: R$ ${(
                Number(option.balance) + Number(option.limit)
              ).toFixed(2)}`
            }
            value={accountDestination}
            onChange={(_event, newValue) => setAccountDestination(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Conta Destino" variant="outlined" />
            )}
          />
          <TextField
            label="Valor da Transferência"
            type="number"
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputProps={{ min: 0.01, step: 0.01 }}
          />
          <div className={styles.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleTransfer}
              disabled={loading}
            >
              Transferir
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transfer;
