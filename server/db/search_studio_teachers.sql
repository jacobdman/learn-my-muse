SELECT * FROM teachers
INNER JOIN users ON teachers.user_id = users.id
WHERE teachers.instrument = $1 AND teachers.in_home = false