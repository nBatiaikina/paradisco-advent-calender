import React from "react";

export default function TeamInputResults({
  name,
  setName,
  number,
  setNumber,
  onSubmit,
  entries,
  target = 1, // daily target amount
}) {
  const total = entries.reduce((sum, entry) => sum + Number(entry.number), 0);
  const progress = Math.min(total / target, 1);

  return (
    <div className="team-input-results">
      <div className="progress-block">
        <div className="progress-count">
          {total} / {target}
        </div>
        <div className="progress-bar-outer">
          <div
            className="progress-bar-inner"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
      <div className="input-block">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
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
    </div>
  );
}
