import { apiFetch } from "./apiFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAccounts(token: string) {
  const response = await apiFetch(`${API_URL}/accounts/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response) {
    return null;
  }
  return response.json();
}

export async function getAllAccounts(token: string) {
  const response = await apiFetch(`${API_URL}/accounts/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response) {
    return null;
  }
  return response.json();
}

export async function createAccount(token: string) {
  const response = await apiFetch(`${API_URL}/accounts/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response) {
    return null;
  }
  return response.json();
}

export async function updateAccountLimit(
  token: string,
  accountNumber: string,
  newLimit: number
) {
  const response = await apiFetch(`${API_URL}/accounts/update-limit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ accountNumber, newLimit }),
  });
  if (!response) {
    return null;
  }
  return response.json();
}

export async function transfer(
  token: string,
  accountOriginId: number,
  accountDestinationId: number,
  value: string
) {
  const response = await apiFetch(`${API_URL}/accounts/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      accountNumberOrigem: accountOriginId,
      accountNumberDestino: accountDestinationId,
      value: Number(value),
    }),
  });
  if (!response) {
    throw new Error("Erro: Falha na conexão com o servidor");
  }
  return response.json();
}
