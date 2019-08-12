
exports.up = function(knex) {
  return knex.schema.table('item_avail', function(table) {
    table.dropColumn('item_id');
    table.dropColumn('vendor_id');
  });
};

exports.down = function(knex) {
  return knex.schema.table('products', function(table) {
    table.integer('item_id'),
    table.integer('vendor_id'),
    table.foreign('item_id').references('items.id'),
    table.foreign('vendor_id').references('vendors.id')
  });
};
