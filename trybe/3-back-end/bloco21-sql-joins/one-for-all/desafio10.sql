SELECT
    s.name AS `nome`,
    COUNT(h.song_id) AS `reproducoes`
FROM SpotifyClone.plans p
INNER JOIN SpotifyClone.users u ON p.id = u.plan_id
INNER JOIN SpotifyClone.history h ON u.id = h.user_id
INNER JOIN SpotifyClone.songs s ON s.id = h.song_id
WHERE p.id IN (1, 4)
GROUP BY s.name
ORDER BY s.name;

-- invertendo pra ver se funciona...