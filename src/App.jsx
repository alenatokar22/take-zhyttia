import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import RecipeModal from "./components/RecipeModal.jsx";
import HeroHome from "./components/HeroHome.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // категорія
  const [activeCategory, setActiveCategory] = useState("Всі");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");
        const res = await fetch(
          `${import.meta.env.BASE_URL}data/recipes.json`,
          {
            cache: "no-store",
          },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (!cancelled) {
          setRecipes(Array.isArray(data) ? data : []);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Пошук
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipes;

    return recipes.filter((r) => {
      const ingredientStrings = (r.ingredients || []).map((i) => {
        if (typeof i === "string") return i;
        return [i?.name, i?.amount].filter(Boolean).join(" ");
      });

      const hay = [r.title, ...(r.tags || []), ...ingredientStrings]
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [recipes, query]);

  // Список категорій
  const categories = useMemo(() => {
    const set = new Set(filtered.map((r) => r.category || "Без категорії"));
    return ["Всі", ...Array.from(set)];
  }, [filtered]);

  // Рецепти, видимі за категорією
  const visible = useMemo(() => {
    if (activeCategory === "Всі") return filtered;
    return filtered.filter(
      (r) => (r.category || "Без категорії") === activeCategory,
    );
  }, [filtered, activeCategory]);

  // Групування в секції
  const grouped = useMemo(() => {
    const map = new Map();
    for (const r of visible) {
      const c = r.category || "Без категорії";
      if (!map.has(c)) map.set(c, []);
      map.get(c).push(r);
    }
    return map;
  }, [visible]);

  const heroRecipe = visible[0];
  const selected = recipes.find((r) => r.id === selectedId);
  const recipesRef = React.useRef(null);

  return (
    <div className="app">
      <Header query={query} setQuery={setQuery} />

      {status === "loading" && (
        <main className="container">
          <div className="section">
            <h2>Завантаження рецептів…</h2>
            <div className="hint">
              Підтягуємо дані з JSON: <code>public/data/recipes.json</code>
            </div>
          </div>
        </main>
      )}

      {status === "error" && (
        <main className="container">
          <div className="section">
            <h2>Не вдалося завантажити рецепти</h2>
            <div className="hint">
              Перевір файл <code>public/data/recipes.json</code> (чи існує і чи
              валідний JSON).
            </div>
          </div>
        </main>
      )}

      {status === "ready" && (
        <HeroHome
          onScrollToRecipes={() =>
            recipesRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        />
      )}

      {status === "ready" && recipes.length > 0 && (
        <main className="container">
          <section className="section" id="recipes" ref={recipesRef}>
            <div className="section-head">
              <h2>Рецепти</h2>
              <div className="hint">
                Обери категорію або введи пошук — і знайдеш потрібне швидко 🙂
              </div>
            </div>

            {/* Категорії */}
            <div className="catbar">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`catbtn ${activeCategory === c ? "active" : ""}`}
                  onClick={() => setActiveCategory(c)}
                  type="button"
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Рендер секціями */}
            {Array.from(grouped.entries()).map(([cat, items]) => (
              <section key={cat} className="cat-section">
                <h3 className="cat-title">{cat}</h3>
                <div className="grid">
                  {items.map((r) => (
                    <RecipeCard
                      key={r.id}
                      recipe={r}
                      onOpen={(id) => setSelectedId(id)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </section>
        </main>
      )}

      <RecipeModal recipe={selected} onClose={() => setSelectedId(null)} />
      <Footer />
    </div>
  );
}
