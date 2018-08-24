SELECT 
r.id, r.user_id, r.star, r.review_text, r.verified, r.teacher_id, u.user_name, u.profile_picture
FROM reviews r
INNER JOIN teachers t on t.user_id = r.teacher_id
INNER JOIN users u on u.id = r.user_id
where r.teacher_id = $1