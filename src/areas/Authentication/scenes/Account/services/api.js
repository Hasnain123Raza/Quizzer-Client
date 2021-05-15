export async function postLogout() {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };

    const response = await fetch("/api/authentication/logout", requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
