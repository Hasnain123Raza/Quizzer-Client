export async function fetchAuthenticated() {
  const response = await fetch("/api/authenticated");
  const data = await response.json();
  return data.authenticated;
}
