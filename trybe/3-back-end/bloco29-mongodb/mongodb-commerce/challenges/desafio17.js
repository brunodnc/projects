db.resumoProdutos.insert({ franquia: "McDonalds", totalProdutos: db.produtos.countDocuments({}) });
db.resumoProdutos.find({}, { _id: 0 });