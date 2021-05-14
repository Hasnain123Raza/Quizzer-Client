export async function postRegister(register) {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    };

    const response = await fetch(
      "/api/authentication/register",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
