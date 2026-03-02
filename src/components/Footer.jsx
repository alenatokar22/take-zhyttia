import { channel } from "../data/config.js";
import Icon from "./Icon.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="footer-brand">
            🍳 <strong>{channel.name}</strong>
          </div>
          <div className="footer-text">
            Домашні рецепти • покроково • з відео
          </div>
        </div>

        <div className="footer-right">
          <a
            href={channel.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn secondary"
          >
            <Icon name="yt" /> Підписатися на @Take_zhyttya
          </a>

          <div className="footer-meta">
            © {new Date().getFullYear()} {channel.name}
            <span className="dot"> • </span>
            v1.0
          </div>
        </div>
      </div>
    </footer>
  );
}