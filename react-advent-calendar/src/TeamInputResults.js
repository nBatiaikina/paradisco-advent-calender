import { useState } from "react";

export default function TeamInputResults({
  name,
  setName,
  number,
  setNumber,
  onSubmit,
  entries,
  target = 1,
  onEntrySubmit,
  selectedDay,
}) {
  const [error, setError] = useState("");
  const superKloss = `${process.env.PUBLIC_URL}/images/Superkloss.svg`;
  const total = entries.reduce((sum, entry) => sum + Number(entry.number), 0);
  const progress = Math.min(total / target, 1);
  const fulfilled = total >= target;

  const today = new Date();
  const isDecember = today.getMonth() === 11;
  const currentDay = isDecember ? today.getDate() : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(number, 10);
    const maxAllowed = Math.floor(target * 0.3);
    if (!name || isNaN(num) || num < 1 || num > maxAllowed) {
      setError("I don't believe you've done that much :)");
      return;
    }
    setError("");
    if (onEntrySubmit) {
      onEntrySubmit({ name, number: num });
    }
    setName("");
    setNumber("");
  };

  return (
    <div className="team-input-results">
      <div className="input-and-bar-block">
        <div className="progress-block">
          {fulfilled && (
            <div className="congrats-overlay">
              <img
                src={superKloss}
                alt="Congratulations"
                className="congrats-img"
              />
              <div className="congrats-text">Doooooone!</div>
              <div class="congrats-text-small">
                Great job! <br /> The challenge for this day has been completed!{" "}
              </div>
              {selectedDay === currentDay && (
                <div className="congrats-text-small shown-only-for-current-date">
                  Though if you still want to log some numbers, please go ahead.
                  The more the better!
                </div>
              )}
            </div>
          )}
          <div className="progress-count">
            <span className={fulfilled ? "progress-total-fulfilled" : ""}>
              {total}
            </span>
            {" / "}
            {target}
          </div>
          <div className="progress-bar-outer">
            <div
              className="progress-bar-inner"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>

        {selectedDay >= currentDay && (
          <div className="input-block">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => {
                  const raw = e.target.value;
                  const words = raw.split(/\s+/);
                  const tooLong = words.some((word) => word.length > 10);
                  if (tooLong) {
                    setError("Each word must be 10 characters or less.");
                  } else {
                    setError("");
                    setName(raw);
                  }
                }}
                required
              />
              {error && (
                <div
                  style={{
                    color: "#ff3f59",
                    fontWeight: "bold",
                  }}
                >
                  {error}
                </div>
              )}
              <input
                type="number"
                placeholder="Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                min={1}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
      {entries.length > 0 && (
        <div className="results-block">
          <table className="results-table">
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
  );
}
