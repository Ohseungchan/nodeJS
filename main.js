// 참고 : https://www.opentutorials.org/course/3332
// 자바스크립트 prompt 를 활용하여 관리자 페이지와 사용자 페이지를 구현함.
// 관리자페이지는 template.js, 사용자페이지는  templateSub.js로 구분함.
// root 로 접근시 관리자 페이지를 가기위해서 패스워드 입력해야함. (null 값이나 패스워드 미일치시 사용자 페이지로 감)
// 57번줄 if(person==="DFDD3D9F887E013A16577C1D3A7BDAD35A64AD50EBC8C95A2AFEA95C7C4ED271") 에 패스워드 입력
// 관리자페이지에서 생성, 수정, 삭제시 패스워드 입력해야함.
// 139번줄 생성 패스워드
// 204번줄 수정 패스워드, 삭제는 루트로 리다이렉션 하기 때문에 삭제 버튼후 패스워드 입력

var http = require('http');  // nodeJS 서버를 동작시키기위한 라이브러리를 불러와서 변수에 저장.
var fs = require('fs');      // 파일관리 라이브러리를 불러와 변수에 저장.
var url = require('url');   // url을 다루는 라이브러리를 불러와 변수에 저장.
var qs = require('querystring');  // 웹브라우저에서 보낸 데이터를 파싱하기 위한 라이브러리를 불러와 변수에 저장.
var path = require('path');  // 입력보안을 위한 라이브러리, 속성 { root: '/', dir: '/', base: '', ext: '', name: '' }
var template = require('./module/template.js') // 웹브라우저에 응답하는 페이지를 작성한 후 라이브러리 형태로 가져옴. 
var templateSub = require('./module/templateSub.js') // 웹브라우저에 응답하는 페이지를 작성한 후 라이브러리 형태로 가져옴. 
var sanitizeHtml = require('sanitize-html'); // 출력보안을 위한 라이브러리

