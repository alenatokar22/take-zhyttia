import Icon from "./Icon.jsx";
import { withBase } from "../utils/withBase.js";

export default function HeroHome({ onScrollToRecipes }) {
  const bg = withBase("/images/hero.jpg");

  return (
    <section className="hero" style={{ backgroundImage: `url(${bg})` }}>
      <div className="hero-overlay">
        <div className="container hero-content">
          <h1>Таке життя — домашні рецепти</h1>

          <div className="hero-meta">
            <span className="pill">
              <Icon name="clock" /> швидко
            </span>
            <span className="pill">
              <Icon name="users" /> для сім’ї
            </span>
            <span className="pill">покроково</span>
          </div>

          <div className="hero-meta secondary">
            <button className="btn" onClick={onScrollToRecipes}>
              До рецептів
            </button>
            <a className="btn secondary" href="#recipes">
              Переглянути категорії
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}