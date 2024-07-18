CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES
('Edsger W. Dijkstra', 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', 'Canonical string reduction'),
('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', 'TDD harms architecture');