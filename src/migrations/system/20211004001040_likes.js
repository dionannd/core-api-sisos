exports.up = function (knex) {
  return knex.schema.raw(
    `
        CREATE TABLE IF NOT EXISTS likes(
            like_id serial primary key not null,
            user_id integer,
            post_id integer,
            comment_id integer,
            created_at timestamptz
        )
      `
  );
};

exports.down = function (knex) {};
