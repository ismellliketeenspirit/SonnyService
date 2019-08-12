
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('items', table => {
      table.increments('id').primary()
      table.string('name')
    }),

    knex.schema.createTable('vendors', table => {
      table.increments('id').primary()
      table.string('name'),
      table.boolean('holds_stock'),
      table.boolean('free_returns'),
      table.boolean('ships_sat'),
      table.boolean('ships_sun'),
      table.integer('ships_zip'),
      table.enu('status', ['Active', 'Pending Approval', 'Discontinued'])
    }),

    knex.schema.createTable('item_avail', table => {
      table.increments('id').primary(),
      table.integer('item_id'),
      table.integer('vendor_id'),
      table.foreign('item_id').references('items.id'),
      table.foreign('vendor_id').references('vendors.id'),
      table.string('condition'),
      table.decimal('price', { precision: 5 }, { scale: 2 }),
      table.integer('num_avail'),
      table.boolean('holds_stock'),
      table.boolean('free_returns'),
      table.integer('from_zip')
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('items'),
    knez.schema.dropTable('vendors'),
    knex.schema.dropTable('item_avail')
  ])
};
