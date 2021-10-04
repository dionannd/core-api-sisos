exports.up = function (knex) {
  return knex.schema.raw(
    `
        CREATE TABLE IF NOT EXISTS comments(
            comment_id serial primary key not null,
            post_id integer,
            user_id integer,
            content text,
            created_at timestamptz,
            update_at timestamptz
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
