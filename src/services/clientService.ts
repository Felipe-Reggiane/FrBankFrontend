import { apiFetch } from "./apiFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createClient({
  name,
  cpf,
  password,
  phone,
}: {
  name: string;
  cpf: string;
  password: string;
  phone: string;
}) {
  const response = await apiFetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      cpf,
      password,
      phone,
    }),
  });
  return response;
}

export async function updateClient(
  id: string,
  data: { phone?: string; password?: string },
  token: string
) {
  return apiFetch(`${API_URL}/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function getDetalhamento(
  token: string,
  clientId: string | number
) {
  const response = await apiFetch(
    `${API_URL}/clientes/${clientId}/detalhamento`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response && !response.ok) throw new Error("Erro ao buscar detalhamento");
  return response;
}
