import ComplexityGraph from '../ui/ComplexityGraph';

const ComplexityTab = () => {
  return (
    <div className="space-y-4">
      <ComplexityGraph />
      <div className="grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border border-red/20 bg-red/5 p-3 text-xs">
          <h4 className="font-heading text-sm font-bold text-red">Backtracking O(4^n)</h4>
          <p className="mt-1">Exact search with aggressive pruning; scales exponentially as farms increase.</p>
        </article>
        <article className="rounded-xl border border-blue/20 bg-blue/5 p-3 text-xs">
          <h4 className="font-heading text-sm font-bold text-blue">DP O(nxB)</h4>
          <p className="mt-1">Optimal under budget dimension; pseudo-polynomial and reliable for bounded budget.</p>
        </article>
        <article className="rounded-xl border border-green/20 bg-green/5 p-3 text-xs">
          <h4 className="font-heading text-sm font-bold text-green">Greedy O(n log n)</h4>
          <p className="mt-1">Fast urgency-first decisions; efficient but may miss global optimum in constrained cases.</p>
        </article>
      </div>
    </div>
  );
};

export default ComplexityTab;
