import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import { ref, push, onValue } from "firebase/database";

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const max = 500;
  const total = entries.reduce((sum, entry) => sum + entry.number, 0);

  useEffect(() => {
    const entriesRef = ref(db, "entries");
    const unsubscribe = onValue(entriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.values(data).map((entry) => ({
          ...entry,
          number: Number(entry.number),
        }));
        setEntries(loaded);
      } else {
        setEntries([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(number, 10);
    if (!name || isNaN(num) || num < 0) return;
    const entry = { name, number: num };
    push(ref(db, "entries"), entry);
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
        {entries.length > 0 && (
          <div className="entries-table-container">
            <h3>Entries</h3>
            <table className="entries-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Number</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.name}</td>
                    <td>{entry.number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
