import { useState } from "react";

interface LoveResult {
  nameA: string;
  nameB: string;
  score: number;
  message: string;
}

export default function App() {
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [result, setResult] = useState<LoveResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nameA, nameB }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">
          Love Calculator <span aria-hidden>💖</span>
        </h1>
        <p className="subtitle">Enter two names and discover your love score.</p>

        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>First name</span>
            <input
              value={nameA}
              onChange={(e) => setNameA(e.target.value)}
              placeholder="e.g. Romeo"
              autoComplete="off"
            />
          </label>

          <div className="heart-divider" aria-hidden>
            💞
          </div>

          <label className="field">
            <span>Second name</span>
            <input
              value={nameB}
              onChange={(e) => setNameB(e.target.value)}
              placeholder="e.g. Juliet"
              autoComplete="off"
            />
          </label>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Calculating…" : "Calculate love"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <div className="result-names">
              {result.nameA} <span aria-hidden>❤️</span> {result.nameB}
            </div>
            <div className="score">{result.score}%</div>
            <div className="meter">
              <div
                className="meter-fill"
                style={{ width: `${result.score}%` }}
              />
            </div>
            <p className="message">{result.message}</p>
          </div>
        )}
      </div>
      <footer className="footer">Powered by an Express API + Vite/React</footer>
    </div>
  );
}
