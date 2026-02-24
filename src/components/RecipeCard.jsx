import Icon from "./Icon.jsx";
import Badge from "./Badge.jsx";
import { withBase } from "../utils/withBase.js";

export default function RecipeCard({ recipe, onOpen }) {
  return (
    <button
      className="card"
      onClick={() => onOpen(recipe.id)}
      aria-label={`Відкрити рецепт: ${recipe.title}`}
    >
      <div
        className="card-image"
        style={{ backgroundImage: `url(${withBase(recipe.heroImage)})` }}
      />
      <div className="card-body">
        <div className="card-title">{recipe.title}</div>

        <div className="card-meta">
          <span>
            <Icon name="clock" /> {recipe.timeMinutes} хв
          </span>
          <span>
            <Icon name="users" /> {recipe.servings}
          </span>
        </div>

        <div className="card-tags">
          {(recipe.tags || []).slice(0, 3).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </button>
  );
}