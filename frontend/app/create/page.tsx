"use client";

import { useState } from "react"; 
import {generateWord} from "@/lib/api";

export default function CreatePage() {
    const [word, setWord] = useState("");
    const [result, setResult] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [level, setLevel] = useState(2);

    async function generate(){
        setBusy(true);
        setError("");
        setResult("");

        try {
            const data = await generateWord(word, level);
            setResult(data.memory);
        } catch (error) {
            console.error(error);
            setError(
                "Cannot connect to the backend. Please try again later."
            );
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

            <label htmlFor="level">
                Absurdity Level: {level}

            </label>

            <input
              type="range"
              id="level"
              min="0"
              max="4"
              value={level}
              onChange={(event) => setLevel(Number(event.target.value))}
            />

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
