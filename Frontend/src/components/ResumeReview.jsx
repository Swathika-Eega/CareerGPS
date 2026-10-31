import { useEffect, useState } from "react";

function ResumeReview() {
  const [history, setHistory] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (!email) return;

    fetch(
      `http://localhost:8081/api/auth/history?email=${email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("HISTORY:", data);

        setHistory(data);

        if (data.length > 0) {
          setSelectedFile(data[0].fileName);
        }
      })
      .catch((error) => {
        console.error("History Error:", error);
      });
  }, []);

  const generateReview = async () => {
    if (!selectedFile) {
      alert("No resume selected");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8081/api/ai/resume-review?fileName=${encodeURIComponent(
          selectedFile
        )}`
      );

      const data = await response.text();

      setReview(data);
    } catch (error) {
      setReview("Unable to review resume.");
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h1>📄 AI Resume Review</h1>

      <h3>Select Resume</h3>

      <select
        value={selectedFile}
        onChange={(e) =>
          setSelectedFile(e.target.value)
        }
      >
        {Array.isArray(history) &&
          history.map((item) => (
            <option
              key={item.id}
              value={item.fileName}
            >
              {item.fileName}
            </option>
          ))}
      </select>

      <br />
      <br />

      <button onClick={generateReview}>
        Review Resume
      </button>

      {loading && (
        <p>Reviewing...</p>
      )}

      {review && (
        <div
          style={{
            marginTop: "20px",
            whiteSpace: "pre-wrap",
            textAlign: "left",
          }}
        >
          {review}
        </div>
      )}
    </div>
  );
}

export default ResumeReview;