import { createClient } from "@sanity/client";

// As informações do seu projeto estão nos logs do terminal anterior
const projectId = "a6t188pe"; 
const dataset = "julianoconzatti";

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: "2025-11-08", // Use a data de hoje
  // useCdn: true, // `false` se você quiser dados frescos sempre, `true` para cache
  useCdn: false, // Força a busca por dados frescos durante o desenvolvimento
});