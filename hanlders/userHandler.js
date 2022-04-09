const { hash } = require('../helpers/utilities');
const data = require('../lib/data');
const { JSONParse } = require('../helpers/utilities');

const handler = {};

handler.userHandler = (requestProperties, callback)=>{
   
     const acceptMethods = ['GET', 'POST', 'PUT', 'DELETE'];

     if(acceptMethods.indexOf(requestProperties.method) > -1){
          
         handler._users[requestProperties.method](requestProperties, callback)
     }else{
         callback(400)
     }
}

handler._users = {} ;
handler._users.POST = (requestProperties, callback)=>{


    const firstName = typeof(requestProperties.body.firstName) === 'string' &&
                         requestProperties.body.firstName.trim().length > 0 ?
                           requestProperties.body.firstName : false;

    const lastName = typeof(requestProperties.body.lastName) === 'string' &&
                        requestProperties.body.lastName.trim().length > 0 ?
                            requestProperties.body.lastName : false;


    const phone = typeof(requestProperties.body.phone) === 'string' &&
                        requestProperties.body.phone.trim().length > 0 ?
                            requestProperties.body.phone : false;                                             

    const password = typeof(requestProperties.body.password) === 'string' &&
                            requestProperties.body.password.trim().length > 0 ?
                                requestProperties.body.password : false;   
                                                    

    const tosAgreement = typeof(requestProperties.body.tosAgreement) === 'boolean' ?                            
                                  requestProperties.body.tosAgreement : false;   


    if(firstName && lastName && phone && password && tosAgreement){    

       data.read('users', phone, (err, user)=>{
          //console.log(err)
          if(err){             
             const userObject = {
                 firstName,
                 lastName,
                 phone,
                 password: hash(password),
                 tosAgreement,
             }
           
             data.create('users', phone, userObject, (err1)=>{
                 if(!err1){
                     callback(200, {
                         message : 'User added successfully.'
                     })
                 }else{
                     callback(401,{
                         error : 'Could not create user.'
                     })
                 }
             })

          }else{
              callback(500, {
                  error: 'There was a problem in server side.'
              })
          }
       })

    }

}
                    
// handler._users.GET = (requestProperties, callback)=>{

//     const phone = typeof requestProperties.queryStringObject.phone === 'string' &&
//                          requestProperties.queryStringObject.phone.trim().length === 11
//                          ?
//                          requestProperties.queryStringObject.phone : false;     
     
                      
//     if(phone){

//         const res = data.output('users', 'newFile');
//         console.log('Here is the result',res);
//         data.read('users', 'newFile', (err, u)=>{

//             const user = { ...JSONParse(u) };
//             // console.log('query params phone->', phone);
//             console.log('err' , err)   
//             if(!err && user){              
              
//                  delete user.password;

//                  callback(201, {
//                      user : user
//                  })
             
//             }else{
//                callback(401, {
//                    error: 'Request user not found.'
//                })
//             }
//         })

//     }else{
//         callback(401, {
//             error : 'Requested user has not found.'
//         })
//     }

   
// }


handler._users.GET = function(requestProperties,callback){
    // Check that phone number is valid
    var phone = typeof(requestProperties.queryStringObject.phone) == 'string' && requestProperties.queryStringObject.phone.trim().length == 11 ? requestProperties.queryStringObject.phone.trim() : false;
    if(phone){
      // Lookup the user
      data.read('users',phone,function(err,user){

        const userObject = { ...JSONParse(user) };
        console.log(err);
        console.log('user and userobejctParse-->', user, userObject);

        if(!err && userObject){
          // Remove the hashed password from the user user object before returning it to the requester
          delete userObject.password;
          callback(200,userObject);
        } else {
          callback(404);
        }
      });
    } else {
      callback(400,{'Error' : 'Missing required field'})
    }
  };




handler._users.DELETE = {}
handler._users.PUT = {}


module.exports = handler;