function CareerScore({
  skillsCount = 0,
  missingCount = 0,
}) {
  const safeSkills =
    Number(skillsCount) || 0;

  const safeMissing =
    Number(missingCount) || 0;

  const total =
    safeSkills + safeMissing;

  const score =
    total > 0
      ? Math.round(
          (safeSkills / total) * 100
        )
      : 0;

  return (
    <div className="score-card">
      <h2>Career Readiness</h2>

      <h1>{score}%</h1>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${score}%`,
          }}
        ></div>
      </div>

      <p>
        {score >= 80
          ? "Excellent Match 🚀"
          : score >= 60
          ? "Good Progress 👍"
          : score >= 40
          ? "Needs Improvement 📚"
          : "Start Learning More Skills 💡"}
      </p>
    </div>
  );
}

export default CareerScore;