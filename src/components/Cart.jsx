import React, { useState } from "react";
import VoiceInput from "./VoiceInput";
import { speak } from "../utils/speak";

function Cart() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
    speak(`${item} added to cart`);
  };

  const removeItem = (item) => {
    if (items.includes(item)) {
      setItems(items.filter((i) => i !== item));
      speak(`${item} removed from cart`);
    } else {
      speak(`${item} not found in cart`);
    }
  };

  const clearCart = () => {
    setItems([]);
    speak("Cart cleared");
  };

  const handleCommand = (command) => {
    if (command.startsWith("add ")) {
      const item = command.replace("add ", "").trim();
      addItem(item.charAt(0).toUpperCase() + item.slice(1));
    } 
    else if (command.startsWith("remove ")) {
      const item = command.replace("remove ", "").trim();
      removeItem(item.charAt(0).toUpperCase() + item.slice(1));
    } 
    else if (command.includes("clear cart")) {
      clearCart();
    } 
    else {
      speak("Sorry, I did not understand the command");
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <VoiceInput onCommand={handleCommand} />

      <h3>Items:</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => removeItem(item)}>Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

export default Cart;
