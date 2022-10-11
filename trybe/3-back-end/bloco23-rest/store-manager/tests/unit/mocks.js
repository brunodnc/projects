const productList = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
];

const newProduct = {
  "id": 4,
  "name": "ProdutoX"
}

const updatedProduct = {
  "id": 1,
  "name": "Martelo do Batman"
}

const newSales = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const salesReturn = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const salesList = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }];

const sale = [{
  "date": "2021-09-09T04:54:29.000Z",
  "productId": 1,
  "quantity": 2
},
{
  "date": "2021-09-09T04:54:54.000Z",
  "productId": 2,
  "quantity": 2
}];

  module.exports = {
    productList,
    newProduct,
    newSales,
    updatedProduct,
    salesReturn,
    salesList,
    sale,
  }