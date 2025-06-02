export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("logout"));
    window.location.href = "/";
    return;
  }

  return response;
}
