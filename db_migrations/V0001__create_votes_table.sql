-- Создание таблицы для хранения голосов
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    team VARCHAR(10) NOT NULL CHECK (team IN ('red', 'blue')),
    voter_ip VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индекса для быстрого подсчета
CREATE INDEX IF NOT EXISTS idx_votes_team ON votes(team);
CREATE INDEX IF NOT EXISTS idx_votes_created_at ON votes(created_at);