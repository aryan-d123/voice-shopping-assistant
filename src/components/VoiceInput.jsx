import React, { useState } from "react";

function VoiceInput({ onCommand }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      onCommand(text.toLowerCase()); // send recognized text to parent
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div>
      <button onClick={startListening}>
        {listening ? "Listening..." : "Start Voice Command"}
      </button>
      <p><strong>Heard:</strong> {transcript}</p>
    </div>
  );
}

export default VoiceInput;
