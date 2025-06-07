"use client";
import styles from "./Accounts.module.css";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import {
  createAccount,
  getAccounts,
  updateAccountLimit,
} from "@/services/accountsService";
import { ButtonDefault } from "@/components";

const Accounts = () => {
  useAuthGuard(true);

  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [newLimit, setNewLimit] = useState("");
  const rowsPerPage = 6;

  const isMobile = useMediaQuery("(max-width: 768px)");

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
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleUpdateLimit = async (
    accountNumber: string,
    currentLimit: number
  ) => {
    const token = localStorage.getItem("token");
    if (!token || !newLimit) return;

    const newLimitValue = Number(newLimit);
    if (newLimitValue <= currentLimit) {
      alert("Erro: O novo limite deve ser maior que o limite atual.");
      return;
    }

    try {
      const updatedAccount = await updateAccountLimit(
        token,
        accountNumber,
        newLimitValue
      );
      setAccounts((prev) =>
        prev.map((account) =>
          account.number === accountNumber
            ? { ...account, limit: updatedAccount.limit }
            : account
        )
      );
      alert("Limite atualizado com sucesso!");
      setNewLimit("");
    } catch {
      alert("Erro ao atualizar o limite.");
    }
  };

  const filteredAccounts = accounts.filter((account) =>
    account.number.toLowerCase().includes(filter.toLowerCase())
  );

  const paginatedAccounts = filteredAccounts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const selectedAccount =
    filteredAccounts.length === 1 ? filteredAccounts[0] : null;

  return (
    <div className={styles.container}>
      <div
        className={
          isMobile ? styles.filterContainermobile : styles.filterContainer
        }
      >
        <TextField
          label="Filtrar por número da conta"
          variant="outlined"
          size="small"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(0);
          }}
          sx={{
            "& label.Mui-focused": {
              color: "var(--color-primary)",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "var(--color-primary)",
              },
            width: "225px",
          }}
        />
        {selectedAccount && (
          <div
            className={
              isMobile ? styles.limitContainerMobile : styles.limitContainer
            }
          >
            <TextField
              label="Novo Limite"
              type="number"
              size="small"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
              sx={{
                "& label.Mui-focused": {
                  color: "var(--color-primary)",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "var(--color-primary)",
                  },
                width: "150px",
              }}
            />
            <ButtonDefault
              handleClick={() =>
                handleUpdateLimit(selectedAccount.number, selectedAccount.limit)
              }
              text="Atualizar"
              smallButton={isMobile}
            />
          </div>
        )}
      </div>

      <TableContainer
        component={Paper}
        className={isMobile ? styles.tableContainer : ""}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Número da Conta</TableCell>
              <TableCell>Saldo</TableCell>
              <TableCell>Limite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.number}</TableCell>
                <TableCell>R$ {Number(account.balance).toFixed(2)}</TableCell>
                <TableCell>R$ {Number(account.limit).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {filteredAccounts.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={2}>Nenhuma conta encontrada.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredAccounts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </TableContainer>
      <div
        className={
          isMobile ? styles.buttonContainerMobile : styles.buttonContainer
        }
      >
        <ButtonDefault
          handleClick={handleCreateAccount}
          text="Criar Nova Conta"
        />
      </div>
    </div>
  );
};

export default Accounts;
