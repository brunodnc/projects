SELECT 
    art.name AS `artista`,
    al.name AS `album`,
    COUNT(f.user_id) AS `seguidores`
FROM SpotifyClone.artists art
LEFT JOIN SpotifyClone.albums al ON art.id = al.artist_id
LEFT JOIN SpotifyClone.follow f ON al.artist_id = f.artist_id
GROUP BY art.name, al.name
ORDER BY seguidores DESC, art.name, al.name;