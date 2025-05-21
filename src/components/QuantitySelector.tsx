'use client';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({ value, onChange }: QuantitySelectorProps) {
  const decrement = () => {
    if (value > 1) onChange(value - 1);
  };

  const increment = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded overflow-hidden w-fit">
      <button
        onClick={decrement}
        className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <div className="px-4 py-1 text-base font-medium text-gray-800">{value}</div>
      <button
        onClick={increment}
        className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
