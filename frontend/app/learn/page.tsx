"use client";

import { useEffect, useState } from "react";
import { getWords, type WordResponse } from "@/lib/api";

export default function LearnPage() {
  const [words, setWords] = useState<WordResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWords() {
      try {
        const data = await getWords();
        setWords(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load words.");
      } finally {
        setLoading(false);
      }
    }

    loadWords();
  }, []);

  if (loading) {
    return <p>Loading words...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Learn words</h1>

      {words.length === 0 ? (
        <p>No words yet.</p>
      ) : (
        <ul>
          {words.map((word) => (
            <li key={word.id}>
              <strong>{word.text}</strong>
              {" — "}
              {word.meaning}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}