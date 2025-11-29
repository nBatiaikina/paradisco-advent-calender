import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import { ref, push, onValue } from "firebase/database";
import Calendar from "./Calendar";
import TeamInputResults from "./TeamInputResults";

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const initialDay = Math.max(1, Math.min(24, 12)); // or today.getDate() for real date
  const [selectedDay, setSelectedDay] = useState(initialDay);

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

  const challenges = [
    { label: "Push-ups", amount: 600 },
    { label: "Sit-ups", amount: 700 },
    { label: "hours of Running", amount: 20 }, // 20km run
    { label: "mins Plank", amount: 30 },
    { label: "Jumping-jacks", amount: 1000 },
    { label: "Burpies", amount: 300 },
    { label: "Squats", amount: 500 },
    { label: "Lunges", amount: 200 },
    { label: "Yoga/stretching (hours)", amount: 4 },
    { label: "Push-ups", amount: 600 },
    { label: "Sit-ups", amount: 700 },
    { label: "hours of Running", amount: 20 },
    { label: "Plank (min)", amount: 30 },
    { label: "Jumping-jacks", amount: 1000 },
    { label: "Burpies", amount: 300 },
    { label: "Squats", amount: 500 },
    { label: "Lunges", amount: 200 },
    { label: "hours of Yoga/stretching", amount: 4 },
    { label: "Push-ups", amount: 600 },
    { label: "Sit-ups", amount: 700 },
    { label: "Run", amount: 20 },
    { label: "Plank (min)", amount: 30 },
    { label: "Jumping-jacks", amount: 1000 },
    { label: "Burpies", amount: 300 },
    { label: "Squats", amount: 500 },
    { label: "Lunges", amount: 200 },
    { label: "Yoga/stretching (hours)", amount: 4 },
  ];

  return (
    <div className="advent-root">
      <div className="header">
        <h1>Paradisco Advent Calendar</h1>
        <p>Welcome! Open a new surprise every day in December.</p>
      </div>
      <div className="side-by-side">
        <Calendar
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          challenges={challenges}
        />
        <TeamInputResults
          name={name}
          setName={setName}
          number={number}
          setNumber={setNumber}
          entries={entries.filter((e) => e.day === selectedDay)}
          target={challenges[selectedDay - 1]?.amount}
          onEntrySubmit={({ name, number }) => {
            const entry = { name, number, day: selectedDay };
            push(ref(db, "entries"), entry);
          }}
          selectedDay={selectedDay}
        />
      </div>
    </div>
  );
}

export default App;
