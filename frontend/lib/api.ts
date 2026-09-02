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

export type WordResponse = {
  id: number;
  text: string;
  meaning: string;
};

export async function getWords(): Promise<WordResponse[]> {
  const response = await fetch(`${API_URL}/words`);

  if (!response.ok) {
    throw new Error("Failed to load words.");
  }

  return response.json();
}

export async function createWord(
  text: string,
  meaning: string
): Promise<WordResponse> {
  const response = await fetch(`${API_URL}/words`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      meaning,
    }),
  });

  if (response.status === 409) {
    throw new Error("This word already exists.");
  }

  if (!response.ok) {
    throw new Error("Failed to save word.");
  }

  return response.json();
}
