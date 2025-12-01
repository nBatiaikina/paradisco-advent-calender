import React, { useRef, useEffect } from "react";
import "./App.css";

const dayBackgrounds = {
  20: `${process.env.PUBLIC_URL}/images/day2.png`,
  4: `${process.env.PUBLIC_URL}/images/day3.png`,
  9: `${process.env.PUBLIC_URL}/images/day4.png`,
  23: `${process.env.PUBLIC_URL}/images/day5.png`,
  12: `${process.env.PUBLIC_URL}/images/day6.png`,
  1: `${process.env.PUBLIC_URL}/images/day7.png`,
  14: `${process.env.PUBLIC_URL}/images/day10.png`,
  24: `${process.env.PUBLIC_URL}/images/day11.png`,
  16: `${process.env.PUBLIC_URL}/images/day9.png`,
};

const dayBackgroundPositions = {
  20: "center top",
  9: "left bottom",
  12: "center top",
  24: "left bottom",
};

const daySizeClasses = {
  1: "day--wide",
  2: "day--medium",
  3: "day--wide",
  4: "day--wide",
  5: "day--medium",
  6: "day--large",
  7: "day--medium",
  8: "day--medium",
  9: "day--wide",
  10: "day--tall",
  11: "day--tall",
  12: "day--wide",
  13: "day--wide",
  14: "day--wide",
  15: "day--large",
  16: "day--large",
  17: "day--medium",
  18: "day--medium",
  19: "day--wide",
  20: "day--large",
  21: "day--tall",
  22: "day--tall",
  23: "day--large",
  24: "day--large",
};

const dayColors = {
  1: "rgba(255, 151, 161, 0.85)", // pastel red
  2: "rgba(255, 206, 99, 0.81)", // pastel yellow-orange
  3: "rgba(202, 225, 255, 0.5)", // very light blue
  4: "rgba(255, 236, 179, 0.6)", // pastel cream
  5: "rgba(191, 239, 255, 0.8)", // pastel blue
  6: "rgba(255, 224, 178, 0.5)", // pastel yellow-orange
  7: "rgba(163, 228, 255, 0.7)", // pastel blue
  8: "rgba(255, 239, 186, 0.5)", // pastel light yellow
  9: "rgba(135, 206, 250, 0.6)", // pastel blue
  10: "rgba(255, 176, 158, 0.8)", // pastel red
  11: "rgba(176, 224, 230, 0.7)", // powder blue
  12: "rgba(255, 236, 179, 0.8)", // pastel cream
  13: "hsla(39, 100%, 75%, 0.78)", // pastel yellow-orange
  14: "rgba(100, 149, 237, 0.5)", // cornflower blue
  15: "rgba(255, 205, 210, 0.6)", // pastel red
  16: "rgba(202, 225, 255, 0.5)", // very light blue
  17: "rgba(191, 239, 255, 0.7)", // pastel blue
  18: "rgba(163, 228, 255, 0.5)", // pastel blue
  19: "rgba(255, 224, 178, 0.8)", // pastel yellow-orange
  20: "rgba(255, 205, 210, 0.6)", // pastel red
  21: "rgba(135, 206, 250, 0.7)", // pastel blue
  22: "rgba(255, 239, 186, 0.6)", // pastel light yellow
  23: "rgba(176, 224, 230, 0.5)", // powder blue
  24: "rgba(255, 205, 210, 0.8)", // pastel red
};

const dayColorsVibrant = {
  1: "rgba(244, 67, 54, 1)", // vibrant red
  2: "rgba(255, 193, 7, 1)", // vibrant yellow
  3: "rgba(30, 144, 255, 1)", // dodger blue
  4: "rgba(255, 191, 64, 1)", // vibrant cream
  5: "rgba(0, 160, 213, 1)", // vibrant blue
  6: "rgba(255, 193, 7, 1)", // vibrant yellow
  7: "rgba(70, 130, 180, 1)", // steel blue
  8: "rgba(255, 199, 59, 1)", // vibrant yellow
  9: "rgba(65, 105, 225, 1)", // royal blue
  10: "rgba(244, 67, 54, 1)", // vibrant red
  11: "rgba(30, 144, 255, 1)", // dodger blue
  12: "rgba(245, 163, 0, 1)", // vibrant cream
  13: "rgba(255, 193, 7, 1)", // vibrant yellow
  14: "rgba(0, 191, 255, 1)", // deep sky blue
  15: "rgba(244, 67, 54, 1)", // vibrant red
  16: "rgba(0, 160, 213, 1)", // vibrant blue
  17: "rgba(30, 144, 255, 1)", // dodger blue
  18: "rgba(70, 130, 180, 1)", // steel blue
  19: "rgba(255, 193, 7, 1)", // vibrant yellow
  20: "rgba(244, 67, 54, 1)", // vibrant red
  21: "rgba(65, 105, 225, 1)", // royal blue
  22: "rgba(255, 177, 22, 1)", // vibrant yellow
  23: "rgba(30, 144, 255, 1)", // dodger blue
  24: "rgba(244, 67, 54, 1)", // vibrant red
};

export default function Calendar({
  selectedDay,
  onSelectDay,
  challenges = [],
}) {
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

  const today = new Date();
  const isDecember = today.getMonth() === 11;
  const currentDay = isDecember ? today.getDate() : 0; // Only allow days up to today in December, else lock all
  //const currentDay = 0;
  //const currentDay = today.getMonth() === 11 ? today.getDate() : 24; // Only allow in December, else unlock all

  return (
    <div className="calendar">
      {Array.from({ length: 24 }, (_, i) => {
        const dayNumber = i + 1;
        const sizeClass = daySizeClasses[dayNumber] || "";
        const isSelected = selectedDay === dayNumber;
        const challenge = challenges[i];
        const bgImage = dayBackgrounds[dayNumber];
        const isFuture = dayNumber > currentDay;

        return (
          <div
            ref={(el) => (dayRefs.current[i] = el)}
            className={`day${sizeClass ? " " + sizeClass : ""}${
              isSelected ? " selected" : ""
            }${isFuture ? " day--disabled" : ""}`}
            key={dayNumber}
            onClick={() => {
              if (!isFuture && onSelectDay) onSelectDay(dayNumber);
            }}
            style={{
              backgroundColor: isFuture
                ? dayColors[dayNumber]
                  ? dayColors[dayNumber].replace(/[\d.]+\)$/g, "0.3)")
                  : "rgba(255,255,255,0.15)"
                : isSelected
                ? dayColorsVibrant[dayNumber]
                : dayColors[dayNumber],
              cursor: isFuture ? "not-allowed" : "pointer",
              pointerEvents: isFuture ? "none" : "auto",
            }}
          >
            {bgImage && (
              <div
                style={{
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: "50%",
                  backgroundPosition:
                    dayBackgroundPositions[dayNumber] || "left top",
                  backgroundRepeat: "no-repeat",
                  opacity: isSelected ? 0.3 : 1,
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                }}
              />
            )}
            {isSelected && challenge && (
              <div className="challenge-text">
                {challenge.amount} {challenge.label}
              </div>
            )}
            <div className="calendar-date">{dayNumber}</div>
          </div>
        );
      })}
    </div>
  );
}
