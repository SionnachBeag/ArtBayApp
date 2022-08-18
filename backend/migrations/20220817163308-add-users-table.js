'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable(
    'users',
    {
      columns: {
        id: {
          type: 'int',
          primaryKey: true,
          autoIncrement: true,
          notNull: true,
        },
        userName: {
          type: 'string',
          unique: true,
          notNull: true,
        },
        email: {
          type: 'string',
          unique: true,
          notNull: true,
        },
        password: {
          type: 'string',
          notNull: true,
        },
        artDollars: {
          type: 'int',
          notNull: true,
        },
      },
      ifNotExists: true,
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable('users', callback);
};

exports._meta = {
  version: 1,
};
