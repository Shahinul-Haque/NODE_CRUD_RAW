const fs = require('fs');
const path = require('path');

const lib = {};

lib.baseDir = path.join(__dirname, '../.data/');

lib.create = (dir, file, data, callback)=>{
     
    fs.open(`${lib.baseDir + dir}/ ${file}.json`,'wx',(err, fileDescription)=>{

        if(!err && fileDescription){
          
             const stringfyData = JSON.stringify(data);

             fs.writeFile(fileDescription, stringfyData, (err1)=>{
                 if(!err1){

                     fs.close(fileDescription, (err2)=>{
                           
                        if(!err2){
                            callback(false)
                        }else{
                            callback('Error closing')
                        }
                     })
                 
                 }else{
                     callback('error writing to new file.')
                 }
             })

        }else{
            callback('File already exist')
        }
    })
}

// lib.read = (dir, file, callback) =>{
     
//     fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', (err, data)=>{        
//             callback(err, data);
       
//     })
// }

// Read data from a file
lib.read = function(dir,file,callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function(err,data){
     callback(err, data);
  });
};

lib.update = (dir, file, data, callback)=>{
  
     fs.open(`${lib.baseDir + dir}/${file}.json`, 'r+', (err1, fileDescription)=>{
            if(!err1 && fileDescription){
                  
                const stringfyData = JSON.stringify(data);
                
                fs.ftruncate(fileDescription, (err2)=>{

                    if(!err2){
                        fs.writeFile(fileDescription, stringfyData, (err3)=>{
                           
                             if(!err3){
                                
                                fs.close(fileDescription, (err)=>{
                                    if(!err){
                                        callback(false);
                                    }else{
                                        callback('Closing error.')
                                    }
                                })

                             }else{
                                 callback('Error when writting your file.')
                             }
                        })
                    }else{
                       callback('Error truncating file.')
                    }
                })
            }else{
                callback('The file has not found.')
            }
     })
}

lib.delete = (dir, file, callback)=>{

    fs.unlink(`${lib.baseDir + dir}/${file}.json`, (err)=>{
        if(!err){
            callback(false)
        }else{
            callback('Error deleting the file.')
        }
    })
}

lib.output = (dir, file)=>{
    return lib.baseDir+dir+'/'+file+'.json'
}
 

module.exports = lib;