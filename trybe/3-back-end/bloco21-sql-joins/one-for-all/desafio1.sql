DROP DATABASE IF EXISTS SpotifyClone;
CREATE DATABASE IF NOT EXISTS SpotifyClone;

CREATE TABLE SpotifyClone.artists(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
) engine = InnoDB;

CREATE TABLE SpotifyClone.albums(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    release_year INT NOT NULL,
    artist_id INT NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES SpotifyClone.artists(id)
) engine = InnoDB;

CREATE TABLE SpotifyClone.songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    duration INT NOT NULL,
    artist_id INT NOT NULL,
    album_id INT NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES SpotifyClone.artists(id),
    FOREIGN KEY (album_id) REFERENCES SpotifyClone.albums(id)
) engine = InnoDB;

CREATE TABLE SpotifyClone.plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    value DOUBLE NOT NULL
) engine = InnoDB;

CREATE TABLE SpotifyClone.users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age TINYINT NOT NULL,
    sign_in DATE NOT NULL,
    plan_id INT NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES SpotifyClone.plans(id)
) engine = InnoDB;

CREATE TABLE SpotifyClone.follow (
    user_id INT NOT NULL,
    artist_id INT NOT NULL,
    CONSTRAINT PRIMARY KEY(user_id, artist_id),
    FOREIGN KEY (user_id) REFERENCES SpotifyClone.users(id),
    FOREIGN KEY (artist_id) REFERENCES SpotifyClone.artists(id)
) engine = InnoDB;

CREATE TABLE SpotifyClone.history (
    date DATETIME NOT NULL,
    song_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT PRIMARY KEY(song_id, user_id),
    FOREIGN KEY (song_id) REFERENCES SpotifyClone.songs(id),
    FOREIGN KEY (user_id) REFERENCES SpotifyClone.users(id)
) engine = InnoDB;

INSERT INTO SpotifyClone.artists (name)
VALUES
  ('Beyoncé'),
  ('Elis Regina'),
  ('Queen'),
  ('Baco Exu do Blues'),
  ('Blind Guardian'),
  ('Nina Simone');
INSERT INTO SpotifyClone.albums (name, release_year, artist_id)
VALUES
  ('Renaissance', 2022, 1),
  ('Jazz', 1978, 3),
  ('Hot Space', 1982, 3),
  ('Falso Brilhante', 1998, 2),
  ('Vento de Maio', 2001, 2),
  ('QVVJFA?', 2003, 4),
  ('Somewhere Far Beyond', 2007, 5),
  ('I Put A Spell On You', 2012, 6);
INSERT INTO SpotifyClone.songs (name, duration, artist_id, album_id)
VALUES
  ('BREAK MY SOUL', 279, 1, 1),
  ("VIRGO'S GROOVE", 369, 1, 1),
  ('ALIEN SUPERSTAR', 116, 1, 1),
  ("Don't Stop Me Now", 203, 3, 2),
  ('Under Pressure', 152, 3, 3),
  ('Como Nossos Pais', 105, 2, 4),
  ('O Medo de Amar é o Medo de Ser Livre', 207, 2, 5),
  ('Samba em Paris', 267, 4, 6),
  ("The Bard's Song", 244, 5, 7),
  ('Feeling Good', 100, 6, 8);
INSERT INTO SpotifyClone.plans (name, value)
VALUES
  ('gratuito', 0.00),
  ('familiar', 7.99),
  ('universitário', 5.99),
  ('pessoal', 6.99);

INSERT INTO SpotifyClone.users (name, age, sign_in, plan_id)
VALUES
  ('Barbara Liskov', 82, '2019-10-20', 1),
  ('Robert Cecil Martin', 58,' 2017-01-06', 1),
  ('Ada Lovelace', 37, '2017-12-30', 2),
  ('Martin Fowler', 46, '2017-01-17', 2),
  ('Sandi Metz', 58, '2018-04-29', 2),
  ('Paulo Freire', 19, '2018-02-14', 3),
  ('Bell Hooks', 26, '2018-01-05', 3),
  ('Christopher Alexander', 85, '2019-06-05', 4),
  ('Judith Butler', 45, '2020-05-13', 4),
  ('Jorge Amado', 58, '2017-02-17', 4);

INSERT INTO SpotifyClone.follow (user_id, artist_id)
VALUES
  (1, 1),
  (1, 3),
  (1, 2),
  (2, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5),
  (5, 6),
  (6, 6),
  (6, 1),
  (7, 6),
  (9, 2),
  (10, 3);

INSERT INTO SpotifyClone.history (date, song_id, user_id)
VALUES
  ('2022-02-28 10:45:55', 8, 1),
  ('2020-05-02 05:30:35', 2, 1),
  ('2020-03-06 11:22:33', 10, 1),
  ('2022-08-05 08:05:17', 10, 2),
  ('2020-01-02 07:40:33', 7, 2),
  ('2020-11-13 16:55:13', 10, 3),
  ('2020-12-05 18:38:30', 2, 3),
  ('2021-08-15 17:10:10', 8, 4),
  ('2022-01-09 01:44:33', 8, 5),
  ('2020-08-06 15:23:43', 5, 5),
  ('2017-01-24 00:31:17', 7, 6),
  ('2017-10-12 12:35:20', 1, 6),
  ('2011-12-15 22:30:49', 4, 7),
  ('2012-03-17 14:56:41', 4, 8),
  ('2022-02-24 21:14:22', 9, 9),
  ('2015-12-13 08:30:22', 3, 10);
