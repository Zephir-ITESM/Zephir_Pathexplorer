// Add console logs to track API calls and token usage
export async function loginUser(email: string, password: string) {
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: email,
        contraseña: password,
      }),
      credentials: "include",
    })

    const data = await response.json()

    if (!response.ok || data.error) {
      throw new Error(data.error || "Error logging in")
    }

    return data
  } catch (error) {
    throw error
  }
}