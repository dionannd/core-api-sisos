exports.up = function (knex) {
  return knex.schema.raw(`
  CREATE TABLE IF NOT EXISTS followings (
    following_id serial primary key not null,
    followed_user_id integer,
    following_user_id integer,
    constraint followings_followed_user_id_fkey FOREIGN KEY (followed_user_id)
    references users(user_id),
    constraint followings_following_user_id_fkey FOREIGN KEY (following_user_id)
    references users(user_id)
  )
`);
};

exports.down = function (knex) {
  return knex.schema.raw(`
    DROP TABLE IF EXISTS followings
  `);
};
