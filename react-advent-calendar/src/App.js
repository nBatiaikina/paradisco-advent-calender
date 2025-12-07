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
    { label: "minutes of Plank", amount: 101 }, // done 154 
    { label: "minutes of Running ", amount: 342 }, //done 460
    { label: "Push-Ups", amount: 1503 }, //done 1947
    { label: "minutes of Yoga / Stretching", amount: 444 }, //failed 302
    { label: "Squats", amount: 2525 }, //done 2619
    {
      label: "minutes of Cardio",
      amount: 946, //failed 783
    },
    { label: "minutes of Stretching", amount: 357 },
    { label: "Lunges", amount: 2008 }, //monday 8.12
    { label: "Burpies", amount: 849 }, //tuesday 9.12
    { label: "Crunches", amount: 910 }, //wednesday 10.12
    { label: "minutes of Yoga / Stretching", amount: 411 }, //thursday 11.12
    { label: "minutes of Wall Sits", amount: 112 }, //friday 12.12
    { label: "minutes of Throwing Frisbee", amount:413 }, //saturday 13.12
    { label: "minutes of Plank", amount: 155 }, //sunday 14.12
    { label: "minutes of Stretching / Mobility", amount: 357 }, //monday 15.12
    { label: "climbed up stairs", amount: 1316 }, //tuesday 16.12
    { label: "Push-ups", amount: 2000 }, //wednesday 17.12
     // Write something like "Enjoy the party" instead of the Kloß
    { label: "anstoßen mit Getränk", amount: 1 }, //thursday 18.12
    { label: "minutes of Stretching / Yoga", amount: 419 }, //friday 19.12
    { label: "minutes of Cardio", amount: 820 }, //saturday 20.12
    // Add the christmass tree instead of the Kloß
    { label: "Weihnachtsbaum loben", amount: 21 }, // sunday 21.12
    { label: "minutes of Plank", amount: 202 }, // monday 22.12
    { label: "minutes of Cardio", amount: 1000 }, //tuesday 23.12
    { label: "Push-ups", amount: 2025 }, //wednesday 24.12
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
