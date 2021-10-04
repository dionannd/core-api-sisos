exports.up = function (knex) {
  return knex.schema.raw(`
    alter table followings
    rename column following_user_id to user_id;
  `);
};

exports.down = function (knex) {};
