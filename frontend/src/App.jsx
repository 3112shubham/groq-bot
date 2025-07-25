import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResult(data.result);
      setSource(data.source);
    } catch (err) {
      setResult("❌ Failed to fetch from backend.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🧠 Groq Topic Bot</h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a topic or college name..."
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-semibold"
        >
          {loading ? "Thinking..." : "Get Info"}
        </button>
      </form>

      {result && (
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-gray-800 rounded shadow">
          <h2 className="text-xl font-bold mb-2">📢 Result:</h2>
          <p className="whitespace-pre-line">{result}</p>
          {source !== "None" && (
            <p className="text-sm mt-4 text-green-400">
              🔗 Source: <a href={source} target="_blank" rel="noreferrer">{source}</a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
