import axios from "axios";

const instance = axios.create({
  baseURL: "https://olxclone-backend.vercel.app",
});

export default instance;
