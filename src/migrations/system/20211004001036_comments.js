exports.up = function (knex) {
  return knex.schema.raw(
    `
    CREATE TABLE IF NOT EXISTS comments(
      comment_id serial primary key not null,
      post_id integer,
      user_id integer,
      content text,
      created_at timestamptz,
      update_at timestamptz,
      constraint comments_post_id_fkey foreign key(post_id)
      references user_posts(post_id),
      constraint comments_user_id_fkey foreign key(user_id)
      references users(user_id)
    )
    `
  );
};

exports.down = function (knex) {
  return knex.schema.raw(
    `
            DROP TABLE IF EXISTS comments
        `
  );
};
