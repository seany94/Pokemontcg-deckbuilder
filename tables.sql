CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    photo_url TEXT,
    nationality TEXT,
    username TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS decks (
    id SERIAL PRIMARY KEY,
    name TEXT,
    author_id INT,
    date_created DATE NOT NULL DEFAULT CURRENT_DATE,
    date_updated DATE,
    rating INT,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    card_id TEXT,
    deck_id INT,
    FOREIGN KEY (deck_id) REFERENCES decks(id)
);