SELECT 
    ROUND(MIN(p.value), 2) AS `faturamento_minimo` IF(`faturamento_minimo` = 0, 0.00, `faturamento_minimo`),
    ROUND(MAX(p.value), 2) AS `faturamento_maximo`,
    ROUND(AVG(p.value), 2) AS `faturamento_medio`,
    ROUND(SUM(p.value), 2) AS `faturamento_total`,
FROM SpotifyClone.plans p
INNER JOIN SpotifyClone.users u ON p.id = u.plan_id;
