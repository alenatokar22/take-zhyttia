import Icon from "./Icon.jsx";
import { channel } from "../data/config.js";

export default function Header({ query, setQuery }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">
          <div className="brand-mark">🍳</div>
          <div className="brand-text">
            <div className="brand-title">{channel.name}</div>
            <div className="brand-sub">
              Домашні рецепти • покроково • з відео
            </div>
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

        <a
          className="btn secondary"
          href={channel.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          title="Перейти на канал"
        >
          <Icon name="yt" /> Канал
        </a>
      </div>
    </header>
  );
}
