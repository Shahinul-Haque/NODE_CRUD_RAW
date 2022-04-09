
const handlers = {};

handlers.sampleHandlers = (data, callback)=>{
  
    callback(200, {
        message : 'This is a sample handlers',
        data : data.method
    })
}

module.exports = handlers;