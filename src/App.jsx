import React, { useState } from "react";
import "./styles.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function App() {
  const [items, setItems] = useState([]);
  const [heard, setHeard] = useState("");

  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setHeard(transcript);

      if (transcript.startsWith("add")) {
        const item = transcript.replace("add", "").trim();
        if (item) setItems((prev) => [...prev, item]);
      } else if (transcript.startsWith("remove")) {
        const item = transcript.replace("remove", "").trim();
        setItems((prev) => prev.filter((i) => i !== item));
      } else if (transcript === "clear cart") {
        setItems([]);
      } else {
        alert("Sorry, I did not understand the command.");
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Error with speech recognition: " + event.error);
    };
  };

  return (
    <div className="container">
      <h1>🛒 Voice Command Shopping Assistant</h1>

      <button className="voice-btn" onClick={startListening}>
        🎤 Start Voice Command
      </button>

      <div className="heard-box">
        <strong>Heard:</strong> {heard || "—"}
      </div>

      <h2>Shopping Cart</h2>
      <ul className="cart-list">
        {items.length > 0 ? (
          items.map((item, idx) => <li key={idx}>{item}</li>)
        ) : (
          <p className="empty">Cart is empty</p>
        )}
      </ul>

      <button className="clear-btn" onClick={() => setItems([])}>
        ❌ Clear Cart
      </button>
    </div>
  );
}

export default App;
