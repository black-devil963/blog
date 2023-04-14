const { MongoClient } = require('mongodb');
const url='mongodb+srv://mongo:BBHWWlZedtByFZG5@blog.7ivvyln.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url)
const databaseName='Teleport';
async function comput(){
  val='nkapnbe';
  let result = await client.connect();
    db=result.db(databaseName);
    collection=db.collection('Login');
    check=await collection.find({ _id: val}).toArray();
    if(check.length==1){
      collection=db.collection(val);
      data=await collection.insertOne({"_id":2});
    }
    else data="Already exists as follow"+JSON.stringify(check);
    console.log(data);
 }
 async function compute(){
  let result = await client.connect();
    db=result.db(databaseName);
    collection=db.collection('Login');
    check=await db.find({}).toArray();
    console.log(check);
    
 }
 async function computecollect(){
  let result = await client.connect();
    db=result.db(databaseName);
    collection=db.collection('Login');
    check=await db.listCollections().toArray();
    check.forEach((item, indexs)=>{
    check[indexs]=check[indexs]["name"]; 
    })
    console.log(check);
 }
 async function Listall(){
  let result = await client.connect();
    db=result.db(databaseName);
    check=await db.listCollections().toArray();
    check.forEach(async (item, indexs)=>{
    if(check[indexs]["name"]!="Login"){ 
    collection=db.collection(check[indexs]["name"]);
    data=await collection.find({}).toArray();
    console.log(data);}
    })
 }
 async function ListId(){
  let result = await client.connect();
    db=result.db(databaseName);
    val="nkapnbe";
    collection=db.collection(val);
    data=await collection.find({}).toArray();
    console.log(data);
    
 }
 async function insertBlog(){
  let result = await client.connect();
    db=result.db(databaseName);
    val="nkapnbe";
    title="ajb prem ki gjb khani";
    content="mujse shadi krogi kya?"
    collection=db.collection(val);
    data=await collection.countDocuments({ "_id": { "$exists": true } });
    data=await collection.insertOne({"_id":data+1,"title":title,"content":content});
    console.log(data);
 }
 Listall()
 