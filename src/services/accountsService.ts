export async function getAccounts(token: string) {
  const response = await fetch("http://localhost:3000/accounts/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function createAccount(token: string) {
  const response = await fetch("http://localhost:3000/accounts/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
