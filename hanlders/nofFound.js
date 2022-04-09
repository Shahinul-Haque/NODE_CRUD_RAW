
const handlers = {};

handlers.notFoundHandlers = (data,callback)=>{
   callback(404, {
       message : 'Your URL not found.'
   })
}

module.exports = handlers;