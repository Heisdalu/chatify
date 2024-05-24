import axios, { AxiosError } from "axios";

// Define the default fetcher function
export const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Handle Axios errors
      throw new Error(error.response.data.message || "An error occurred");
    } else {
      // Handle other errors
      throw new Error("An unexpected error occurred");
    }
  }
};

export const fetcherPost = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data, { timeout: 30000 });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Handle Axios errors
      throw new Error(error.response.data.message || "An error occurred");
    } else {
      // Handle other errors
      throw new Error("An unexpected error occurred");
    }
  }
};
