SELECT 
r.id, r.user_id, r.star, r.review_text, r.verified, r.teacher_id
FROM reviews r
INNER JOIN teachers t on t.user_id = r.teacher_id