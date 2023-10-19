import axios from "axios";
import type { Job } from "./types";

const getJobs = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/jobs`;

  const res = await axios.get<Job[]>(url);
  return res.data
};

export default getJobs;
