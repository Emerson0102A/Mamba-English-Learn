export type GenerateResponse = {
  word: string;
  memory: string;
};

const API_URL = "http://localhost:8000/api";

export async function generateWord(word: string): Promise<GenerateResponse> {
  const response = await fetch(
    `${API_URL}/generate/${encodeURIComponent(word)}`,
    {
      method: "POST",
    },
  );
  if (!response.ok) {
    throw new Error("The backend request failed.");
  }

  return response.json();
}
