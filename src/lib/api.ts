// import { toast } from "react-toastify" // Make sure you have react-toastify installed
import "react-toastify/dist/ReactToastify.css"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const apiRequest = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: any, // Optional body for POST/PUT
  options: RequestInit = {}
): Promise<T> => {
  try {
    const url = `${BASE_URL}${endpoint}`
    const defaultOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store", // Prevent caching by default
      ...options,
    }

    const response = await fetch(url, defaultOptions)

    if (!response.ok) {
      const errorData = await response.json()
      // toast.error(errorData.message || `Error: ${response.statusText}`, {
      //     position: "top-right",
      // })
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return (await response.json()) as T
  } catch (error) {
    console.error("Fetch error:", error)
    // toast.error("Something went wrong. Please try again.", {
    //   position: "top-right",
    // })
    throw error
  }
}
