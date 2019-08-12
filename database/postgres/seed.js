// const pg = require('pg');
const initOptions = {
  query(e) {
      console.log('QUERY:', e.query);
  }
};
const pgp = require('pg-promise')();
const faker = require('faker');

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'me',
//   host: 'localhost',
//   database: 'api',
//   password: 'password',
//   port: 5432,
// })

// psql connection credentials obj
const connection = {
  user: 'sonny',
  host: 'localhost',
  database: 'amazon',
  password: '',
  port: 5432,
};

// create connection
const db = pgp(connection);

// start a timer
let startTime = Date.now();

const addToItems = (numEntries) => {
  let allEntries = [];
  for(let i = 0; i < numEntries; i++){
    let entry = {
      name : faker.random.word() + ' ' + faker.name.firstName()
    }
    allEntries.push(entry);
  }
  return pgp.helpers.insert(allEntries, ['name'], 'items')
}

const addToVendors = (numEntries) => {
  let allEntries = [];
  for(let i = 0; i < numEntries; i++){
    let entry = {
      name : faker.company.companyName(),
      holds_stock: faker.random.boolean(),
      free_returns: faker.random.boolean(),
      ships_sat: faker.random.boolean(),
      ships_sun: faker.random.boolean(),
      ships_zip: Number(faker.address.zipCode().slice(0,5)),
      status: 'Active'

    }
    allEntries.push(entry);
  }
  return pgp.helpers.insert(allEntries, ['name', 'holds_stock', 'free_returns', 'ships_sat', 'ships_sun', 'ships_zip', 'status'], 'vendors')
}

const addToItemsAvail = (numEntries) => {
  let allEntries = [];
  for(let i = 0; i < numEntries; i++){
    // let itemId;
    // let vendorId;
    // db.one('SELECT * FROM amazon.items WHERE id = $1', i)
    //   .then( data => {
    //     console.log('DATTAZ: ' + data);
    //     itemId = data;
    //   })
    //   .catch( err => {
    //     console.log('ERRORZ: ' + err)
    //   });
    // db.one('SELECT * FROM amazon.vendors WHERE id = $1', i)
    //   .then( data => {
    //     vendorId =  data;
    //   })
    //   .catch( err => {
    //     console.log('ERRORZ: ' + err)
    //   });
    // console.log('item: ' + itemId)
    let entry = {
      // id:
      item_id: Math.floor(Math.random() * Math.floor(20)),
      vendor_id: Math.floor(Math.random() * Math.floor(20)),
      // item_id: `select id from items where id`
      condition : faker.commerce.productAdjective(),
      price : faker.commerce.price(),
      num_avail: faker.random.number(),
      holds_stock: faker.random.boolean(),
      free_returns: faker.random.boolean(),
      from_zip: Number(faker.address.zipCode().slice(0,5))
    }
    allEntries.push(entry);
  }
  return pgp.helpers.insert(allEntries, ['condition', 'price', 'num_avail', 'holds_stock', 'free_returns', 'from_zip'], 'item_avail')
  // knex('item_avail').insert(allEntries);
}

const addForeignKeys = () => {
  // db.one('INSERT INTO users(name, active) VALUES($1, $2) RETURNING id', ['John', true])
  // db.query('ALTER TABLE items ADD COLUMN item_id INTEGER;');
  // db.query('ALTER TABLE vendors ADD COLUMN vendor_id INTEGER;');

  db.query('alter table item_avail add constraint item_avail_item_id_foreign foreign key (item_id) references items.id;')
  db.query('alter table item_avail add constraint item_avail_vendor_id_foreign foreign key (vendor_id) references vendors.id;')
}

// load data
db.tx(async (t) => {
  for (let i = 0; i < 1000; i++) {
    await t.none(addToItems(1000));
    await t.none(addToVendors(1000));
    await t.none(addToItemsAvail(1000));
    // await t.none(addForeignKeys());
  }
})
  .then(() => {
    let duration = Date.now() - startTime;
    console.log('TIME: ' + Math.floor(duration / 60000);
    console.log('[Complete]: 1,000,000 records inserted successfully')
  })
  .catch((e) => console.log(e))




// db.one('SELECT name FROM amz.items WHERE id = $1', 1)
//     .then(user => {
//         console.log(user.name); // print user name;
//     })
//     .catch(error => {
//         console.log(error); // print the error;
//     });