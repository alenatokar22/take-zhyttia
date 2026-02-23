# Таке життя — кулінарний блог (React + Vite) + JSON

## Запуск
```bash
npm install
npm run dev
```

## Де міняти контент
### 1) Канал (назва + посилання)
- `src/data/config.js`
  - `youtubeUrl` — встав сюди посилання на твій канал (або @нік)

### 2) Рецепти (JSON)
- `public/data/recipes.json`
  - додавай нові рецепти як нові об’єкти в масиві

## YouTube для конкретного рецепта
Якщо посилання на відео:
`https://www.youtube.com/watch?v=ABC123xyz`

то в рецепті став:
```json
"youtubeId": "ABC123xyz"
```

Тоді на сторінці рецепта з’явиться:
- кнопка **“Дивитись на YouTube”**
- вбудоване відео

## Фото
- кидай у `public/images/`
- у JSON прописуй шлях: `/images/your-photo.jpg`
