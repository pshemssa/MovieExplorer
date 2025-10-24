// src/components/CategoryFilter.jsx
export const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
  categories,
}) => {
  const buttonClasses = (cat) => {
    const base =
      'whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all duration-200';
    const active = 'bg-green-600 text-white shadow-md';
    const inactive =
      'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700';
    return `${base} ${selectedCategory === cat ? active : inactive}`;
  };

  return (
    <div className="overflow-x-auto pb-2 -mb-2">
      <div
        className="flex gap-2 min-w-max"
        role="group"
        aria-label="Filter by category"
      >
        <button
          key="All"
          onClick={() => onCategoryChange('All')}
          className={buttonClasses('All')}
          aria-pressed={selectedCategory === 'All'}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={buttonClasses(cat)}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};