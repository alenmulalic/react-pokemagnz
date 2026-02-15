export interface PaginationProps {
  n: number;
  value: number;
  onChange: (page: number) => void;
}

export default function Pagination(props: PaginationProps) {
  const pages: (number | string)[] = [];

  // Helper to add page numbers
  const addPage = (page: number) => pages.push(page);

  // Always show first 3 pages
  for (let i = 1; i <= Math.min(3, props.n); i++) addPage(i);

  // Ellipsis if needed
  if (props.value > 5 && props.n > 6) pages.push("...");

  // Show current ±1 if not in first/last 3
  for (
    let i = Math.max(4, props.value - 1);
    i <= Math.min(props.n - 3, props.value + 1);
    i++
  ) {
    if (i > 3 && i < props.n - 2) addPage(i);
  }

  // Ellipsis before last 3
  if (props.value < props.n - 4 && props.n > 6) pages.push("...");

  // Always show last 3 pages
  for (let i = Math.max(props.n - 2, 4); i <= props.n; i++) {
    if (i > 3) addPage(i);
  }

  return (
    <div className="w-full">
      <div className="flex justify-center space-x-2">
        {pages.map((p, idx) =>
          typeof p === "number" ? (
            <button
              key={p}
              className={`px-3 py-1 rounded ${
                p === props.value
                  ? "bg-blue-500 text-white font-bold"
                  : "bg-gray-200 hover:bg-blue-200"
              }`}
              onClick={() => props.onChange(p)}
            >
              {p}
            </button>
          ) : (
            <span key={`ellipsis-${idx}`} className="px-2">
              {p}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
