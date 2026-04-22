import { Area, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const buildData = () =>
  Array.from({ length: 21 }, (_, n) => ({
    n,
    backtracking: Number(Math.min(120000, Math.pow(4, n / 3)).toFixed(2)),
    dp: Number((n * 150).toFixed(2)),
    greedy: Number((n <= 1 ? 0 : n * Math.log2(n) * 20).toFixed(2)),
  }));

const ComplexityGraph = () => {
  const data = buildData();
  return (
    <div className="rounded-2xl border border-ink/10 bg-surface p-4 shadow-soft">
      <div className="h-[320px] w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="n" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="backtracking" fill="#dc262622" stroke="none" />
            <Area type="monotone" dataKey="dp" fill="#2563eb22" stroke="none" />
            <Area type="monotone" dataKey="greedy" fill="#16a34a22" stroke="none" />
            <Line type="monotone" dataKey="backtracking" stroke="#dc2626" strokeWidth={2} name="O(4^n)" dot={false} />
            <Line type="monotone" dataKey="dp" stroke="#2563eb" strokeWidth={2} name="O(nxB)" dot={false} />
            <Line type="monotone" dataKey="greedy" stroke="#16a34a" strokeWidth={2} name="O(n log n)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComplexityGraph;
