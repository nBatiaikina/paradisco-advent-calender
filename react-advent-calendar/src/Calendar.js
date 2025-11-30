import React, { useRef, useEffect } from "react";
import "./App.css";

const dayBackgrounds = {
  20: `${process.env.PUBLIC_URL}/images/day2.png`,
  4: `${process.env.PUBLIC_URL}/images/day3.png`,
  6: `${process.env.PUBLIC_URL}/images/day4.png`,
  23: `${process.env.PUBLIC_URL}/images/day5.png`,
  12: `${process.env.PUBLIC_URL}/images/day6.png`,
  1: `${process.env.PUBLIC_URL}/images/day7.png`,
  16: `${process.env.PUBLIC_URL}/images/day10.png`,
  24: `${process.env.PUBLIC_URL}/images/day11.png`,
  21: `${process.env.PUBLIC_URL}/images/day9.png`,
};

const dayBackgroundPositions = {
  20: "center top",
  6: "left bottom",
  12: "center top",
  16: "center top",
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
  1: "rgba(255, 151, 161, 0.85)",
  2: "rgba(255, 206, 99, 0.81)",
  3: "rgba(202, 225, 255, 0.5)",
  4: "rgba(255, 236, 179, 0.6)",
  5: "rgba(191, 239, 255, 0.8)",
  6: "rgba(255, 224, 178, 0.5)",
  7: "rgba(163, 228, 255, 0.7)",
  8: "rgba(255, 239, 186, 0.5)",
  9: "rgba(135, 206, 250, 0.6)",
  10: "rgba(255, 176, 158, 0.8)",
  11: "rgba(176, 224, 230, 0.7)",
  12: "rgba(255, 236, 179, 0.8)",
  13: "hsla(39, 100%, 75%, 0.78)",
  14: "rgba(100, 149, 237, 0.5)",
  15: "rgba(255, 205, 210, 0.6)",
  16: "rgba(202, 225, 255, 0.5)",
  17: "rgba(191, 239, 255, 0.7)",
  18: "rgba(163, 228, 255, 0.5)",
  19: "rgba(255, 224, 178, 0.8)",
  20: "rgba(255, 205, 210, 0.6)",
  21: "rgba(135, 206, 250, 0.7)",
  22: "rgba(255, 239, 186, 0.6)",
  23: "rgba(176, 224, 230, 0.5)",
  24: "rgba(255, 205, 210, 0.8)",
};

const dayColorsVibrant = {
  1: "rgba(244, 67, 54, 1)",
  2: "rgba(221, 164, 79, 1)",
  3: "rgba(30, 144, 255, 1)",
  4: "rgba(255, 0, 89, 0.68)",
  5: "rgba(0, 160, 213, 1)",
  6: "rgba(255, 193, 7, 1)",
  7: "rgba(70, 130, 180, 1)",
  8: "rgba(255, 199, 59, 1)",
  9: "rgba(65, 105, 225, 1)",
  10: "rgba(244, 67, 54, 1)",
  11: "rgba(30, 144, 255, 1)",
  12: "rgba(245, 163, 0, 1)",
  13: "rgba(255, 193, 7, 1)",
  14: "rgba(0, 191, 255, 1)",
  15: "rgba(244, 67, 54, 1)",
  16: "rgba(0, 160, 213, 1)",
  17: "rgba(30, 144, 255, 1)",
  18: "rgba(70, 130, 180, 1)",
  19: "rgba(255, 193, 7, 1)",
  20: "rgba(244, 67, 54, 1)",
  21: "rgba(65, 105, 225, 1)",
  22: "rgba(255, 177, 22, 1)",
  23: "rgba(30, 144, 255, 1)",
  24: "rgba(244, 67, 54, 1)",
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
  const currentDay = isDecember ? today.getDate() : 0;

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
