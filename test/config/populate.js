

var World=require('../../app/world');
var data=require('./data');

var Product=require('../../app/product');

module.exports=function(){
    this.clear();
    insertProducts();
    insertShipModels();
     //TODO
    insertCities();
    insertUsers();
    insertShips();
    };

module.exports.clear=function(){
    World.products.list={};
    World.ships.list={};
    World.users.users={};
    World.map.clear();
    
};

function insertProducts(){
    var products=[];
    for(var p in data.products) products.push(new Product(data.products[p].name,data.products[p].price));     
    for(var i=0;i<products;i++) World.products.addProduct(products[i]);    
}
function insertShipModels(){
    var ships=[];
    for(var s in data.ships) ships.push(new Ship(data.ships[s].name,data.ships[s]));
    for(var i=0;i<ships;i++) World.ships.addShip(ships[i]);
}
