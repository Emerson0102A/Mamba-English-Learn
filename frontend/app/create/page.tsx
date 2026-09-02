"use client";

import { useState } from "react"; 

export default function CreatePage() {
    const [word, setWord] = useState("");
    const [result, setResult] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    async function generate(){
        setBusy(true);
        setError("");
        setResult("");

        try {
            const response = await fetch(
                `http://localhost:8000/api/generate/${encodeURIComponent(word)}`,
                {
                    method: "POST",
                }
            );
            if (!response.ok) {
                throw new Error("The backend request failed.");
            }

            const data = await response.json();
            setResult(data.memory);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setBusy(false);
        }
    }
    return (
        <main>
            <h1>Create a memory</h1>
            <p>Enter an English word.</p>

            <input
              value = {word}
              onChange={(event) => setWord(event.target.value)}
              placeholder="Enter a word"
            />

            <p>You entered: {word}</p>

            <button 
              onClick={generate}
              disabled = {!word || busy}
            >
                {busy ? "Generating..." : "Generate"}
            </button>
            {result && <p>{result}</p>}
            {error && <p>{error}</p>}
        </main>
    );

}
