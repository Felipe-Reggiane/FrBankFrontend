"use client";
import styles from "./Accounts.module.css";
import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { createAccount, getAccounts } from "@/services/accountsService";
import { ButtonDefault } from "@/components";

const Accounts = () => {
  useAuthGuard(true);

  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;

  const fetchAccounts = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const data = await getAccounts(token);
      setAccounts(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleCreateAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await createAccount(token);
    fetchAccounts();
    setPage(0); // volta para a primeira página ao criar nova conta
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Paginação dos dados
  const paginatedAccounts = accounts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Contas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Número da Conta</TableCell>
              <TableCell>Saldo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.number}</TableCell>
                <TableCell>R$ {Number(account.balance).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {accounts.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={2}>Nenhuma conta encontrada.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={accounts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </TableContainer>
      <div className={styles.buttonContainer}>
        <ButtonDefault
          handleClick={handleCreateAccount}
          text="Criar Nova Conta"
        />
      </div>
    </div>
  );
};

export default Accounts;
