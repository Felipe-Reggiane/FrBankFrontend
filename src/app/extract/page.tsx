"use client";

import styles from "./extract.module.css";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Autocomplete,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { getAccounts } from "@/services/accountsService";
import {
  getAllTransactions,
  getTransactionsByAccount,
} from "@/services/transactionsService";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const Extract = () => {
  useAuthGuard(true);

  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery("(max-width: 650px)");
  const isTablet = useMediaQuery("(min-width:651px) and (max-width:768px)");
  const isMenuStatic = useMediaQuery("(max-width: 950px)");

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await getAccounts(token);
      setAccounts(Array.isArray(data) ? data : []);
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await getAllTransactions(token);
      setTransactions(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  const handleFilterByAccount = async () => {
    if (!selectedAccount) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;
    const data = await getTransactionsByAccount(token, selectedAccount.number);
    setTransactions(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleShowAll = async () => {
    setSelectedAccount(null);
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;
    const data = await getAllTransactions(token);
    setTransactions(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Extrato de Transações</h1>
      <div
        className={
          (isMobile || isMenuStatic) && !isTablet
            ? styles.filterContainerMobile
            : styles.filterContainerDesktop
        }
      >
        <Autocomplete
          options={accounts}
          getOptionLabel={(option) =>
            `${option.number} — Saldo: R$ ${Number(option.balance).toFixed(2)}`
          }
          value={selectedAccount}
          onChange={(_event, newValue) => setSelectedAccount(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Filtrar por conta" />
          )}
          isOptionEqualToValue={(option, value) =>
            option.number === value.number
          }
          sx={{
            width: 280,
            "& label.Mui-focused": {
              color: "var(--color-primary-dark)",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "var(--color-primary-dark)",
              },
            height: 56,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterByAccount}
          disabled={!selectedAccount || loading}
          sx={{
            backgroundColor: "var(--color-primary)",
            color: "#fff",
            "&:hover": {
              backgroundColor: "var(--color-primary-dark)",
            },
            width: (isMobile || isMenuStatic) && !isTablet ? 280 : 120,
            height: 56,
          }}
        >
          Filtrar
        </Button>
        <Button
          variant="outlined"
          onClick={handleShowAll}
          disabled={loading}
          sx={{
            color: "var(--color-primary-dark)",
            borderColor: "var(--color-primary-dark)",
            "&:hover": {
              backgroundColor: "rgba(164, 90, 224, 0.1)",
            },
            width: (isMobile || isMenuStatic) && !isTablet ? 280 : 150,
            height: 56,
          }}
        >
          Mostrar todas
        </Button>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: isMobile ? 280 : isMenuStatic && !isTablet ? 430 : "100%",
          minWidth: 0,
          overflowX: "auto",
          overflowY: transactions.length > 8 ? "scroll" : "hidden",
          maxHeight: transactions.length > 8 ? 500 : "auto",
          margin: isMobile ? "0 auto" : undefined,
        }}
      >
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Número da Conta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>
                  {new Date(tx.createdAt).toLocaleString("pt-BR")}
                </TableCell>
                <TableCell>
                  {tx.type === "debit"
                    ? "Débito"
                    : tx.type === "credit"
                    ? "Crédito"
                    : tx.type === "bonus"
                    ? "Bônus"
                    : "Taxa"}
                </TableCell>
                <TableCell>R$ {Number(tx.value).toFixed(2)}</TableCell>
                <TableCell>{tx.account?.number}</TableCell>
              </TableRow>
            ))}
            {transactions.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={4}>Nenhuma transação encontrada.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Extract;
