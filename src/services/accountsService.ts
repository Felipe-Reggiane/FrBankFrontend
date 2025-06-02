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
