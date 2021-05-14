export async function postLogin(login) {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    };

    const response = await fetch("/api/authentication/login", requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
