exports.up = function (knex) {
  return knex.schema.raw(
    `
        CREATE TABLE IF NOT EXISTS users(
            user_id serial primary key not null,
            username varchar unique not null,
            email varchar unique,
            password varchar not null,
            profil_pic varchar,
            bio text,
            created_at timestamptz
        )
    `
  );
};

exports.down = function (knex) {
  return knex.schema.raw(
    `
        DROP TABLE IF EXISTS users
    `
  );
};
