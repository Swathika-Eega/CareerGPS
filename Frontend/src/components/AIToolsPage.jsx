function AIToolsPage({
  onBack,
  onInterviewPrep,
  onRoadmapGenerator,
  onResumeReview
}) {

  return (
    <div className="card">

      <button
        onClick={onBack}
      >
        ← Back
      </button>

      <h1>
        🤖 AI Tools
      </h1>

      <div
        className="card"
        style={{
          cursor: "pointer",
          marginTop: "20px"
        }}
        onClick={onInterviewPrep}
      >
        <h2>
          🎤 Interview Prep
        </h2>

        <p>
          Generate AI-powered
          interview questions.
        </p>
      </div>

      <div
        className="card"
        style={{
          cursor: "pointer"
        }}
        onClick={onRoadmapGenerator}
      >
        <h2>
          🗺️ AI Roadmap Generator
        </h2>

        <p>
          Create personalized
          learning roadmaps.
        </p>
      </div>

      <div
        className="card"
        style={{
          cursor: "pointer"
        }}
        onClick={onResumeReview}
      >
        <h2>
          📄 AI Resume Review
        </h2>

        <p>
          Get AI feedback
          on your resume.
        </p>
      </div>

    </div>
  );
}

export default AIToolsPage;