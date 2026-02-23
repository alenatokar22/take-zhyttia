import React, { useEffect, useMemo, useState } from "react"
import { channel } from "./data/config.js"

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }
  if (name === "search") {
    return (
      <svg {...common}>
        <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M16.2 16.2 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }
  if (name === "clock") {
    return (
      <svg {...common}>
        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  if (name === "users") {
    return (
      <svg {...common}>
        <path d="M16 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }
  if (name === "yt") {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M21.8 8.001a3 3 0 0 0-2.11-2.12C17.82 5.4 12 5.4 12 5.4s-5.82 0-7.69.48A3 3 0 0 0 2.2 8.001 31.3 31.3 0 0 0 2 12s0 2.8.2 3.999a3 3 0 0 0 2.11 2.12c1.87.481 7.69.481 7.69.481s5.82 0 7.69-.48a3 3 0 0 0 2.11-2.12C22 14.8 22 12 22 12s0-2.8-.2-3.999Z" fill="currentColor" opacity="0.9"/>
        <path d="M10 15.5v-7l6 3.5-6 3.5Z" fill="#fff"/>
      </svg>
    )
  }
  return null
}

function Badge({ children }) {
  return <span className="badge">{children}</span>
}

function Header({ query, setQuery }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">
          <div className="brand-mark">🍳</div>
          <div className="brand-text">
            <div className="brand-title">{channel.name}</div>
            <div className="brand-sub">Домашні рецепти • покроково • з відео</div>
          </div>
        </div>

        <div className="search">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук: риба, шарлотка, сир…"
            aria-label="Пошук рецептів"
          />
        </div>

        <a className="btn secondary" href={channel.youtubeUrl} target="_blank" rel="noreferrer" title="Перейти на канал">
          <Icon name="yt" /> Канал
        </a>
      </div>
    </header>
  )
}

function Hero({ recipe, onOpen }) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${recipe.heroImage})` }}>
      <div className="hero-overlay">
        <div className="container hero-content">
          <h1>{recipe.title}</h1>
          <div className="hero-meta">
            <span className="pill"><Icon name="clock" /> {recipe.timeMinutes} хв</span>
            <span className="pill"><Icon name="users" /> {recipe.servings} порція</span>
            {(recipe.tags || []).slice(0, 2).map((t) => <span key={t} className="pill">{t}</span>)}
          </div>
          <button className="btn" onClick={() => onOpen(recipe.id)}>Відкрити рецепт</button>
        </div>
      </div>
    </section>
  )
}

function RecipeCard({ recipe, onOpen }) {
  return (
    <button className="card" onClick={() => onOpen(recipe.id)} aria-label={`Відкрити рецепт: ${recipe.title}`}>
      <div className="card-image" style={{ backgroundImage: `url(${recipe.heroImage})` }} />
      <div className="card-body">
        <div className="card-title">{recipe.title}</div>
        <div className="card-meta">
          <span><Icon name="clock" /> {recipe.timeMinutes} хв</span>
          <span><Icon name="users" /> {recipe.servings}</span>
        </div>
        <div className="card-tags">
          {(recipe.tags || []).slice(0, 3).map((t) => <Badge key={t}>{t}</Badge>)}
        </div>
      </div>
    </button>
  )
}

function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null
  const youtubeLink = recipe.youtubeId ? `https://www.youtube.com/watch?v=${recipe.youtubeId}` : null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-top">
          <div>
            <div className="modal-title">{recipe.title}</div>
            <div className="modal-sub">
              <span className="pill"><Icon name="clock" /> {recipe.timeMinutes} хв</span>
              <span className="pill"><Icon name="users" /> {recipe.servings} порція</span>
              {youtubeLink && (
                <a className="btn" href={youtubeLink} target="_blank" rel="noreferrer">
                  <Icon name="yt" /> Дивитись на YouTube
                </a>
              )}
            </div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Закрити">✕</button>
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
  )
}

export default function App() {
  const [recipes, setRecipes] = useState([])
  const [status, setStatus] = useState("loading") // loading | ready | error
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setStatus("loading")
        const res = await fetch("/data/recipes.json", { cache: "no-store" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          setRecipes(Array.isArray(data) ? data : [])
          setStatus("ready")
        }
      } catch (e) {
        if (!cancelled) setStatus("error")
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return recipes
    return recipes.filter((r) => {
      const hay = [r.title, ...(r.tags || []), ...(r.ingredients || []).map((i) => i.name)].join(" ").toLowerCase()
      return hay.includes(q)
    })
  }, [recipes, query])

  const heroRecipe = filtered[0]
  const selected = recipes.find((r) => r.id === selectedId)

  return (
    <div className="app">
      <Header query={query} setQuery={setQuery} />

      {status === "loading" && (
        <main className="container">
          <div className="section">
            <h2>Завантаження рецептів…</h2>
            <div className="hint">Підтягуємо дані з JSON: <code>/public/data/recipes.json</code></div>
          </div>
        </main>
      )}

      {status === "error" && (
        <main className="container">
          <div className="section">
            <h2>Не вдалося завантажити рецепти</h2>
            <div className="hint">
              Перевір, чи існує файл <code>public/data/recipes.json</code> та чи це валідний JSON.
            </div>
          </div>
        </main>
      )}

      {status === "ready" && recipes.length === 0 && (
        <main className="container">
          <div className="section">
            <h2>Рецептів поки немає</h2>
            <div className="hint">
              Додай перший рецепт у <code>public/data/recipes.json</code> — і він з’явиться на сайті.
            </div>
          </div>
        </main>
      )}

      {status === "ready" && heroRecipe && <Hero recipe={heroRecipe} onOpen={(id) => setSelectedId(id)} />}

      {status === "ready" && recipes.length > 0 && (
        <main className="container">
          <section className="section">
            <div className="section-head">
              <h2>Рецепти</h2>
              <div className="hint">Поки рецептів мало — це нормально. Додавай по одному, і сайт буде рости разом з каналом 🙂</div>
            </div>

            <div className="grid">
              {filtered.map((r) => (
                <RecipeCard key={r.id} recipe={r} onOpen={(id) => setSelectedId(id)} />
              ))}
            </div>
          </section>

          <footer className="footer">
            <div className="footer-row">
              <span>© {new Date().getFullYear()} {channel.name}</span>
              <span className="dot">•</span>
              <a href={channel.youtubeUrl} target="_blank" rel="noreferrer">YouTube канал</a>
              <span className="dot">•</span>
              <span>Дані: JSON</span>
            </div>
          </footer>
        </main>
      )}

      <RecipeModal recipe={selected} onClose={() => setSelectedId(null)} />
    </div>
  )
}
