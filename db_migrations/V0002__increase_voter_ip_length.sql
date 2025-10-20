-- Изменяем размер поля voter_ip
ALTER TABLE votes ALTER COLUMN voter_ip TYPE VARCHAR(255);