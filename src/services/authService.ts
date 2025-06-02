const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function login({
  cpf,
  password,
}: {
  cpf: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cpf,
      senha: password, // O backend espera 'senha'
    }),
  });
  return response;
}
