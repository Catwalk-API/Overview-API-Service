-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Product'
--
-- ---

DROP TABLE IF EXISTS Product;

CREATE TABLE Product (
  id INTEGER NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  slogan VARCHAR NULL DEFAULT NULL,
  description VARCHAR NULL DEFAULT NULL,
  category VARCHAR NULL DEFAULT NULL,
  default_price INTEGER DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'style'
--
-- ---

DROP TABLE IF EXISTS style;

CREATE TABLE style (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  sale_price INTEGER NULL DEFAULT NULL,
  original_price INTEGER NULL DEFAULT NULL,
  default_style INTEGER NULL DEFAULT NULL
);

-- ---
-- Table 'sku'
--
-- ---

DROP TABLE IF EXISTS sku;

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  style_id INTEGER NULL DEFAULT NULL,
  size VARCHAR NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL
);

-- ---
-- Table 'photo'
--
-- ---

DROP TABLE IF EXISTS photo;

CREATE TABLE photo (
  id SERIAL,
  style_id INTEGER NULL DEFAULT NULL,
  url VARCHAR NULL DEFAULT NULL,
  thumbnail_url VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'feature'
--
-- ---

DROP TABLE IF EXISTS feature;

CREATE TABLE feature (
  id SERIAL,
  product_id INTEGER NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  value VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'related'
--
-- ---

DROP TABLE IF EXISTS related;

CREATE TABLE related (
  id SERIAL ,
  current_product_id INTEGER NULL DEFAULT NULL,
  related_product_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE style ADD FOREIGN KEY (product_id) REFERENCES Product (id);
ALTER TABLE skus ADD FOREIGN KEY (style_id) REFERENCES style (id);
ALTER TABLE photo ADD FOREIGN KEY (style_id) REFERENCES style (id);
ALTER TABLE feature ADD FOREIGN KEY (product_id) REFERENCES Product (id);
ALTER TABLE related ADD FOREIGN KEY (current_product_id) REFERENCES Product (id);
ALTER TABLE related ADD FOREIGN KEY (related_product_id) REFERENCES Product (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE Product ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE style ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE sku ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE photo ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE feature ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE related ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO Product (id,name,slogan,description,category) VALUES
-- ('','','','','');
-- INSERT INTO style (id,product_id,name,price,sale_price,default) VALUES
-- ('','','','','','');
-- INSERT INTO sku (id,style_id,quantity,size) VALUES
-- ('','','','');
-- INSERT INTO photo (id,style_id,url,thumbnail_url) VALUES
-- ('','','','');
-- INSERT INTO feature (id,product_id,name,value) VALUES
-- ('','','','');
-- INSERT INTO related (id,product_id1,product_id2) VALUES
-- ('','','');