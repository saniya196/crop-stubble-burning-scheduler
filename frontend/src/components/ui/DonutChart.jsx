import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#dc2626', '#16a34a', '#2563eb', '#d97706'];

const DonutChart = ({ assignments = [] }) => {
  const grouped = assignments.reduce((acc, curr) => {
    acc[curr.methodName] = (acc[curr.methodName] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([name, value]) => ({ name, value }));

  return (
    <div className="rounded-2xl border border-ink/10 bg-surface p-4 shadow-soft">
      <h3 className="mb-2 font-heading text-sm font-bold">Pollution Distribution by Method</h3>
      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={52} outerRadius={88}>
              {data.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DonutChart;
