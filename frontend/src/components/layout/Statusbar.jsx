const Statusbar = ({ farmsCount, budget, lastRun, bestResult }) => {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-surface px-4 py-2 text-xs md:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4 font-mono text-ink/75">
        <span className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-green" />
          System Online
        </span>
        <span>Farms: {farmsCount}</span>
        <span>Budget: Rs {Number(budget || 0).toLocaleString()}</span>
        <span>Last Run: {lastRun}</span>
        <span>Best: {bestResult || 'N/A'}</span>
      </div>
    </footer>
  );
};

export default Statusbar;
