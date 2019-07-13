# API || Amazon Item
#### Delivery Pricing | Item Availability | Item Warranty

### Table of Contents

1. [Setup](#Setup)
1. [API Methods](#API)
1. [Resources](#Resources)

## Setup

*Step 1*
```console
brew install mysql@5.7
```

*Install dependencies*
```console
npm install
```

*Step3*
```console
mysql -u root -p
```

### Running Locally
*Compile react app for Production*
```console
npm run build
```

## API

### GET
*Endpoint | http://localhost:3030/product/:(ID)*
```{"id":"7","vendor_id":17,"price":493,"amz_holds_stock":false,"available_quantity":244,"gift_wrap_available":true,"user_zip":"78726","sold_by":"Velva Zemlak","fulfilled_by":"Velva Zemlak","expected_shipping":"4-5 Days","free_delivery":false}
```

### POST
*Endpoint | http://localhost:3030/product/:(ID)*
```{"id":"7","vendor_id":17,"price":493,"amz_holds_stock":false,"available_quantity":244,"gift_wrap_available":true,"user_zip":"78726","sold_by":"Velva Zemlak","fulfilled_by":"Velva Zemlak","expected_shipping":"4-5 Days","free_delivery":false}
```

### PUT
*TODO*

### DELETE
*TODO*


## Resources:

### Faker
https://github.com/Marak/faker.js/wiki/

### MySql
http://www.mysqltutorial.org/mysql-foreign-key/


