


var template = {
    HTML: function (title, list, body, control) {
        return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        
        <style>
          body{
           margin:0;
          }
          a {
            color: black;
            text-decoration: none;
          }

          h1 {
            forn-size:45px;
            text-align: center;
            border-bottom: 1px solid gray;
            margin:0;
            padding:20px;
          }

          
          h2 {
            forn-size:20px;
            margin:0;
            padding:20px;
          }

          ul{
            border-right:1px solid gray;
            width:200px;
            margin:0;
            padding:10px;
          }

          

          
          input[type="text"]{
            width: 50%;
            padding: 10px 20px;
            margin: 5px 0;
            box-sizing: border-box;
          }

          textarea {
            width: 100%;
            height: 200px;
            padding: 10px 20px;
            margin: 5px 0;
            box-sizing: border-box;
            font-family: Malgun Gothic;
          }

          p{
            font-family: Malgun Gothic;
          }

          pre{
            font-family: Malgun Gothic;
          }

          #grid{
            display: grid;
            grid-template-columns: 250px 1fr;
            border-bottom: 1px solid gray;
          }

          #grid a{
            margin:0;
          }
          #grid ul{
            padding-left:33px;

            margin:0;
          }
  
          #grid #article{
            padding:20px;   
          }

          #grid1{
            display: grid;
            grid-template-columns: 100px 100px 100px;
            
          }

          
          .btn {
            background-color: #87CEEB;
            padding: 10px;
            margin: 10px;
            border: none;
            color: white;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            display: inline-block;
            cursor: pointer;
            transition-duration: 0.4s;
          }
          .btn1:hover, .btn2:hover, .btn3:hover , .btn4:hover {
            background-color: #4169E1;
            color: white;
          }

          @media(max-width:800px){
            #grid{
              display: block;
              border-bottom:none;
            }

            ul{
              border-right:none;
              width:100%;
            }
            h1{
              border-bottom:none;
            }
          }

        
        </style>


      </head>
      <body>
  
        <h1><a href="/sub">AWESOME</a></h1>
        <div id="grid">
            ${list}
          
          <div id="article">
            ${body}
          </div>
        </div>

        ${control}
        
        
   
        <p id="demo"></p>
      
       
      </body>

      </html>
      `;
    }, list: function (filelist) {
        var list = '<ul>';
        var i = 0;
        while (i < filelist.length) {
            list = list + `<li><a href="?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
        }
        list = list + '</ul>';
        return list;
    }
}

module.exports = template;
