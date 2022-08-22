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
    'items',
    {
      columns: {
        id: {
          type: 'int',
          primaryKey: true,
          autoIncrement: true,
          notNull: true,
        },
        title: {
          type: 'string',
          notNull: true,
        },
        description: {
          type: 'string',
          notNull: true,
        },
        imgUrl: {
          type: 'string',
          notNull: true,
        },
        price: {
          type: 'int',
          notNull: true,
        },
        isSold: {
          type: 'boolean',
          defaultValue: false,
        },
        buyerId: {
          type: 'int',
        },
        sellerId: {
          type: 'int',
          notNull: true,
          foreignKey: {
            name: 'id',
            table: 'users',
            mapping: 'id',
            rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT',
            },
          },
        },
      },
      ifNotExists: true,
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable('items', callback);
};

exports._meta = {
  version: 1,
};
