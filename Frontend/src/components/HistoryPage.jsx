import { useEffect, useState } from "react";

function HistoryPage({ onBack }) {

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
        setHistory(data));

  }, []);
   
  const deleteHistory = async (id) => {

  if (
    !window.confirm(
      "Delete this analysis?"
    )
  ) {
    return;
  }

  try {

    await fetch(
      `http://localhost:8081/api/auth/history/${id}`,
      {
        method: "DELETE"
      }
    );

    setHistory(
      history.filter(
        (item) =>
          item.id !== id
      )
    );

  } catch (error) {

    alert(
      "Unable to delete analysis"
    );

  }

}; 

  return (
    <div className="card">

      <button
        onClick={onBack}
      >
        ← Back
      </button>

      <h1>
        Previous Analyses
      </h1>

      {history.length === 0 ? (
        <p>
          No history found.
        </p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "15px",
              marginBottom: "15px",
              border:
                "1px solid #ddd",
              borderRadius:
                "10px"
            }}
          >
            <h3>
              {item.fileName}
            </h3>

            <p>
              Role:
              {" "}
              {item.targetRole}
            </p>

            <p>
              Date:
              {" "}
              {item.analyzedAt
                ? new Date(
                    item.analyzedAt
                  ).toLocaleString()
                : "Old Record"}
            </p>

            <button
  onClick={() =>
    deleteHistory(item.id)
  }
  style={{
    marginTop: "10px",
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  }}
>
  Delete
</button>

          </div>
        ))
      )}

    </div>
  );
}

export default HistoryPage;