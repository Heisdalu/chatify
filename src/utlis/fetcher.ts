import axios from "axios";

export const fetcher = async (url: string) => {
  const response = await axios(url);
  return response.data;
};
