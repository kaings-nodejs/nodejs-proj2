const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const editedProductIndex = products.findIndex(product => product.id === this.id);
        // console.log('editedProductIndex..... ', editedProductIndex);
    
        const updatedProducts = [...products];
        // console.log('(BFR)editedProducts..... ', updatedProducts);
    
        updatedProducts[editedProductIndex] = this;   // when update, constructor of Product obj will be called. 'this' represents the edited product object
        
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = (Math.random()*10).toString();   // simple test: create unique id for each product in string (this might not be totally unique)
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