// http 라이브러리의 createServer() 함수를 이용해 'http 서버'를 생성한다.
// createServer 는 웹브라우저의 요청이 있을 때마다 실행됨.
// request는 웹브라우저가 요청한 정보를 저장.
// response는 nodejs 서버가 웹브라우저에 전달할 정보를 저장.
var app = http.createServer(function (request, response) {
    
   
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    console.log(pathname);

    if (pathname === '/') {
 
        if (_url == '/') {
            // 파일기능 수행
            fs.readdir('./data', function (error, filelist) {
                console.log(filelist);
                // var filteredId = path.parse(filelist).base;
                fs.readFile(`./data/${queryData.id}`, 'utf8',
                    function (err, description) {                      
                        var list = template.list(filelist);
                        var title = '관리자페이지';
                        var sanitizeTitle = sanitizeHtml(title);

                        description = '여기는 관리자 페이지입니다. 관리자가 파일을 추가, 수정, 삭제 할 수 있습니다.';
                        var sanitizeDesc = sanitizeHtml(description);
                        
                        var html = template.HTML(sanitizeTitle, list, `<h2>${sanitizeTitle}</h2>${sanitizeDesc}`,  
                        `<a href="/create"  class="btn btn1">create</a>
                        `,`<script>
                        function myFunction() {
                            var txt;
                            var person = prompt("Enter 를 눌러주세요", '');
                  
                            if(person==="DFDD3D9F887E013A16577C1D3A7BDAD35A64AD50EBC8C95A2AFEA95C7C4ED271"){
                              return true; 
                              } else {
                              location.href = "/sub";                      
                              }
                        }  
                  
                        myFunction();
                            
                        </script>`);
                        response.writeHead(200);
                        response.end(html);

                    });
            });
        
        // url 주소가 root가 아닌 경우, 조건문
        } else if(_url==='/data') {
            // 파일기능 수행
            // queryDataId
            fs.readdir('./data', function (error, filelist) {

                console.log(filelist);
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`./data/${filteredId}`, 'utf8',
                    function (err, description) {
                        var title = queryData.id;
                        var sanitizeTitle = sanitizeHtml(title);
                        var sanitizeDesc = sanitizeHtml(description); 
                        var list = template.list(filelist);
                        var html = template.HTML(sanitizeTitle, list,
                            `<h2>${sanitizeTitle}</h2><pre>${sanitizeDesc}</pre>`,
                            `<a href="/create" class="btn btn1">create</a>
                            <a href="/update?id=${sanitizeTitle}" class="btn btn2">update</a>
                            <form action="delete_process" method="post">
                                 <input type="hidden" name="id" value="${sanitizeTitle}">
                                <input type="submit" value="delete" class="btn btn3" >
                            </form>`,'');
                        response.writeHead(200);
                        response.end(html);
                    });
            });
        } else{
            fs.readdir('./data', function (error, filelist) {

                console.log(filelist);
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`./data/${filteredId}`, 'utf8',
                    function (err, description) {
                        var title = queryData.id;
                        var sanitizeTitle = sanitizeHtml(title);
                        var sanitizeDesc = sanitizeHtml(description); 
                        var list = template.list(filelist);
                        var html = template.HTML(sanitizeTitle, list,
                            `<h2>${sanitizeTitle}</h2><pre>${sanitizeDesc}</pre>`,
                            `<a href="/create"  class="btn btn1">create</a>
                            <a href="/update?id=${sanitizeTitle}"  class="btn btn2">update</a>
                            <form action="delete_process" method="post">
                                 <input type="hidden" name="id" value="${sanitizeTitle}">
                                <input type="submit" value="delete" class="btn btn3" >
                            </form>`,'');
                        response.writeHead(200);
                        response.end(html);
                    });
            });
        }
    }
    else if (pathname === '/create') {
        fs.readdir('./data', function (error, filelist) {
            var title = 'WEB - create';
            var list = template.list(filelist);
            var html = template.HTML(title, list,
                `<form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit" class="btn btn4" value="Create">
            </p>
            </form>
           
            `, '',`<script>
            function myFunction() {
                var txt;
                var person = prompt("Enter 를 눌러주세요", '');
      
                if(person==="DFDD3D9F887E013A16577C1D3A7BDAD35A64AD50EBC8C95A2AFEA95C7C4ED271"){
                  return true; 
                  } else {
                  return false;                     
                  }
            }  
      
            myFunction();
                
            </script>`);
            response.writeHead(200);
            response.end(html);
        });

    } else if (pathname === '/create_process') {

        var body = '';

        // 웹브라우저에서 nodejs 서버로 들어오는 데이터가 있으면 실행됨.
        request.on('data', function (data) {
            body = body + data;
        });

        // 웹브라우저에서 nodejs 서버로 들어오는 정보가 없으면 실행됨.
        request.on('end', function () {
            var post = qs.parse(body);
            var title = post.title;
            var desc = post.description;

            fs.writeFile(`data/${title}`, desc, 'utf8', function (err) {
                response.writeHead(302, { Location: `/?id=${title}` });
                response.end();
            });

            console.log(post);
        });

    } else if (pathname === '/update') {

        fs.readdir('./data', function (error, filelist) {
            console.log(filelist);
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`./data/${filteredId}`, 'utf8',
                function (err, description) {
                    console.log(description);
                    var title = queryData.id;
                    var list = template.list(filelist);
                    var html = template.HTML(title, list, `
                    <form action="/update_process" method="post">
                      <input type="hidden" name="id" value="${title}">
                      <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                      <p>
                        <textarea name="description" placeholder="description">${description}</textarea>
                      </p>
                      <p>
                        <input type="submit" class="btn btn4" value="수정">
                      </p>
                    </form>
                    `, `<a href="/create" class="btn btn1">create</a> 
                    <a href="/update?id=${title}" class="btn btn2">초기화</a>`,`<script>
                    function myFunction() {
                        var txt;
                        var person = prompt("Enter 를 눌러주세요", '');

                        if(person==="DFDD3D9F887E013A16577C1D3A7BDAD35A64AD50EBC8C95A2AFEA95C7C4ED271"){
                          return true; 
                          } else {
                          return false;                     
                          }
                    }  
              
                    myFunction();
                        
                    </script>`);
                    response.writeHead(200);
                    response.end(html);
                });

        });

    } else if (pathname === '/update_process') {
        var body = '';
        request.on('data',function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var desc = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function (error) {
                fs.writeFile(`data/${title}`, desc, 'utf8', function (err) {
                    response.writeHead(302, { Location: `/?id=${title}` });
                    response.end();
                })
            });
        });

    } else if (pathname === '/delete_process') {
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`, function (error) {
                response.writeHead(302, { Location: '/' });
                response.end();
            });
        });
    } else if (pathname === '/sub') {
        
        if(_url == '/sub'){
            fs.readdir('./data', function (error, filelist) {
                console.log(filelist);
                // var filteredId = path.parse(filelist).base;
                fs.readFile(`./data/${queryData.id}`, 'utf8',
                    function (err, description) {                      
                        var list = templateSub.list(filelist);
                        var title = '사용자 페이지';
                        var sanitizeTitle = sanitizeHtml(title);

                        description = '여기는 사용자가 관리자가 게시한 글을 읽는 곳입니다.';
                        var sanitizeDesc = sanitizeHtml(description);
                        
                        var html = templateSub.HTML(sanitizeTitle, list, `<h2>${sanitizeTitle}</h2>${sanitizeDesc}`,   
                        
                        '','');
                        response.writeHead(200);
                        response.end(html);

                    });
            });

            
        } else {
            fs.readdir('./data', function (error, filelist) {

                console.log(filelist);
                
                fs.readFile(`./data/${queryData.id}`, 'utf8',
                    function (err, description) {
                        console.log(description);
                        
                        var title = queryData.id;
                        var sanitizeTitle = sanitizeHtml(title);
                        var sanitizeDesc = sanitizeHtml(description); 
                        var list = templateSub.list(filelist);
                        var html = templateSub.HTML(sanitizeTitle, list,
                            `<h2>${sanitizeTitle}</h2><pre>${sanitizeDesc}</pre>`,
                            '');
                        response.writeHead(200);
                        response.end(html);
                    });
            });    
        }
        console.log(_url);
        
        
       
    } else if (pathname === '/data') {

        fs.readdir('./data', function (error, filelist) {
            console.log(filelist);
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`./data/${filteredId}`, 'utf8',
                function (err, description) {
                    console.log(description);
                    var title = queryData.id;
                    var sanitizeTitle = sanitizeHtml(title);
                    var sanitizeDesc = sanitizeHtml(description); 
                    var list = template.list(filelist);
                    var html = template.HTML(sanitizeTitle, list,
                        `<h2>${sanitizeTitle}</h2><pre>${sanitizeDesc}</pre>`,
                        `<a href="/create"  class="btn btn1">create</a>
                        <a href="/update?id=${sanitizeTitle}" class="btn btn2">update</a>
                        <form action="delete_process" method="post">
                             <input type="hidden" name="id" value="${sanitizeTitle}">
                            <input type="submit" value="delete" class="btn btn3" >
                        </form>`,'');
                    response.writeHead(200);
                    response.end(html);
                });

        });

    } else {
        response.writeHead(404);
        response.end('Not Found');
    }

});

app.listen(3000);
