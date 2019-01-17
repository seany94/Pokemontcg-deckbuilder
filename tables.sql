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
    FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    pokemon_url TEXT,
    card_id TEXT,
    deck_id INT,
    FOREIGN KEY (deck_id) REFERENCES decks(id)
);