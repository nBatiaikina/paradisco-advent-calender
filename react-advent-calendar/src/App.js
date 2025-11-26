import React, { useState } from "react";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const max = 500;
  const total = entries.reduce((sum, entry) => sum + entry.number, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(number, 10);
    if (!name || isNaN(num) || num < 0) return;
    setEntries([...entries, { name, number: num }]);
    setName("");
    setNumber("");
  };

  return (
    <div className="advent-root">
      <h1>Paradisco Advent Calendar</h1>
      <p>Welcome! Open a new surprise every day in December.</p>

      <div className="challenge-section">
        <h2>Today's challenge</h2>
        <p className="challenge-desc">
          Share your name and a number for today's challenge! The bar below will
          sum all numbers entered by everyone.
        </p>
        <form className="challenge-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Number"
            value={number}
            min="0"
            max={max}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>
        <div className="progress-bar-container">
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${Math.min((total / max) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <div className="progress-bar-label">
            {total} / {max}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
