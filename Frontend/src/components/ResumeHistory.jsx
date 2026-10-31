import { useEffect, useState } from "react";

function ResumeHistory() {

  const [history, setHistory] =
    useState([]);

  useEffect(() => {

    const email =
      localStorage.getItem(
        "userEmail"
      );

    if (!email) return;

    fetch(
      `http://localhost:8081/api/auth/history?email=${email}`
    )
      .then((res) =>
        res.json()
      )
      .then((data) =>
        setHistory(data)
      );

  }, []);

  return (
    <div className="history-card">

      <h2>
        Previous Analyses
      </h2>

      {history.length === 0 ? (
        <p>
          No analysis history
          found.
        </p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            className="history-item"
          >
            <strong>
              {item.fileName}
            </strong>

            <br />

            {item.targetRole}
          </div>
        ))
      )}
    </div>
  );
}

export default ResumeHistory;