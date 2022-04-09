
const StringDecoder = require('string_decoder').StringDecoder;
const url = require('url');
const routes = require('../routes');
const { notFoundHandlers } = require('../hanlders/nofFound');
const { JSONParse } = require('../helpers/utilities');

const handle= {}

handle.hanldeReqRes = (req, res)=> {

    const parsedUrl = url.parse(req.url, true);
    //pathname
    const path = parsedUrl.pathname;
    //Trimmedpath
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method;

    //const queryStringObject = parsedUrl.query;
    const queryStringObject = parsedUrl.query;

    //console.log('QueryObject-->', queryStringObject['phone']);
    const headers = req.headers;

    let realData = '';
    var decoder = new StringDecoder('utf-8');

    const requestProperties = {
        
      parsedUrl,
      path,
      method,
      queryStringObject,
      headers
   }   

    req.on('data',(chunk)=>{
      realData += decoder.write(chunk);

    })    

    req.on('end', ()=>{
        
      realData += decoder.end();  
      //console.log(realData);
         
      requestProperties.body = JSONParse(realData);


      const choosenHandler = typeof(routes[trimmedPath]) !== 'undefined' ? routes[trimmedPath] : notFoundHandlers 

      choosenHandler(requestProperties, (statusCode, payload)=>{

          let stCode = typeof(statusCode) === 'number' ? statusCode : 500;

          let payloadObject = typeof(payload) === 'object' ? payload : {};
  
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(stCode);          
          const payloadString = JSON.stringify(payloadObject);

          res.end(payloadString);
       })

    })


}

module.exports = handle;