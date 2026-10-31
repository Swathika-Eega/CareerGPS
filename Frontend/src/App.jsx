import "./App.css";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Landing from "./components/Landing";
import jsPDF from "jspdf";
import Login from "./components/Login";
import Register from "./components/Register";
import CareerScore from "./components/CareerScore";
import StatsCards from "./components/StatsCards";
import SkillTags from "./components/SkillTags";
import ResumeHistory from "./components/ResumeHistory";
import ResumeTips from "./components/ResumeTips";
import WeeklyPlan from "./components/WeeklyPlan";
import LoadingSpinner from "./components/LoadingSpinner";
import SkillsChart from "./components/SkillsChart";
import CareerAssistant from "./components/CareerAssistant";
import HistoryPage from "./components/HistoryPage";
import InterviewPrep from "./components/InterviewPrep";
import AIToolsPage from "./components/AIToolsPage";
import RoadmapGenerator from "./components/RoadmapGenerator";
import ResumeReview from "./components/ResumeReview";


function App() {
  const [fileName, setFileName] = useState("");
  const [targetRole, setTargetRole] = useState("Java Developer");

  const [skills, setSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [page, setPage] = useState("landing");
  const [resumeFile, setResumeFile] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

  const email =
    localStorage.getItem("userEmail");

  const savedPage =
    localStorage.getItem("currentPage");

  if (email) {

    if (savedPage) {
      setPage(savedPage);
    } else {
      setPage("career");
    }

  }

}, []);

  const userName =
    localStorage.getItem("userName");

  const uploadResume = async () => {
    if (!resumeFile) {
      alert("Please select a PDF file");
      return false;
    }

    const formData = new FormData();

    formData.append("file", resumeFile);

    const response = await fetch(
      "http://localhost:8081/api/auth/upload-resume",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.text();

    console.log(result);

    setFileName(resumeFile.name);

    return true;
  };

  const analyzeCareer = async () => {
  try {
    setLoading(true);
      const uploaded = await uploadResume();

      if (!uploaded) {
        return;
      }

      const currentFileName =
        resumeFile.name;

      // Skills API
      const skillsRes = await fetch(
        `http://localhost:8081/api/auth/skills?fileName=${currentFileName}`
      );

      const skillsData =
        await skillsRes.json();

      setSkills(skillsData.skills);

      // Gap Analysis API
      console.log("Selected Role:", targetRole);
      const gapRes = await fetch(
        "http://localhost:8081/api/auth/gap-analysis",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            fileName: currentFileName,
            targetRole,
          }),
        }
      );

      const gapData =
  await gapRes.json();

console.log("ROLE:", targetRole);
console.log("MISSING SKILLS:", gapData.missingSkills);

setMissingSkills(
  gapData.missingSkills
);

      // Roadmap API
      const roadmapRes = await fetch(
        `http://localhost:8081/api/auth/roadmap?targetRole=${targetRole}`,
        {
          method: "POST",
        }
      );

      const roadmapData =
  await roadmapRes.json();

console.log("ROADMAP:", roadmapData);

setRoadmap(
  roadmapData.roadmap
);

      // Recommendation API
      const recRes = await fetch(
        "http://localhost:8081/api/auth/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            fileName: currentFileName,
            targetRole,
          }),
        }
      );

      const recData =
  await recRes.json();

console.log("RECOMMENDATIONS:", recData);

