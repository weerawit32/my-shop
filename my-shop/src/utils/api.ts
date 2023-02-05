import axios from "axios";
import { join } from "path";

export const request = async (method: string, url: string, params: object) => {
  const headers = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
  };

  const reqPath = join(
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    url
  );

  const options = {
    method: method || "GET",
    url: reqPath,
    params,
    headers,
  };

  const res = await axios
    .request(options)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
  return res;
};
