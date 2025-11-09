// components/meditation/MeditationSounds/CategorySelector.tsx
interface CategorySelectorProps {
  category: string;
  setCategory: (cat: string) => void;
  categories: string[];
  onCategoryChange: (cat: string) => void;
}

export default function CategorySelector({
  category,
  setCategory,
  categories,
  onCategoryChange,
}: CategorySelectorProps) {
  return (
    <select
      value={category}
      onChange={(e) => {
        setCategory(e.target.value);
        onCategoryChange(e.target.value);
      }}
      className="bg-[#659b47] border border-[#88b863]/30 text-white rounded-full px-4 py-2 text-sm outline-none"
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>
  );
}
