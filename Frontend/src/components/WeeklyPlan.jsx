function WeeklyPlan({ roadmap }) {
  return (
    <div className="tip-card">
      <h2>Weekly Learning Plan</h2>

      <ul>
        {roadmap && roadmap.length > 0 ? (
          roadmap.map((step, index) => (
            <li key={index}>
              Week {index + 1} - {step}
            </li>
          ))
        ) : (
          <li>No roadmap available</li>
        )}
      </ul>
    </div>
  );
}

export default WeeklyPlan;