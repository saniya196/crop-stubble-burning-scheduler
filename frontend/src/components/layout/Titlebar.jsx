const Titlebar = () => {
  const now = new Date();
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-green/20 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-8">
        <div>
          <h1 className="font-heading text-xl font-extrabold text-ink md:text-2xl">
            StubbleSched - Crop Stubble Burning Scheduler
          </h1>
          <p className="font-mono text-xs text-ink/60">Production Optimization Console</p>
        </div>
        <div className="rounded-xl border border-green/20 bg-green/10 px-3 py-1 font-mono text-xs text-green">
          {now.toLocaleDateString()} {now.toLocaleTimeString()}
        </div>
      </div>
    </header>
  );
};

export default Titlebar;
