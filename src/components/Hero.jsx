import Icon from "./Icon.jsx";
import { withBase } from "../utils/withBase.js";

export default function Hero({ recipe, onOpen }) {
  const bg = recipe?.heroImage
    ? withBase(recipe.heroImage)
    : withBase("/images/hero.jpg");

  return (
    <section className="hero" style={{ backgroundImage: `url(${bg})` }}>
      <div className="hero-overlay">
        <div className="container hero-content">
          <h1>{recipe?.title || "Таке життя — домашні рецепти"}</h1>

          <div className="hero-meta">
            {!!recipe?.timeMinutes && (
              <span className="pill">
                <Icon name="clock" /> {recipe.timeMinutes} хв
              </span>
            )}
            {!!recipe?.servings && (
              <span className="pill">
                <Icon name="users" /> {recipe.servings} порція
              </span>
            )}
            {(recipe?.tags || []).slice(0, 2).map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </div>

          <button className="btn" onClick={() => recipe?.id && onOpen?.(recipe.id)}>
            Відкрити рецепт
          </button>
        </div>
      </div>
    </section>
  );
}
