import { useState } from "react";

function InterviewPrep() {

  const [questions, setQuestions] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const generateQuestions =
    async (role) => {

      setLoading(true);

      try {

        const response =
          await fetch(
            "http://localhost:8081/api/chat",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body: JSON.stringify({
                message:
                  `Generate 10 interview questions for ${role}`
              })
            }
          );

        const data =
          await response.json();

        setQuestions(
          data.reply
        );

      } catch (error) {

        setQuestions(
          "Unable to generate questions."
        );

      }

      setLoading(false);
    };

  return (
    <div className="card">

      <h2>
        🎤 AI Interview Prep
      </h2>

      <button
        onClick={() =>
          generateQuestions(
            "Data Analyst"
          )
        }
      >
        Generate Questions
      </button>

      {loading && (
        <p>
          Generating...
        </p>
      )}

      {questions && (
        <div
          style={{
            marginTop: "15px",
            whiteSpace:
              "pre-wrap"
          }}
        >
          {questions}
        </div>
      )}

    </div>
  );
}

export default InterviewPrep;