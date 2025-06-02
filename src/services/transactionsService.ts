import { apiFetch } from "./apiFetch";

export async function debitAccount(
  token: string,
  accountNumber: string,
  value: number
) {
  const response = await apiFetch("http://localhost:3000/transactions/debit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ accountNumber, value }),
  });
  if (!response) {
    return null;
  }
  return response.json();
}

export async function creditAccount(
  token: string,
  accountNumber: string,
  value: number
) {
  const response = await apiFetch("http://localhost:3000/transactions/credit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ accountNumber, value }),
  });
  if (!response) {
    return null;
  }
  return response.json();
}

export async function getAllTransactions(token: string) {
  const response = await apiFetch("http://localhost:3000/transactions/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response) return [];
  return response.json();
}

export async function getTransactionsByAccount(
  token: string,
  accountNumber: string
) {
  const response = await apiFetch(
    `http://localhost:3000/transactions/${accountNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response) return [];
  return response.json();
}
