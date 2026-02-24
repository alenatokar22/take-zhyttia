import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import RecipeModal from "./components/RecipeModal.jsx";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");
        const res = await fetch(`${import.meta.env.BASE_URL}data/recipes.json`, {
          cache: "no-store",
        });
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipes;

    return recipes.filter((r) => {
      const hay = [
        r.title,
        ...(r.tags || []),
        ...(r.ingredients || []).map((i) => i.name),
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [recipes, query]);

  const heroRecipe = filtered[0];
  const selected = recipes.find((r) => r.id === selectedId);

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
              Перевір файл <code>public/data/recipes.json</code> (чи існує і чи валідний JSON).
            </div>
          </div>
        </main>
      )}

      {status === "ready" && heroRecipe && (
        <Hero recipe={heroRecipe} onOpen={(id) => setSelectedId(id)} />
      )}

      {status === "ready" && recipes.length > 0 && (
        <main className="container">
          <section className="section">
            <div className="section-head">
              <h2>Рецепти</h2>
              <div className="hint">
                Поки рецептів мало — це нормально. Додавай по одному, і сайт буде рости разом з каналом 🙂
              </div>
            </div>

            <div className="grid">
              {filtered.map((r) => (
                <RecipeCard key={r.id} recipe={r} onOpen={(id) => setSelectedId(id)} />
              ))}
            </div>
          </section>
        </main>
      )}

      <RecipeModal recipe={selected} onClose={() => setSelectedId(null)} />
    </div>
  );
}