import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import { ref, push, onValue } from "firebase/database";
import Calendar from "./Calendar";
import TeamInputResults from "./TeamInputResults";
const superKloss = `${process.env.PUBLIC_URL}/images/Superkloss.svg`;

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const today = new Date();
  const isDecember = today.getMonth() === 11;
  const initialDay = isDecember ? today.getDate() : 0;
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
    { label: "minutes of Plank", amount: 101 },
    { label: "minutes of Running ", amount: 342 },
    { label: "Push-Ups", amount: 1503 },
    { label: "minutes of Yoga / Stretching", amount: 444 },
    { label: "Squats", amount: 2525 },
    {
      label: "minutes of Cardio",
      amount: 946,
    },
    { label: "minutes of Stretching", amount: 357 },
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
        <p>Magical place where you can find a new challenge every day!</p>
      </div>
      <div className="side-by-side">
        <Calendar
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          challenges={challenges}
        />
        {isDecember ? (
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
        ) : (
          <div className="calendar-description">
            <img
              src={superKloss}
              alt="Kloss"
              className="calendar-description-img"
            />
            <p>
              The Advent Calendar is only active in December.
              <br />
              Come back then to join the daily challenges and log your results!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
