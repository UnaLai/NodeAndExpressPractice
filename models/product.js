// const products = [];
const fs = require('fs')
const path = require('path')

module.exports = class Product {
  constructor(t){
    this.title = t
  }
  save(){
    //取得檔案路徑
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'product.json'
    );

    //讀取檔案
    fs.readFile(p,(err,fileContent)=>{
      let products = [];
      //如果確實讀取檔案，就先存取它原本的內容
      if(!err){
        products = JSON.parse(fileContent)
      }
      //新增新內容
      products.push(this);
      //把資料寫入檔案中
      fs.writeFile(p,JSON.stringify(products),(err)=>{
        console.log(err)
      });
    })
  }
  static fetchAll(callback){
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'product.json'
    );
    fs.readFile(p,(err,fileContent)=>{
      if(err){
        callback([]);
      }else{
        callback(JSON.parse(fileContent));
      }
    })
  }
}