var express = require("express");
var bodyParser = require('body-parser');
var app = express();

const mysql   = require('mysql');

app.use(bodyParser.json());
app.use(function (req, res, next) { ;
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Codingpedia, Authorization');
    next();
});
 

function execSQLQuery(SQLQry, res){
 const connection = mysql.createConnection({
 host : "localhost",
 user : "root",
 port : "3306",
 password : "123456",
 database : "bdMean"
 });
  connection.query(SQLQry, function(error,results, fields){
  if (error){
   res.json(error);
  }
  else{
      res.json(results);
  }
    connection.end();
     console.log('Executou ...');
  });
}

app.post("/usuario", (req,res)=>{
   var nome = req.body.nome;
   var login = req.body.login;
   var senha = req.body.senha;

   execSQLQuery(`insert into usuario (nome,login,senha)
    values ('${nome}','${login}','${senha}')`, res);
  
});

app.get("/usuario", (_,res)=>{
    execSQLQuery(`select * from  usuario`, res);
});

app.get("/usuario/:id", (req,res)=>{
    var vid = parseInt(req.params.id);
    execSQLQuery(`select * from  usuario where id=`+ vid, res);
});

app.post("/usuario/logar", (req,res)=>{
    var vlogin = req.body.login;
    var vsenha = req.body.senha;
 
    execSQLQuery(`select * from usuario where login='${vlogin}' and
     senha='${vsenha}' `, res);
   
 });


var server = app.listen(1234,"0.0.0.0", function(){
   var host = server.address().address;
   var port = server.address().port;
   console.log('Listening at http:%s:%s', host, port);
});

