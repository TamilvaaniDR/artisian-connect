import React from "react";

export default function CategoryBar({ categories = [], active, onSelect }) {
  return (
    <div className="w-full bg-white border-y">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
        <div className="flex gap-4 py-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onSelect?.(c)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ${active === c ? "bg-amber-100 text-amber-800" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
