SELECT 
    u.name AS `usuario`,
    IF (MAX(h.date) >= '2021-01-01', 'Usuário ativo', 'Usuário inativo') AS `status_usuario`
FROM SpotifyClone.users u
INNER JOIN SpotifyClone.history h ON h.user_id = u.id
GROUP BY u.id
ORDER BY 
    u.name;