export type GenerateResponse = {
  word: string;
  absurdity_level: number;
  memory: string;
};

const API_URL = 
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8000/api";

export async function generateWord(
  word: string,
  level: number
): Promise<GenerateResponse> {
  const response = await fetch(
    `${API_URL}/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        word : word,
        absurdity_level: level, 
      }),
    },
  );
  if (!response.ok) {
    throw new Error("The backend request failed.");
  }

  return response.json();
}
