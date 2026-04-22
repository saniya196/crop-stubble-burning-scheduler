import GanttChart from '../ui/GanttChart';

const GanttTab = ({ farms, assignments, onExportPng }) => {
  return (
    <div className="space-y-3">
      <button onClick={onExportPng} className="rounded-lg bg-blue px-3 py-1.5 text-xs font-semibold text-white">
        Export PNG
      </button>
      <GanttChart farms={farms} assignments={assignments} />
    </div>
  );
};

export default GanttTab;
