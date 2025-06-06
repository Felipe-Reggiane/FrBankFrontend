"use client";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import CircularProgress from "@mui/material/CircularProgress";
import { getDetalhamento } from "@/services/clientService";
import { jwtDecode } from "jwt-decode";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import styles from "./home.module.css";
import { useMediaQuery } from "@mui/material";

type Detalhamento = {
  contas: number;
  saldoTotal: number;
  porMes: Record<string, { debit: number; credit: number }>;
};

export default function Dashboard() {
  useAuthGuard(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [detalhamento, setDetalhamento] = useState<Detalhamento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalhamento = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const { id } = jwtDecode<{ id: number }>(token);
        const data = await getDetalhamento(token, id);
        const dataJson = await data?.json();
        setDetalhamento(dataJson || null);
      } catch {
        setDetalhamento(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetalhamento();
  }, []);

  if (loading) {
    return (
      <div className={isMobile ? styles.containerMobile : styles.container}>
        <CircularProgress />
      </div>
    );
  }

  if (!detalhamento) {
    return (
      <div className={styles.error}>Erro ao carregar dados do dashboard.</div>
    );
  }

  const meses = Object.keys(detalhamento.porMes).sort();
  const creditData = meses.map((mes) => detalhamento.porMes[mes].credit || 0);
  const debitData = meses.map((mes) => detalhamento.porMes[mes].debit || 0);

  return (
    <div className={isMobile ? styles.containerMobile : styles.container}>
      <h1 className={styles.header}>Dashboard Financeiro</h1>

      <div className={isMobile ? styles.cardsMobile : styles.cards}>
        <div className={styles.card}>
          <span className={styles.cardTitle}>Contas</span>
          <span className={styles.cardValue}>{detalhamento.contas}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardTitle}>Saldo Total</span>
          <span
            className={styles.cardValue}
            style={{ color: "var(--color-primary)" }}
          >
            R$ {Number(detalhamento.saldoTotal).toFixed(2)}
          </span>
        </div>
      </div>

      <div
        className={`${styles.chartPaper} ${
          isMobile ? styles.chartPaperMobile : ""
        }`}
      >
        <div className={styles.chartTitle}>Débitos e Créditos por Mês</div>
        <BarChart
          height={isMobile ? 250 : 350}
          series={[
            {
              data: creditData,
              label: "Crédito",
              color: "var(--color-primary)",
            },
            {
              data: debitData,
              label: "Débito",
              color: "var(--color-error",
            },
          ]}
          xAxis={[{ data: meses, scaleType: "band", label: "Mês" }]}
          yAxis={[{ label: "Valor (R$)" }]}
          margin={{ top: 30, bottom: 40, left: 60, right: 20 }}
          grid={{ horizontal: true }}
        />
      </div>
    </div>
  );
}
