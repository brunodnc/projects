SELECT 
    s.name AS `cancao`,
    COUNT(h.song_id) AS `reproducoes`
FROM SpotifyClone.songs s
INNER JOIN SpotifyClone.history h ON h.song_id = s.id
GROUP BY h.song_id
ORDER BY
    reproducoes DESC,
    s.name
LIMIT 2;