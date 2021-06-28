const express = require('express')
const pool = require('../db/index')

const router = express.Router()

router.get('/:id', (req, res) => {
  console.log(req.params)
  const id = req.params.id
  pool.query('SELECT * FROM PRODUCT WHERE id =' + id)
  .then(data => res.send(data.rows))
})

router.get('/', (req, res) => {
  pool.query("SELECT * FROM product LIMIT 10")
  .then(data => res.send(data.rows))
})

router.get('/:product_id/styles', (req, res) => {
  console.log(req.params)
  const product_id = req.params.product_id
  pool.query('SELECT * FROM style WHERE product_id = ' + product_id)
  .then(data => res.send(data.rows))
})


module.exports = router