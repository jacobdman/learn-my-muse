SELECT * FROM users
INNER JOIN teachers  ON users.id = teachers.user_id
WHERE user_id = $1