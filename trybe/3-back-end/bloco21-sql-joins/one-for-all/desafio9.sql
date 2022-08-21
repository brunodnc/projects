SELECT COUNT(h.user_id) AS `quantidade_musicas_no_historico`
FROM SpotifyClone.history h
INNER JOIN SpotifyClone.users u ON u.id = h.user_id
WHERE u.name = 'Barbara Liskov';