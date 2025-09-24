import React from "react";
// Only alphabetic symbols as per your request
const symbols = [
  // Add letters here if needed (leave empty for no grid)
];

export default function DigipinMap({ onCellClick }) {
  // Only render the grid if symbols has items
  if (symbols.length === 0) return null;

  return (
    <div className="w-full max-w-xl grid grid-cols-4 gap-2 select-none mt-4">
      {symbols.map((symbol) => (
        <div
          key={symbol}
          className="bg-white bg-opacity-70 border border-indigo-300 flex items-center justify-center font-bold text-xl text-indigo-700 cursor-pointer hover:bg-indigo-200 transition"
          onClick={() => onCellClick && onCellClick(symbol)}
        >
          {symbol}
        </div>
      ))}
    </div>
  );
}
