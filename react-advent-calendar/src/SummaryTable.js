import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";

export default function SummaryTable({ challenges }) {
  const [totals, setTotals] = useState({});

  useEffect(() => {
    return onValue(ref(db, "entries"), (snapshot) => {
      const sums = {};
      Object.values(snapshot.val() || {}).forEach((e) => {
        sums[e.day] = (sums[e.day] || 0) + (Number(e.number) || 0);
      });
      setTotals(sums);
    });
  }, []);

  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Task</th>
          <th>Goal</th>
          <th>Result</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {challenges.map((c, i) => {
          const result = totals[i + 1] || 0;
          const isDone = result >= c.amount;
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{c.label}</td>
              <td>{c.amount}</td>
              <td>{result}</td>
              <td className={isDone ? "status-done" : "status-failed"}>
                {isDone ? "Done" : "Not reached"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
