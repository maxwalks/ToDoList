export function TaskSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-gray-200" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="flex items-center gap-3">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="h-3 bg-gray-200 rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}