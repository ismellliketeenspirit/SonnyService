// const pg = require('pg');
// // const knex = require('knex');
// const faker = require('faker');

// // psql connection credentials obj
// // const connection = {
// //   user: 'sonny',
// //   host: 'localhost',
// //   database: 'amzprods',
// //   password: '',
// //   port: 5432,
// // };

// var knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host : 'localhost',
//     port : 5432,
//     user : 'sonny',
//     password : '',
//     database : 'amzprods'
//   }
// });

// // create connection
// const db = pgp(connection);

// // create list of entries
// const addToItems = (numEntries) => {
//   let allEntries = [];
//   for(let i = 0; i < numEntries; i++){
//     let entry = {
//       id : i,
//       name : faker.random.word() + ' ' + faker.name.firstName()
//     }
//     console.log(allEntries);
//     allEntries.push(entry);
//   }
//   return allEntries;
// }

// let seed = (knex, Promise) => {
//   return knex('items').del()
//   .then( () => {
//     return knex('items').insert(addToItems(10));
//   })
// }

// seed

// module.exports = seed;