SELECT (
        SELECT COUNT(id) FROM SpotifyClone.songs
    ) AS `cancoes`,
    (
        SELECT COUNT(id) FROM SpotifyClone.artists
    ) AS `artistas`,
    (
        SELECT COUNT(id) FROM SpotifyClone.albums
    ) AS `albuns`;