setRecommendations(
  recData.recommendedResources
);
      await fetch(
  "http://localhost:8081/api/auth/save-history",
  {
    method: "POST",
    headers: {
      "Content-Type":
      "application/json",
    },
    body: JSON.stringify({
      email:
        localStorage.getItem(
          "userEmail"
        ),
      fileName:
        currentFileName,
      targetRole,
    }),
  }
);
      setAnalyzed(true);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Error connecting to backend");
    }
  };
  const downloadReport = () => {

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "CareerGPS Career Report",
    20,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Target Role: ${targetRole}`,
    20,
    40
  );

  doc.text(
    `Career Score: ${careerScore}%`,
    20,
    50
  );

  doc.text(
    "Detected Skills:",
    20,
    70
  );

  let y = 80;

  skills.forEach((skill) => {
    doc.text(
      `• ${skill}`,
      25,
      y
    );

    y += 8;
  });

  y += 10;

  doc.text(
    "Missing Skills:",
    20,
    y
  );

  y += 10;

  missingSkills.forEach(
    (skill) => {

      doc.text(
        `• ${skill}`,
        25,
        y
      );

      y += 8;
    }
  );

  y += 10;

  doc.text(
    "Learning Roadmap D:",
    20,
    y
  );

  y += 10;

  roadmap.forEach((step) => {

    doc.text(
      `• ${step}`,
      25,
      y
    );

    y += 8;
  });

  y += 10;

  doc.text(
    "Recommended Resources:",
    20,
    y
  );

  y += 10;

  recommendations.forEach(
    (resource) => {

      doc.text(
        `• ${resource}`,
        25,
        y
      );

      y += 8;
    }
  );

  doc.save(
    "CareerGPS_Report.pdf"
  );
};
  return (
    <>
    <div className="container">

      {page === "landing" && (
        <Landing
          onStart={() =>
            setPage("register")
          }
        />
      )}

      {page === "register" && (
  <Register
    onRegisterSuccess={() => {

  localStorage.setItem(
    "currentPage",
    "login"
  );

  setPage("login");

}}
    onLoginClick={() => {

  localStorage.setItem(
    "currentPage",
    "login"
  );

  setPage("login");

}}
  />
)}

      {page === "login" && (
        <Login
  onLoginSuccess={() => {

    localStorage.setItem(
      "currentPage",
      "career"
    );

    setPage("career");

  }}
/>
      )}
      {page === "history" && (
  <HistoryPage
    onBack={() => {

  localStorage.setItem(
    "currentPage",
    "career"
  );

  setPage("career");

}}
  />
)}

      {page === "ai-tools" && (
  <AIToolsPage
    onBack={() => {

  localStorage.setItem(
    "currentPage",
    "career"
  );

  setPage("career");

}}

    onInterviewPrep={() => {

  localStorage.setItem(
    "currentPage",
    "interview"
  );

  setPage("interview");

}}

    onRoadmapGenerator={() => {

  localStorage.setItem(
    "currentPage",
    "roadmap-ai"
  );

  setPage("roadmap-ai");

}}

    onResumeReview={() => {

  localStorage.setItem(
    "currentPage",
    "resume-review"
  );

  setPage("resume-review");

}}
  />
)}

      {page === "interview" && (
  <>
    <button
      onClick={() => {

  localStorage.setItem(
    "currentPage",
    "ai-tools"
  );

  setPage("ai-tools");

}}
    >
      ← Back
    </button>
   <InterviewPrep />
  </>
)}

   {page === "roadmap-ai" && (
  <>
    <button
      onClick={() => {

  localStorage.setItem(
    "currentPage",
    "ai-tools"
  );

  setPage("ai-tools");

}}
    >
      ← Back
    </button>

    <RoadmapGenerator />
  </>
)}

     {page === "resume-review" && (
  <>
    <button
      onClick={() => {

  localStorage.setItem(
    "currentPage",
    "ai-tools"
  );

  setPage("ai-tools");

}}
    >
      ← Back
    </button>

    <ResumeReview />
  </>
)}

      {page === "career" && (
  <>
  <div className="dashboard-header">
 <h1 className="logo">
  CareerGPS 🚀
</h1>
 
 <div>

  <button
    onClick={() => {

      localStorage.setItem(
        "currentPage",
        "career"
      );

      setPage("career");

    }}
  >
    Home
  </button>

  <button
    onClick={() => {

      localStorage.setItem(
        "currentPage",
        "history"
      );

      setPage("history");

    }}
  >
    History
  </button>

  <button
    onClick={() => {

      localStorage.setItem(
        "currentPage",
        "ai-tools"
      );

      setPage("ai-tools");

    }}
  >
    AI Tools
  </button>

  <button
    className="logout-btn"
    onClick={() => {

      if (
        window.confirm(
          "Are you sure you want to logout?"
        )
      ) {

        localStorage.removeItem(
          "userEmail"
        );

        localStorage.removeItem(
          "userName"
        );

        localStorage.removeItem(
          "currentPage"
        );

        setPage("login");
      }

    }}
  >
    Logout
  </button>

</div>

</div>

<div className="hero-section">

  <h2 className="hero-title">
    AI Career Navigation Platform
  </h2>

  <p className="hero-subtitle">

    Upload your resume,
    discover skill gaps,
    generate personalized
    learning roadmaps,
    prepare for interviews,
    and track your career growth.

  </p>


</div>
  <div className="welcome-section">

  <h2 className="welcome">
    Welcome back,
    {userName} 👋
  </h2>

  <p className="welcome-text">
    Continue your career journey
    using AI-powered analysis,
    interview preparation,
    roadmap generation,
    and resume reviews.
  </p>

</div>

<div className="feature-grid">

  <div
    className="feature-card"
  >
    <h3>📄 Career Analysis</h3>

    <p>
      Upload your resume
      and discover skill gaps.
    </p>
  </div>

  <div
    className="feature-card"
    onClick={() => {

      localStorage.setItem(
        "currentPage",
        "ai-tools"
      );

      setPage("ai-tools");

    }}
  >
    <h3>🤖 AI Tools</h3>

    <p>
      Resume Review,
      Interview Prep,
      Roadmap Generator.
    </p>
  </div>

  <div
    className="feature-card"
    onClick={() => {

      localStorage.setItem(
        "currentPage",
        "history"
      );

      setPage("history");

    }}
  >
    <h3>📚 History</h3>

    <p>
      View all your
      previous analyses.
    </p>
  </div>

  <div
    className="feature-card"
    onClick={() => {

      localStorage.setItem(
        "currentPage",
        "interview"
      );

      setPage("interview");

    }}
  >
    <h3>🎯 Interview Prep</h3>

    <p>
      Practice role-based
      interview questions.
    </p>
  </div>

</div>

  <div className="analysis-center">

  <h2 className="analysis-title">
    🚀 Career Analysis Center
  </h2>

  <p className="analysis-subtitle">
    Upload your resume and choose
    your target role to receive
    personalized career insights.
  </p>

  <div className="analysis-form">

    <div className="analysis-field">
      <label>
        Upload Resume
      </label>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setResumeFile(
            e.target.files[0]
          )
        }
      />
    </div>

    <div className="analysis-field">
      <label>
        Target Role
      </label>

      <select
        value={targetRole}
        onChange={(e) =>
          setTargetRole(
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
    </div>

    <button
      className="analyze-btn"
      onClick={analyzeCareer}
    >
      Analyze Career
    </button>

  </div>

</div>

  {loading && <LoadingSpinner />}

  {analyzed && (
    
    <>
    <div
  style={{
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  <button
  className="download-btn"
  onClick={downloadReport}
>
    Download Career Report PDF
  </button>
</div>
    <StatsCards
  skills={skills.length}
  missing={missingSkills.length}
  resources={recommendations.length}
/>

<CareerScore
  skillsCount={skills.length}
  missingCount={missingSkills.length}
/>
<SkillsChart
  skillsCount={skills.length}
  missingCount={
    missingSkills.length
  }
/>
      <div className="results-grid">

        <Card className="result-card">
  <CardHeader>
    <CardTitle>
      Detected Skills
    </CardTitle>
  </CardHeader>

  <CardContent>
  <ul>
    {skills.map(
      (skill, index) => (
        <li key={index}>
          {skill}
        </li>
      )
    )}
  </ul>
</CardContent>
</Card>

        <div className="result-card">
          <h2>Missing Skills</h2>

          <ul>
            {missingSkills.map(
              (skill, index) => (
                <li key={index}>
                  {skill}
                </li>
              )
            )}
          </ul>
        </div>

      </div>

      {/* <div className="roadmap-card">
        <h2>Suggested Map</h2>

        <ul>
          {roadmap.map(
            (step, index) => (
              <li key={index}>
                {step}
              </li>
            )
          )}
        </ul>
      </div> */}

      <WeeklyPlan roadmap={roadmap} />

      <div className="resource-card">
        <h2>
          Recommended Resources
        </h2>

        <ul>
          {recommendations.map(
            (item, index) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </ul>
      </div>

      <div
  className="card"
  style={{
    cursor: "pointer"
  }}
 onClick={() => {

  localStorage.setItem(
    "currentPage",
    "ai-tools"
  );

  setPage("ai-tools");

}}
>
  <h2>
    🤖 AI Tools
  </h2>

  <p>
    Open AI Interview Prep,
    Roadmap Generator and
    Resume Review
  </p>
</div>

      <ResumeTips
  missingSkills={missingSkills}
/>
      <div
  className="history-card"
  onClick={() => {

  localStorage.setItem(
    "currentPage",
    "history"
  );

  setPage("history");

}}
  style={{
    cursor: "pointer"
  }}
>
  <h2>
    Previous Analyses
  </h2>

  <p>
    Click to view all
    previous analyses
  </p>
</div>
    </>
  )}
</>
           )}
    </div>

    <CareerAssistant />
  </>
  );
}

export default App;