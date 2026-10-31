import { useState } from "react";

function RoadmapGenerator() {

  const [role, setRole] =
    useState("Java Developer");

  const [roadmap, setRoadmap] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const generateRoadmap =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            `http://localhost:8081/api/ai/roadmap?role=${role}`
          );

        const data =
          await response.text();

        setRoadmap(data);

      } catch (error) {

        setRoadmap(
          "Unable to generate roadmap."
        );

      }

      setLoading(false);
    };

  return (
    <div className="card">

      <h2>
        🗺️ AI Roadmap Generator
      </h2>

      <select
        value={role}
        onChange={(e) =>
          setRole(
            e.target.value
          )
        }
      >
        <option>
          Java Developer
        </option>

        <option>
          Full Stack Developer
        </option>

        <option>
          Data Analyst
        </option>

        <option>
          Data Scientist
        </option>
      </select>

      <br />
      <br />

      <button
        onClick={
          generateRoadmap
        }
      >
        Generate Roadmap
      </button>

      {loading && (
        <p>
          Generating roadmap...
        </p>
      )}

      {roadmap && (
        <div
          style={{
            marginTop: "20px",
            whiteSpace:
              "pre-wrap"
          }}
        >
          {roadmap}
        </div>
      )}

    </div>
  );
}

export default RoadmapGenerator;