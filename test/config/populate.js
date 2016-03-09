
var async=require('async');

var World=require('../../app/world');
var data=require('./data');

var Product=require('../../app/product');
var Ship=rrequire('../../app/ship');
var City=require('../../app/city');

module.exports=function(done){
    this.clear();
    insertProducts();
    insertShipModels();
    insertCities();
    insertUsers(function(){
        insertShips();
        done();
    });
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
function insertCities(){
    var cities=[];
    var productList=World.products.getProductList();
    for(var c in data.cities){
        var cdata=data.cities[c];
         var l=cities.push(new City(cdata.name,[cdata.positionX,cdata.positionY]));
         var newcity=cities[l-1];
         for(var p in productList) newcity.addProduct(p,10,1); 
         for(var i=0;i<cities.length;i++) World.cities.addCity(cities[i]);
    }
}
function insertUsers(done){
    async.forEachOf(data.users,function(user,key,cb){
        World.users.addUser(user.id,function(err,res){
            res.money=user.money;
            cb();            
        });        
    },function(err){
        done();        
    });
}
function insertShips(){
    
    
    
}
