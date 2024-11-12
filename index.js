// 引入 express
var express = require('express');
var app = express();

// 示例商品数据
var products = [
    { id: 1, name: "相机", price: 100, image: "https://raw.githubusercontent.com/dz77/rent_pic/refs/heads/main/wide300.png" },
    { id: 2, name: "笔记本电脑", price: 200, image: "https://example.com/images/laptop.jpg" },
    { id: 3, name: "自行车", price: 50, image: "https://example.com/images/bike.jpg" },
];

// 获取商品列表
app.get('/products', function(req, res) {
    res.json(products);
});

// 获取单个商品详情
app.get('/products/:id', function(req, res) {
    var productId = req.params.id;
    var product = products.find(function(p) {
        return p.id == productId;
    });
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('商品未找到');
    }
});

// 启动服务器
var PORT = 3000;

console.log("服务器即将启动...");
app.listen(PORT, function() {
    console.log('后端服务器运行在 http://localhost:' + PORT);
});
