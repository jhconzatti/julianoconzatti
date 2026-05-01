import { createClient } from "@sanity/client";

// As informações do seu projeto estão nos logs do terminal anterior
const projectId = "a6t188pe"; 
const dataset = "julianoconzatti";

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: "2025-11-08",
  // Uses Sanity's CDN in production for faster reads; bypasses it in dev for fresh data
  useCdn: import.meta.env.PROD,
});