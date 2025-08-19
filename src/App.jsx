import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiReady, setAiReady] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-950 to-blue-700 flex flex-col items-center justify-center p-3 gap-6">
      <h1 className="text-6xl sm:text-6xl text-transparent bg-gradient-to-r from-red-500 via-blue-300 to-indigo-400 bg-clip-text text-transparent text-center">
        AI-BASED TEXT SUMMARIZER
      </h1>
    </div>
  );
}

export default App;
