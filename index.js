const http = require('http');
const { hanldeReqRes }  = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
const lib = require('./lib/data');


//const data = { name : 'USA', language : 'English'};

// const phone = 01813314440;

// lib.read('users',`${phone}`, (err, data)=>{
//     console.log('Here is the user data->',err)
// })

// lib.create('test', 'newFile', data, (err)=>{
//     console.log(err);
// })

// lib.delete('test', 'newFile', (err, data)=>{
//     console.log( err, data);
// })

const app = {};

app.confing = {
    PORT : 5000
}

app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes);

    server.listen(environment.PORT, console.log(`Server is runnong on ${environment.PORT}`));
}

app.handleReqRes = hanldeReqRes

app.createServer();