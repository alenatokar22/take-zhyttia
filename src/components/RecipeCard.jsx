import Icon from "./Icon.jsx";
import { withBase } from "../utils/withBase.js";

function extractYouTubeId(input) {
  if (!input) return null;
  const s = String(input).trim();
  if (!s) return null;

  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;

  try {
    const url = new URL(s);
    const v = url.searchParams.get("v");
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "").trim();
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    const parts = url.pathname.split("/").filter(Boolean);
    const idxEmbed = parts.indexOf("embed");
    if (idxEmbed >= 0 && parts[idxEmbed + 1]) {
      const id = parts[idxEmbed + 1];
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    const idxShorts = parts.indexOf("shorts");
    if (idxShorts >= 0 && parts[idxShorts + 1]) {
      const id = parts[idxShorts + 1];
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
  } catch {}

  return null;
}

export default function RecipeCard({ recipe, onOpen }) {
  const bg = recipe?.heroImage
    ? withBase(recipe.heroImage)
    : withBase("/images/hero.jpg");

  const ytRaw = recipe?.youtubeUrl || recipe?.youtubeId || null;
  const ytId = extractYouTubeId(ytRaw);
  const youtubeLink = ytId ? `https://www.youtube.com/watch?v=${ytId}` : null;

  return (
    <button
      className="card"
      onClick={() => onOpen?.(recipe.id)}
      aria-label={`Відкрити рецепт: ${recipe.title}`}
      type="button"
    >
      <div className="card-media">
        <div className="card-image" style={{ backgroundImage: `url(${bg})` }} />

        {/* маленька кнопка YouTube поверх фото */}
        {youtubeLink && (
          <a
            className="yt-badge"
            href={youtubeLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()} // щоб не відкривало модалку
            title="Відео на YouTube"
            aria-label="Відео на YouTube"
          >
            <Icon name="yt" />
          </a>
        )}
      </div>

      <div className="card-body">
        <div className="card-title">{recipe.title}</div>

        <div className="card-meta">
          {!!recipe.timeMinutes && (
            <span>
              <Icon name="clock" /> {recipe.timeMinutes} хв
            </span>
          )}
          {!!recipe.servings && (
            <span>
              <Icon name="users" /> {recipe.servings}
            </span>
          )}
        </div>

        <div className="card-tags">
          {(recipe.tags || []).slice(0, 3).map((t) => (
            <span key={t} className="badge">
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
