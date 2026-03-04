import Icon from "./Icon.jsx";

function extractYouTubeId(input) {
  if (!input) return null;
  const s = String(input).trim();
  if (!s) return null;

  // якщо вже схоже на ID (11 символів) — повертаємо
  // (обережно: інколи буває інше, але для YouTube частіше саме так)
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;

  // пробуємо розпарсити як URL
  try {
    const url = new URL(s);

    // youtube.com/watch?v=ID
    const v = url.searchParams.get("v");
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;

    // youtu.be/ID
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "").trim();
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    // youtube.com/embed/ID або /shorts/ID
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
  } catch {
    // не URL — нічого
  }

  return null;
}

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  const ytRaw = recipe.youtubeUrl || recipe.youtubeId || null;
  const ytId = extractYouTubeId(ytRaw);

  const youtubeWatchLink = ytId
    ? `https://www.youtube.com/watch?v=${ytId}`
    : null;
  const youtubeEmbedLink = ytId
    ? `https://www.youtube.com/embed/${ytId}`
    : null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-top">
          <div>
            <div className="modal-title">{recipe.title}</div>

            <div className="modal-sub">
              {!!recipe.timeMinutes && (
                <span className="pill">
                  <Icon name="clock" /> {recipe.timeMinutes} хв
                </span>
              )}
              {!!recipe.servings && (
                <span className="pill">
                  <Icon name="users" /> {recipe.servings} порція
                </span>
              )}
              {!!recipe.country && (
                <span className="pill">🌍 {recipe.country}</span>
              )}

              {youtubeWatchLink && (
                <a
                  className="btn"
                  href={youtubeWatchLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="yt" /> Дивитись на YouTube
                </a>
              )}
            </div>
          </div>

          <button className="icon-btn" onClick={onClose} aria-label="Закрити">
            ✕
          </button>
        </div>

        <div className="modal-grid">
          <aside className="panel">
            <div className="panel-title">Інгредієнти</div>

            <ul className="ingredients">
              {(recipe.ingredients || [])
                .map((it) => {
                  // підтримка 2 форматів: {name, amount} або "1 шт борошна"
                  if (typeof it === "string") return { name: it, amount: "" };
                  return {
                    name: it?.name ?? it?.text ?? "",
                    amount: it?.amount ?? "",
                  };
                })
                .filter((x) => String(x.name).trim())
                .map((it, idx) => (
                  <li key={idx}>
                    <span className="ing-name">{it.name}</span>
                    {String(it.amount).trim() ? (
                      <span className="ing-amt">{it.amount}</span>
                    ) : null}
                  </li>
                ))}
            </ul>
          </aside>

          <main className="panel">
            <div className="panel-title">Покроково</div>

            <div className="steps">
              {(recipe.steps || []).map((s, idx) => (
                <div key={s.number ?? idx} className="step">
                  <div className="step-text" style={{ width: "100%" }}>
                    <div className="step-num">{s.number ?? idx + 1}</div>
                    <div className="step-desc">{s.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {youtubeEmbedLink && (
              <div className="panel" style={{ marginTop: 12 }}>
                <div className="panel-title">Відео</div>
                <div className="video">
                  <iframe
                    title="YouTube video"
                    src={youtubeEmbedLink}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
