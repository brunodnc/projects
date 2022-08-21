SELECT 
    u.name AS `usuario`,
    COUNT(h.song_id) AS `qt_de_musicas_ouvidas`,
    ROUND(SUM(s.duration / 60), 2) AS `total_minutos`
FROM SpotifyClone.users u
INNER JOIN SpotifyClone.history h ON u.id = h.user_id
INNER JOIN SpotifyClone.songs s ON h.song_id = s.id
GROUP BY u.id
ORDER BY u.name;