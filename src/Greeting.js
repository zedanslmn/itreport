import React, { useState } from 'react';

function Greeting() {
  // useState hook to manage the greeting message
  const [message, setMessage] = useState("Hello, World!");

  // Function to toggle the message
  const toggleMessage = () => {
    setMessage(prevMessage => 
      prevMessage === "Hello, World!" ? "Goodbye, World!" : "Hello, World!"
    );
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={toggleMessage}>Toggle Message</button>
    </div>
  );
}

export default Greeting;