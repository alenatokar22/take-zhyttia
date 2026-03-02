const CATEGORIES = [
  //{ label: "Закуска", icon: "🍳" },
  //{ label: "Сніданок", icon: "🥣" },
  { label: "Перші страви", icon: "🍲" },
  //{ label: "Другі страви", icon: "🥘" },
  { label: "Випічка", icon: "🥐" },
  { label: "Випічка солодка", icon: "🍰" },
  //{ label: "Напій", icon: "🥤" },
  //{ label: "Напій", icon: "🥤" },
  //{ label: "Напій", icon: "🥤" },
  //{ label: "Напій", icon: "🥤" },
];

export default function CategoriesGrid({ onSelect }) {
  return (
    <section className="cats">
      <div className="container">
        <div className="cats-head">
          <h2>Обери категорію</h2>
          <div className="cats-sub">Натисни — і одразу покажуться рецепти 👇</div>
        </div>

        <div className="cats-grid">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              className="cats-card"
              onClick={() => onSelect?.(c.label)}
              type="button"
            >
              <div className="cats-icon">{c.icon}</div>
              <div className="cats-label">{c.label}</div>
              <div className="cats-arrow">→</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
