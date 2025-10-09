import React from "react";

export default function EmptyState({ title = "Nothing here yet", description = "", action = null }) {
  return (
    <div className="text-center py-14">
      <div className="mx-auto h-14 w-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">ℹ</div>
      <h3 className="mt-4 text-lg font-semibold text-amber-800">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
