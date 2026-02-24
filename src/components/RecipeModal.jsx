import Icon from "./Icon.jsx";

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  const youtubeLink = recipe.youtubeId
    ? `https://www.youtube.com/watch?v=${recipe.youtubeId}`
    : null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-top">
          <div>
            <div className="modal-title">{recipe.title}</div>

            <div className="modal-sub">
              <span className="pill">
                <Icon name="clock" /> {recipe.timeMinutes} хв
              </span>
              <span className="pill">
                <Icon name="users" /> {recipe.servings} порція
              </span>

              {youtubeLink && (
                <a className="btn" href={youtubeLink} target="_blank" rel="noreferrer">
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
              {(recipe.ingredients || []).map((it, idx) => (
                <li key={idx}>
                  <span className="ing-name">{it.name}</span>
                  <span className="ing-amt">{it.amount}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 12, color: "var(--muted)", fontSize: 13 }}>
              Порада: коли додаси відео, заповни поле <b>youtubeId</b> у цьому рецепті — і кнопка з’явиться автоматично.
            </div>
          </aside>

          <main className="panel">
            <div className="panel-title">Покроково</div>

            <div className="steps">
              {(recipe.steps || []).map((s) => (
                <div key={s.number} className="step">
                  <div className="step-text" style={{ width: "100%" }}>
                    <div className="step-num">{s.number}</div>
                    <div className="step-desc">{s.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {recipe.youtubeId && (
              <div className="panel" style={{ marginTop: 12 }}>
                <div className="panel-title">Відео</div>
                <div className="video">
                  <iframe
                    title="YouTube video"
                    src={`https://www.youtube.com/embed/${recipe.youtubeId}`}
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