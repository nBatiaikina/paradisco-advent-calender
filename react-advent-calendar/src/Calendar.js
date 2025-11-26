import React, { useMemo, useRef, useEffect } from "react";
import "./App.css";

// Utility to randomly assign a size class to each day
function getRandomClass() {
  const weighted = [
    "",
    "",
    "",
    "day--medium",
    "day--tall",
    "day--wide",
    "day--large",
  ];
  return weighted[Math.floor(Math.random() * weighted.length)];
}

function getOrCreateDayClasses() {
  const key = "advent-calendar-day-classes";
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length === 24) return parsed;
    } catch {}
  }
  const generated = Array.from({ length: 24 }, () => getRandomClass());
  localStorage.setItem(key, JSON.stringify(generated));
  return generated;
}

export default function Calendar({
  selectedDay,
  onSelectDay,
  challenges = [],
}) {
  const dayClasses = useMemo(getOrCreateDayClasses, []);
  const dayRefs = useRef([]);

  useEffect(() => {
    if (selectedDay && dayRefs.current[selectedDay - 1]) {
      dayRefs.current[selectedDay - 1].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedDay]);

  return (
    <div className="calendar">
      {Array.from({ length: 24 }, (_, i) => {
        const sizeClass = dayClasses[i];
        const isSelected = selectedDay === i + 1;
        const challenge = challenges[i];
        return (
          <div
            ref={(el) => (dayRefs.current[i] = el)}
            className={`day${sizeClass ? " " + sizeClass : ""}${
              isSelected ? " selected" : ""
            }`}
            key={i + 1}
            onClick={() => onSelectDay && onSelectDay(i + 1)}
          >
            {isSelected && challenge && (
              <div className="challenge-text">
                {challenge.amount} {challenge.label}
              </div>
            )}
            <div className="calendar-date">{i + 1}</div>
          </div>
        );
      })}
    </div>
  );
}
