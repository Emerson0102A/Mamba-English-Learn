import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Mamba English</h1>
      <p>Remember words you cannot unsee.</p>
    
      <Link href="/create">
        Generate a word
      </Link>
    </main>
  );
}