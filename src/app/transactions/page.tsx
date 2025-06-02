"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { getAccounts } from "@/services/accountsService";
import { debitAccount, creditAccount } from "@/services/transactionsService";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function Transactions() {
  useAuthGuard(true);

  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null);
  const [operation, setOperation] = useState<"debit" | "credit">("debit");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await getAccounts(token);
      setAccounts(Array.isArray(data) ? data : []);
    };
    fetchAccounts();
  }, []);

  const updateSelectedAccount = (number: string, newBalance: number) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.number === number ? { ...acc, balance: newBalance } : acc
      )
    );
    setSelectedAccount((prev: any) =>
      prev ? { ...prev, balance: newBalance } : prev
    );
  };

  const handleTransaction = async () => {
    if (!selectedAccount || !value) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      let data;
      if (operation === "debit") {
        data = await debitAccount(
          token!,
          selectedAccount.number,
          Number(value)
        );
      } else {
        data = await creditAccount(
          token!,
          selectedAccount.number,
          Number(value)
        );
      }
      if (data.erro) {
        alert(data.erro);
      } else {
        updateSelectedAccount(selectedAccount.number, data.balance);
        alert("Transação realizada com sucesso!");
        setValue("");
      }
    } catch {
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, paddingInline: 2 }}>
      <Typography variant="h5" gutterBottom>
        Nova Transação
      </Typography>
      <Autocomplete
        options={accounts}
        getOptionLabel={(option) =>
          `${option.number} — Saldo: R$ ${Number(option.balance).toFixed(2)}`
        }
        value={selectedAccount}
        onChange={(_event, newValue) => setSelectedAccount(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecione ou busque a conta"
            sx={{ mb: 2 }}
          />
        )}
        isOptionEqualToValue={(option, value) => option.number === value.number}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="operacao-label">Operação</InputLabel>
        <Select
          labelId="operacao-label"
          value={operation}
          label="Operação"
          onChange={(e) => setOperation(e.target.value as "debit" | "credit")}
        >
          <MenuItem value="debit">Débito</MenuItem>
          <MenuItem value="credit">Crédito</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Valor"
        type="number"
        fullWidth
        sx={{ mb: 2 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ min: 0.01, step: 0.01 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={!selectedAccount || !value || loading}
        onClick={handleTransaction}
        sx={{
          height: 50,
        }}
      >
        Finalizar Transação
      </Button>
    </Box>
  );
}
