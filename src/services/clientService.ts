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
  console.log("create", name, cpf, password, phone);
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
