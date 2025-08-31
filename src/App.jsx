import React, { useState } from "react";
import "./styles.css";

function App() {
  const [items, setItems] = useState([]);
  const [heard, setHeard] = useState("");

  // Fake voice command simulation for now (later you’ll use SpeechRecognition)
  const handleVoiceCommand = () => {
    const example = "add milk"; // Example command
    setHeard(example);

    if (example.startsWith("add")) {
      const item = example.replace("add", "").trim();
      setItems([...items, item]);
    } else if (example.startsWith("remove")) {
      const item = example.replace("remove", "").trim();
      setItems(items.filter((i) => i !== item));
    } else if (example === "clear cart") {
      setItems([]);
    }
  };

  return (
    <div className="container">
      <h1>🛒 Voice Command Shopping Assistant</h1>

      <button className="voice-btn" onClick={handleVoiceCommand}>
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
