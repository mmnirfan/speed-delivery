'use client';

interface VariantSelectorProps {
  variants: {
    id: string;
    title: string;
    selectedOptions: { name: string; value: string }[];
  }[];
  selectedVariantId?: string;
  onVariantChange: (variant: any) => void;
}

export default function VariantSelector({
  variants,
  selectedVariantId,
  onVariantChange,
}: VariantSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="font-medium text-sm">Choose Variant</div>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          const label = variant.selectedOptions.map(o => o.value).join(' / ');
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onVariantChange(variant)}
              className={`px-4 py-2 text-sm rounded-full border transition ${
                isSelected
                  ? 'bg-black text-white border-black'
                  : 'bg-white border-gray-300 hover:border-black'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
