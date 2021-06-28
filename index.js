const express = require('express')
const waitPort = require('wait-port')
const {productRouter} = require('./routes')

waitPort({host: "db", port: 5432})
.then((open) => {
  if (open){
    console.log('The port is now open!');

    require('./db/seed')

    const app = express()
    app.use('/products', productRouter)

    const PORT = 3000
    app.listen(PORT, () => {
      console.log('listening on port ' + PORT)
    })
  }
  else console.log('The port did not open before the timeout...');
})
.catch((err) => {
  console.log(`An unknown error occured while waiting for the port: ${err}`);
});
