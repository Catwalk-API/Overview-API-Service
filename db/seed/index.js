const fs = require('fs')
const path = require('path')
const pool = require('../index')

const seeded = false

const productFileHeader = 'id,name,slogan,description,category,default_price'
const styleFileHeader = 'id,productId,name,sale_price,original_price,default_style'
const featureFileHeader = 'id,product_id,feature,value'
const skuFileHeader = 'id,styleId,size,quantity'
const relatedFileHeader = 'id,current_product_id,related_product_id'
const productPath = path.join(__dirname, 'product.csv')
const stylePath = path.join(__dirname, 'styles.csv')
const skuPath = path.join(__dirname, 'skus.csv')
const featurePath = path.join(__dirname, 'features.csv')
const relatedPath = path.join(__dirname, '/data/related.csv')

const seed = (filePath, fileHeader, table) => {
  console.log('seeding ' + table + '. Please wait....')
  const readStream = fs.createReadStream(filePath, {encoding: 'utf8'})
  let prevStreamTail = ''

  readStream.on('data', (chunk) => {
    readStream.pause()
    let lines = (prevStreamTail + chunk).split('\n')
    prevStreamTail = lines[lines.length -1]
    // console.log(lines[0], lines[1]) 

    if (lines[0] === fileHeader){
      //cut off title line and tail of stream
      lines = lines.slice(1, lines.length - 1)
    }
    else {
      // cut off tail of stream
      lines = lines.slice(0, lines.length - 1)
    }

    lines = lines.map(line => {
      line = line.replace(/'/g, "''")
      line = '(' +line.replace(/"/g, "'") + ')'
      return line
    })
    lines = lines.join(',')

    pool.query('insert into '+ table +' values ' + lines)
    .then(res => {
      readStream.resume()
    })
    .catch(err => console.log('err.........', err))

  })

  readStream.on('end', (chunk) => {
    prevStreamTail = prevStreamTail.replace(/'/g, "''")
    prevStreamTail = '(' +prevStreamTail.replace(/"/g, "'") + ')'
    pool.query('insert into '+ table +' values ' + prevStreamTail)
    .then(res => {
      console.log(res)
      console.log('Done seeding ' + table + '!!!!!')
    })
    .catch(err => console.log(err))

  })
}

const seedRelated = () => {
  console.log('seeding Related table. Please wait....')
  const readStream = fs.createReadStream(relatedPath, {encoding: 'utf8'})
  let prevStreamTail = ''

  readStream.on('data', (chunk) => {
    readStream.pause()
    let lines = (prevStreamTail + chunk).split('\n')
    prevStreamTail = lines[lines.length -1]

    if (lines[0] === 'id,current_product_id,related_product_id'){
      //cut off title line and tail of stream
      lines = lines.slice(1, lines.length - 1)
    }
    else {
      // cut off tail of stream
      lines = lines.slice(0, lines.length - 1)
    }

    lines = lines.map(line => {
      line = line.split(',')
      // console.log(line)
      if(line[2] === '0') line[2] = 'NULL'
      line = line.join(',')
      return '(' + line + ')'
    })
    // console.log('first few lines...', lines.slice(0,10))
    lines = lines.join(',')

    pool.query('insert into related values ' + lines)
    .then(res => {
      readStream.resume()
    })
    .catch(err => console.log(err))

  })

  readStream.on('end', (chunk) => {
    prevStreamTail = '(' + prevStreamTail + ')'
    pool.query('insert into related values ' + prevStreamTail)
    .then(res => {
      console.log(res)
      console.log('Done seeding related!!!!!')
    })
    .catch(err => console.log(err))

  })
}

if (!seeded) {
  // seed(productPath, productFileHeader, 'product')
  // seed(stylePath, styleFileHeader, 'style')
  // seed(featurePath, featureFileHeader, 'feature')
  // seed(skuPath, skuFileHeader, 'skus')
  seedRelated()
} else {
  console.log('seeded')
}
