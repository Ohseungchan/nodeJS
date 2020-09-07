var http = require('http');
var url = require('url');
var folder = './fileManager';
var fs = require('fs');
var description = '';



var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
    
    console.log(queryData);
    
    
    if(_url == '/'){
        title='Welcome';
        description = 'text';
      }
   

    if(pathname = '/'){
        fs.readdir(folder, function (error, filelist) {
            console.log(filelist);
            description = 'hello, node.js';

            var list = '<ul>';

            var i = 0;
            while (i < filelist.length) {
                list = list + `<li>${filelist[i]}</li>`
                i = i + 1;
            }
            list = list + '</ul>';
        });


        

    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
     
});
app.listen(3000);