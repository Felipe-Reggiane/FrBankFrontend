import { apiFetch } from "./apiFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function debitAccount(
  token: string,
  accountNumber: string,
  value: number
) {
  const response = await apiFetch(`${API_URL}/transactions/debit`, {
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
  const response = await apiFetch(`${API_URL}/transactions/credit`, {
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
  const response = await apiFetch(`${API_URL}/transactions/`, {
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
  const response = await apiFetch(`${API_URL}/transactions/${accountNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response) return [];
  return response.json();
}
