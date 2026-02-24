import Icon from "./Icon.jsx";
import { withBase } from "../utils/withBase.js";

export default function Hero({ recipe, onOpen }) {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${withBase(recipe.heroImage)})` }}
    >
      <div className="hero-overlay">
        <div className="container hero-content">
          <h1>{recipe.title}</h1>
          <div className="hero-meta">
            <span className="pill">
              <Icon name="clock" /> {recipe.timeMinutes} хв
            </span>
            <span className="pill">
              <Icon name="users" /> {recipe.servings} порція
            </span>
            {(recipe.tags || []).slice(0, 2).map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </div>

          <button className="btn" onClick={() => onOpen(recipe.id)}>
            Відкрити рецепт
          </button>
        </div>
      </div>
    </section>
  );
}