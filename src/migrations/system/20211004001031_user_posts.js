exports.up = function (knex) {
  return knex.schema.raw(
    `
    CREATE TABLE IF NOT EXISTS user_posts(
        post_id serial primary key not null,
        user_id integer,
        content text,
        image varchar,
        created_at timestamptz,
        update_at timestamptz,
        constraint user_posts_user_id_fkey foreign key(user_id)
        references users(user_id)
        )
      `
  );
};

exports.down = function (knex) {
  return knex.schema.raw(
    `
            DROP TABLE IF EXISTS user_posts
        `
  );
};
