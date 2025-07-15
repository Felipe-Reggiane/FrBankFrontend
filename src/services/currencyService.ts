import { apiFetch } from "./apiFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getExchangeRate(from: string, to: string) {
  const response = await apiFetch(
    `${API_URL}/currency/rate?from=${from}&to=${to}`
  );
  return response?.json();
}

export async function getExchangeHistory(
  from: string,
  to: string,
  days: number
) {
  const response = await apiFetch(
    `${API_URL}/currency/history?from=${from}&to=${to}&days=${days}`
  );
  return response;
}
