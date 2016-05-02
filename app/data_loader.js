var World=require('./world');
var Product=require('./product');

module.exports=function(){
	var productData=require('../resources/products.json');
	for(var i=0;i<productData.length;i++){
     var prod=new Product(productData[i].name,productData[i].price)
     World.products.addProduct(prod);
	}
}
