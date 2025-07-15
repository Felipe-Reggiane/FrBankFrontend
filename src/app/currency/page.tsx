"use client";

import { useEffect, useState } from "react";
import { getExchangeRate } from "@/services/currencyService";
import styles from "./Currency.module.css";
import { useMediaQuery } from "@mui/material";
import { ButtonDefault, InputPrimary } from "@/components";

const CurrencyPage = () => {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BRL");
  const [rate, setRate] = useState<any>(null);
  const [initialRates, setInitialRates] = useState<any[]>([]);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const fetchInitialRates = async () => {
    try {
      const currencies = ["USD-BRL", "EUR-BRL", "BTC-BRL"];
      const promises = currencies.map((currency) =>
        getExchangeRate(currency.split("-")[0], currency.split("-")[1])
      );
      const results = await Promise.all(promises);
      console.log("Cotações :", results);

      const formattedResults = results.map(
        (result) => Object.values(result)[0]
      );
      setInitialRates(formattedResults);
      console.log("Cotações iniciais:", formattedResults);
    } catch {
      alert("Erro ao buscar as cotações iniciais.");
    }
  };

  const fetchRate = async () => {
    try {
      const data = await getExchangeRate(from, "BRL");
      setRate(Object.values(data)[0]);
    } catch {
      alert("Erro ao buscar a taxa de câmbio.");
    }
  };

  useEffect(() => {
    fetchInitialRates();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Taxas de Câmbio</h1>

      {initialRates.length > 0 && (
        <>
          <h2 className={styles.initialTitle}>Cotações Iniciais</h2>
          <div
            className={
              isMobile ? styles.initialCurrencysMobile : styles.initialCurrencys
            }
          >
            {initialRates.map((currency) => (
              <div className={styles.currency} key={currency.code}>
                <h3 className={styles.text}>{currency.name.split("/")[0]}</h3>
                <p className={styles.text}>
                  <strong>Alta:</strong> {currency.high}
                </p>
                <p className={styles.text}>
                  <strong>Baixa:</strong> {currency.low}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <div>
        <h2>Buscar Nova Moeda</h2>
        <div className={styles.searchContainer}>
          <InputPrimary
            variant="text"
            value={from}
            onChange={(e) => setFrom(e.toUpperCase())}
            label="Moeda de origem (ex: USD)"
            setIsValid={() => {}}
            primaryColor
          />
          <ButtonDefault handleClick={fetchRate} text="Consultar Taxa" />
        </div>
      </div>

      {rate && (
        <div className={styles.atualCurrency}>
          <h2 className={styles.initialTitle}>Cotação Atual</h2>
          <div className={styles.currency}>
            <h3 className={styles.text}>{rate.name.split("/")[0]}</h3>
            <p className={styles.text}>
              <strong>Alta:</strong> {rate.high}
            </p>
            <p className={styles.text}>
              <strong>Baixa:</strong> {rate.low}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyPage;
