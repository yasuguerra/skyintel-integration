import axios from "axios";

export interface GaDaily {
  date: string;
  sessions: number;
  users: number;
  conversions: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8010",
  timeout: 10_000,
});

export const getOverview = (params: { start_date: string; end_date: string }) =>
  api.get<GaDaily[]>("/ga/overview", { params }).then(r => r.data);
