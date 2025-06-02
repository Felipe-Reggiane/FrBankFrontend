import { apiFetch } from "./apiFetch";

export async function getAccounts(token: string) {
  const response = await apiFetch("http://localhost:3000/accounts/", {
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
  const response = await apiFetch("http://localhost:3000/accounts/create", {
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
