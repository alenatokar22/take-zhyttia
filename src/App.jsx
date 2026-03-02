import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import HeroHome from "./components/HeroHome.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import RecipeModal from "./components/RecipeModal.jsx";
import CategoriesGrid from "./components/CategoriesGrid.jsx";
import Footer from "./components/Footer.jsx";

function normalizeCategoryTitle(s) {
  return String(s || "").trim();
}

function flattenRecipesFromJson(data) {
  // 1) Старий формат: масив рецептів
  if (Array.isArray(data)) return data;

  // 2) Новий формат: { meta, baking: {...}, "sweet-baking": {...}, ... }
  if (data && typeof data === "object") {
    const sections = Object.entries(data)
      .filter(([k]) => k !== "meta")
      .map(([, v]) => v)
      .filter(Boolean);

    const flat = sections.flatMap((section) => {
      // підтримка двох варіантів:
      // A) section = { id, title, recipes: [...] }
      // B) section = [ { id,title,recipes }, { ... } ]  (якщо ти лишиш масив)
      const blocks = Array.isArray(section) ? section : [section];

      return blocks.flatMap((block) => {
        const catTitle = normalizeCategoryTitle(block?.title) || "Без категорії";
        const recipes = Array.isArray(block?.recipes) ? block.recipes : [];

        return recipes
          .filter((r) => r && r.title) // не показуємо пусті заготовки
          .map((r) => ({
            ...r,
            category: normalizeCategoryTitle(r.category) || catTitle,
          }));
      });
    });

    return flat;
  }

  return [];
}

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [activeCategory, setActiveCategory] = useState("Всі");
  const recipesRef = useRef(null);

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
          const flat = flattenRecipesFromJson(data);
          setRecipes(flat);
          setStatus("ready");
        }
      } catch (e) {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollToRecipes = () =>
    recipesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Пошук
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipes;

    return recipes.filter((r) => {
      const ingredientStrings = (r.ingredients || []).map((i) => {
        if (typeof i === "string") return i;
        return [i?.name, i?.amount].filter(Boolean).join(" ");
      });

      const hay = [r.title, r.category, ...(r.tags || []), ...ingredientStrings]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [recipes, query]);

  // Список категорій (для чіпсів)
  const categories = useMemo(() => {
    const set = new Set(
      filtered.map((r) => normalizeCategoryTitle(r.category) || "Без категорії"),
    );
    return ["Всі", ...Array.from(set)];
  }, [filtered]);

  // Рецепти видимі за категорією
  const visible = useMemo(() => {
    if (activeCategory === "Всі") return filtered;
    return filtered.filter(
      (r) =>
        (normalizeCategoryTitle(r.category) || "Без категорії") ===
        activeCategory,
    );
  }, [filtered, activeCategory]);

  // Групування в секції
  const grouped = useMemo(() => {
    const map = new Map();
    for (const r of visible) {
      const c = normalizeCategoryTitle(r.category) || "Без категорії";
      if (!map.has(c)) map.set(c, []);
      map.get(c).push(r);
    }
    return map;
  }, [visible]);

  const selected = recipes.find((r) => r.id === selectedId) || null;

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
        <>
          <HeroHome onScrollToRecipes={scrollToRecipes} />

          <CategoriesGrid
            onSelect={(cat) => {
              // якщо CategoriesGrid повертає "Випічка", "Закуска" тощо
              setActiveCategory(cat);
              scrollToRecipes();
            }}
          />
        </>
      )}

      {status === "ready" && recipes.length === 0 && (
        <main className="container">
          <div className="section">
            <h2>Рецептів поки немає</h2>
            <div className="hint">
              Додай рецепт у <code>public/data/recipes.json</code> — і він
              з’явиться на сайті.
            </div>
          </div>
        </main>
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

            {/* Чіпси категорій */}
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