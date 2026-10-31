import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function SkillsChart({
  skillsCount,
  missingCount
}) {

  const data = [
    {
      name: "Skills Found",
      value: skillsCount,
    },
    {
      name: "Missing Skills",
      value: missingCount,
    },
  ];

  const COLORS = [
    "#10b981",
    "#ef4444",
  ];

  return (
    <div className="chart-card">

      <h2>
        Skills Analysis
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >

            {data.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />
              )
            )}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default SkillsChart;