import axios from "axios";
import type { Degree } from "./types";

const getDegrees = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/degrees`;

  const res = await axios.get<Degree[]>(url);
  return res.data
};

export default getDegrees;
