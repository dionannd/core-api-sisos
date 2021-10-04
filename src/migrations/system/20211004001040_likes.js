exports.up = function (knex) {
  return knex.schema.raw(
    `
        CREATE TABLE IF NOT EXISTS likes(
            like_id serial primary key not null,
            user_id integer,
            post_id integer,
            comment_id integer,
            created_at timestamptz,
            constraint likes_user_id_fkey foreign key(user_id)
            references users(user_id),
            constraint likes_post_id_fkey foreign key(post_id)
            references user_posts(post_id),
            constraint likes_comment_id_fkey foreign key(comment_id)
            references comments(comment_id)
        )
      `
  );
};

exports.down = function (knex) {};
