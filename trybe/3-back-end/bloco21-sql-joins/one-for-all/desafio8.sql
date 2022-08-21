SELECT a.name AS `artista`,
alb.name AS `album`
FROM SpotifyClone.artists a
INNER JOIN SpotifyClone.albums alb ON a.id = alb.artist_id
WHERE a.name = 'Elis Regina';
