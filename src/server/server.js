var express = require('express');
var app = express();
var sql = require("mssql");

app.get('/getAllTables', function(req, res){
    var result = getAllDatasources();
    result.then(function(responseObject){ 
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send(responseObject);
    });
});

function getAllDatasources()
{
    return new Promise(function(resolve, reject) {
        var request = new sql.Request();
        var qry = 'select application from tbl_datasources where status =1';
        request.query(qry, function(err,recordset){
            if (err) {
                return reject(err);
             }else{
                var responseObject = [];
                var result = getTablesColumns(recordset.recordset);
                result.then(function(response){ 
                    resolve(response); 
                });              
             } 
        });
    });
}
function getTablesColumns(tables){
    return new Promise(function(resolve, reject){
        var request = new sql.Request();
        var tableColumns = {};
        tables.forEach(function(table){
            getColumns(table).then(function(response){
                tableColumns[table.application] = response;
                if(Object.keys(tableColumns).length === tables.length){
                    resolve(tableColumns);
                }
            });        
        });  
    });
}
function getColumns(table){
    return new Promise(function(resolve, reject){
        var request = new sql.Request();
        var qry  = 'EXEC sp_columns '+table.application;
        return request.query(qry, function (err, recordset) {
            if (err) {
                return reject(err);
             }else{
                resolve(recordset.recordset);
             }               
        });
    });
}
app.post('/deleteApplication',function(req,res) {
    var request = new sql.Request();
    // query to the database and get the records
    request.query('delete from tbl_applications where id='+req.query.appid, function (err, recordset) {
        if (err) {
            console.log(err)
         }else{
            // send records as a response
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.send(recordset.rowsAffected);               
         }               
    });
});
app.get('/applications',function(req,res) {
    var request = new sql.Request();
    // query to the database and get the records
    request.query('select * from tbl_applications', function (err, recordset) {
        if (err) {
            console.log(err)
         }else{
            // send records as a response
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.send(recordset.recordset);               
         }               
    });
});
app.get('/htmlelements', function (req, res) {
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from tbl_html_elements', function (err, recordset) {
            if (err) {
                console.log(err)
             }else{
                // send records as a response
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(recordset.recordset);               
             }               
        });
});
app.get('/getTableData', function(req, res){
    var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from '+req.query.table, function (err, recordset) {
            if (err) {
                console.log(err)
             }else{
                // send records as a response
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(recordset.recordset);               
             }               
        });
});
app.post('/updateApplication', function(req, res){
    var qry = "update tbl_applications set name = '"+req.query.name+"', elements = '["+req.query.elements+"]' where id = "+req.query.appid;
    var request = new sql.Request();
        request.query(qry, function (err, result) {
            if (err) {
                console.log(err)
             }else{
                // send records as a response
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(result.rowsAffected);  
             }               
        });
});
app.post('/saveApplication', function(req, res){
    var qry = "insert into tbl_applications (name, datasource, elements) values ('"+req.query.name+"', '"+req.query.table+"', '["+req.query.elements+"]')";
    var request = new sql.Request();
        request.query(qry, function (err, result) {
            if (err) {
                console.log(err)
             }else{
                var str = "SELECT @@IDENTITY AS 'identity'";
                request.query(str, function(suberr, subdata)
                {
                    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                    res.send({id:subdata.recordset[0].identity})   
                });
             }               
        });
});
app.get('/deleteRow', function(req, res){
    var qry = 'delete from '+req.query.table+' where id='+req.query.id;
    console.log(qry);
    var request = new sql.Request();
        request.query(qry, function (err, recordset) {
            if (err) {
                console.log(err)
             }else{
                // send records as a response
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send(recordset.recordset);               
             }               
        });
});
var server = app.listen(5000, function () {

    // config for your database
    var config = {
        user: "sa",
        password: "Mcbitss100%",
        server: 'MCBITSSHYD',
        database: "wizapp"
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) {
            console.log(err);
         }
    }) 

});