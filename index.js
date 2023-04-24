var express=require("express");
// const sessionStorage = require('node-sessionstorage')
var cors=require("cors");
// var request = require("request");
const { MongoClient } = require('mongodb');
var app=express();
const url='mongodb+srv://mongo:BBHWWlZedtByFZG5@blog.7ivvyln.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url)
const databaseName='Teleport';
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());
const PORT =process.env.PORT||5050;

 app.get("/",function (req,res){
    res.sendFile(__dirname+"/login.html");   
 });
//  app.get("/listall",async function (req,res){
//     const arr=[];
//     let result = await client.connect();
//     db=result.db(databaseName);
//     check=await db.listCollections().toArray();
//     await check.forEach(async (item, indexs)=>{
//     var namer=check[indexs]["name"];
//     if(namer!="Login"){ 
//     collection=db.collection(namer);
//     data=await collection.find({}).toArray();
//     value={}
//     value[namer]=data;
//     arr.push(value)
//   }
//     if(indexs==check.length-1)res.send(arr);
// })
//  });
app.get("/listall",async function (req,res){
  var formated="";
  let result = await client.connect();
  db=result.db(databaseName);
  check=await db.listCollections().toArray();
  console.log("->");
  for(const indexs in check) {
 //check.forEach(async (item, indexs)=>{
  var namer=check[indexs]["name"];
  var length=check.length-1
  var end=check[length]["name"];
  console.log(namer);
  if(namer!="Login"){ 
  collection=await db.collection(namer);
  data=await collection.find({}).toArray();
  await data.forEach((item, indexx)=>{
  formated+=`<div style='margin:1px 2px;border-bottom: 5px solid black;background-color:yellow' id=${namer+indexx}><h1 style='text-align:center'>${data[indexx]['title']}</h1>${data[indexx]['content']}</div>`;
})
}
if(end=="Login"){if(indexs==length-1){console.log(data);console.log("tata");res.send(formated);}}//error page
else if(indexs==length)res.send(formated); 
}});

 app.get("/insert*",function (req,res){
  res.send(`<body style="background-color:red"><form method='post' action='/saveform'><input type='text' name="id" value=${req.originalUrl.split('/insert/')[1]} hidden /><br><input type='text' placeholder='title' id='title' name="title" required /><br><textarea name="content" placeholder='content' id='content' required ></textarea><br><button type='submit'>save</button></form></body>`);
  // history.pushState('www.fb.com');
 });
 app.post('/saveform',async function (req,res,next){
  let result = await client.connect();
  db=result.db(databaseName);
  collection=db.collection(req.body.id);
  data=await collection.countDocuments({ "_id": { "$exists": true } });
  data=await collection.insertOne({"_id":data+1,"title":req.body.title,"content":req.body.content});
  res.send(data);
})
 
app.get("/logcheck",async function (req,res){
  let result = await client.connect();
  db=result.db(databaseName);
  collection=db.collection('Login');
  check=await collection.find({ _id:req.originalUrl.split('?')[1].split('-%40-')[0]}).toArray();
    if(check.length!=0&&check[0]["password"]==req.originalUrl.split('?')[1].split('-%40-')[1])res.sendFile(__dirname+"/main.html");   
    else res.send("tata"+JSON.stringify(check)+"->"+req.originalUrl.split('?')[1].split('-%40-')[0]);
    
    // check=await collection.find({ _id:"nikhilkumaraman26"}).toArray();
    // if(check.length!=0&&check[0]["password"]==pwd)res.send("T");
    // else console.log("tata"+check.length);
    

 })
 app.get("/create",async function (req,res){
  let result = await client.connect();
    db=result.db(databaseName);
    collection=db.collection('Login');
    check=await collection.find({ _id:req.originalUrl.split('?')[1].split('-%40-')[0]}).toArray();
  if(check.length==0)res.sendFile(__dirname+"/create.html")
  else res.send(req.originalUrl.split('?')[1].split('-%40-')[0]+" alerdy exists");   
 });
 app.get("/record",async function (req,res){
  let result = await client.connect();
    db=result.db(databaseName);
    collection=db.collection('Login');
    check=await collection.find({ _id: req.originalUrl.split('?')[1].split('%40')[0]}).toArray();
    if(check.length==0)data=await collection.insertOne({"_id":req.originalUrl.split('?')[1].split('%40')[0],"password":req.originalUrl.split('?')[1].split('%40')[3].replace(/%20/g,' ')});
    else data="Already exists as follow"+JSON.stringify(check);
  res.send(data);
   
 });
app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));
