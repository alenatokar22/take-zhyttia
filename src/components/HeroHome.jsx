import { withBase } from "../utils/withBase.js";

const COUNTRIES = [
  "Всі країни",
  "Україна",
  "Італія",
  "Франція",
  "Японія",
  "США",
];

export default function HeroHome({ onScrollToRecipes, onSelectCountry }) {
  const bg = withBase("/images/hero.jpg");

  return (
    <section className="hero" style={{ backgroundImage: `url(${bg})` }}>
      <div className="hero-overlay">
        <div className="container hero-content">
          <h1>Таке життя — домашні рецепти</h1>

          {/* Dropdown країн */}
          <div className="hero-country-filter">
            <label htmlFor="heroCountry">Кухня світу:</label>

            <select
              id="heroCountry"
              onChange={(e) => {
                onSelectCountry?.(e.target.value);
                onScrollToRecipes?.();
              }}
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn" onClick={onScrollToRecipes}>
              До рецептів
            </button>

            <a className="btn secondary" href="#recipes">
              Переглянути категорії
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
