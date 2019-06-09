const fs = require('fs');
const path = require('path'); 

//esta funcion es para guardar un nuevo usuario o un nuevo mensaje en formato string
module.exports = {
	
  //funcion para leer del users.json o menssages.json un objeto en formato json
	getData: () => {
        let dataPath = __dirname + path.join('/data/data.json');                     
        return new Promise((resolve, reject) => {
        	fs.readFile(dataPath, 'utf8', (err, readData) => {
        		if(err) reject(err)
        		resolve(JSON.parse(readData));	
        	});
        });             
	}    

}    