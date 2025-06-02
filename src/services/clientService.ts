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
  const response = await fetch("http://localhost:3000/clientes", {
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
  return fetch(`http://localhost:3000/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
