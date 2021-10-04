exports.up = function (knex) {
  return knex.schema.raw(
    `
            CREATE TABLE IF NOT EXISTS followings (
                following_id serial primary key not null,
                followed_user_id integer,
                following_user_id integer
            )
        `
  );
};

exports.down = function (knex) {
  return knex.schema.raw(
    `
        DROP TABLE IF EXISTS followings
      `
  );
};
