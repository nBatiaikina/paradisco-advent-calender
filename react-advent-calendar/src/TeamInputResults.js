export default function TeamInputResults({
  name,
  setName,
  number,
  setNumber,
  onSubmit,
  entries,
  target = 1,
}) {
  const superKloss = `${process.env.PUBLIC_URL}/images/Superkloss.svg`;
  const total = entries.reduce((sum, entry) => sum + Number(entry.number), 0);
  const progress = Math.min(total / target, 1);
  const fulfilled = total >= target;

  return (
    <div className="team-input-results">
      <div className="input-and-bar-block">
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
        {fulfilled && (
          <div className="congrats-overlay">
            <img
              src={superKloss}
              alt="Congratulations"
              className="congrats-img"
            />
            <div className="congrats-text">Doooooone!</div>
          </div>
        )}
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
