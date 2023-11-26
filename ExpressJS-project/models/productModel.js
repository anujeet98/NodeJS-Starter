const path = require('path');
const fs = require('fs');

//data file path
const dataPath = path.join(__dirname, "..", "data", "productData.json");


const getAllproducts = (cb) =>{
    fs.readFile(dataPath, (err,data)=>{
        if(err){
            console.log("ReadError: ",err);
            cb([]);
        }
        else{
            cb(JSON.parse(data));
        }
    })
};

module.exports = class Product{
    constructor(name,size){
        this.name=name;
        this.size=size;
    };

    save(){
        //fetch from file->append and add it back
        getAllproducts((products)=>{
            products.push(this);
            fs.writeFile(dataPath, JSON.stringify(products),(err)=>{
                if(err){
                    console.log("WriteError: ",err);
                }
            })
        });
    }

    static fetchAllProducts(cb){
        //fetch from file
        getAllproducts(cb);
    }
}