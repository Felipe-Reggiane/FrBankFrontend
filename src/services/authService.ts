export async function login({
  cpf,
  password,
}: {
  cpf: string;
  password: string;
}) {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cpf,
      senha: password, // O backend espera 'senha'
    }),
  });
  return response;
}
