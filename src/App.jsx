import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiReady, setAiReady] = useState(false);

  useEffect(() => {
    const checkReady = setInterval(() => {
      if (
        window.puter &&
        window.puter.ai &&
        typeof window.puter.ai.chat === "function"
      ) {
        setAiReady(true);
        clearInterval(checkReady);
      }
    }, 300);
    return () => clearInterval(checkReady);
  }, []);

  const summarizeText = async () => {
    setLoading(true);
    setSummary("");
    setError("");
    try {
      const response = await window.puter.ai.chat(
        `Please summarize this text: ${text}`
      );
      setSummary(response.message?.content || "No summary returned");
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-950 to-blue-800 flex flex-col items-center justify-center p-3 gap-6">
      <h1 className="text-6xl sm:text-6xl text-transparent bg-gradient-to-r from-red-500 via-blue-300 to-indigo-400 bg-clip-text text-transparent text-center">
        AI-BASED TEXT SUMMARIZER
      </h1>
      <div
        className={`px-4 py-2 rounded-full text-sm ${
          aiReady
            ? "bg-green-500/20 text-green-300 border border-green-500/30"
            : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
        }`}
      >
        {aiReady ? "🟢 AI READY" : "🟡 WAITING FOR AI..."}
      </div>
      <div className="w-full max-w-2xl bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md border border-gray-600 rounded-3xl p-6 shadow-2xl">
        <textarea
          className="w-full h-40 p-4 bg-gray-700/80 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 disabled:opacity-50 resize-none shadow-xl focus:shadow-indigo-700/70"
          placeholder="Paste your text here to summarize it...."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!aiReady}
        ></textarea>
        <button
          onClick={summarizeText}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-500 hover:opacity-80 text-white font-semibold rounded-2xl transition disbaled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={!aiReady || loading || !text.trim()}
        >
          {loading ? (
            <div>
              <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full "></div>
              Summarizing...
            </div>
          ) : (
            "Summarize"
          )}
        </button>

        <div className="mt-6 space-y-4 text-white ">
          {
            summary && (
              <div className="p-4 "> </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
