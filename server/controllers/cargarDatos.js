const storage = require('../Storage')

function getFiltros(req, res){
	//esta funcion carga los filtros
	storage.getData()
	       .then((data) =>{	       	 
	       	 //aqui tenemos que guardar la data en ciudades y tipos creamos dos arrays
             let ciudad = [];
             let tipo = [];
             data.forEach((element, index) => {
             	if(ciudad.indexOf(element.Ciudad) < 0){
             		ciudad.push(element.Ciudad);
             	}
             	if(tipo.indexOf(element.Tipo) < 0){
             		tipo.push(element.Tipo);
             	}             	
             });
	       	 //console.log('Se cargaron todos los Datos Exitosamente de la getData' + data);
	       	 res.json({"error":false,"ciudades":ciudad,"tipos": tipo});
	       })
	       .catch((err) => {	       	 
	       	 res.json({"error": true,"datos":err});
	       })

     console.log('Filtros Cargados Correctamente');
}

function getTodo(req, res){
	//esta funcion carga todos los datos		
	storage.getData()
	       .then((data) =>{
	       	 res.json({"error":false,"datos":data});	       	 
	       	 console.log('Se cargaron todos los Datos Exitosamente de la getData' + data);
	       })
	       .catch((err) => {	       	
	       	 res.json({"error": true,"datos":err});
	       })

	       
	console.log('Se cargaron todos los Datos Exitosamente');
}

function getPersonaliza(req, res){
	//primero creo una variable que va a tener los datos que llegan por get
	let datosGet = req.params;	
	let dataCiudad = [];
	let dataTipo = [];
	let dataPer = [];
	let aux = [];
	let datos = [];
	let aux2 = [];
	//despues traigo los datos almacenados en data.json
	storage.getData()
	       .then((data)=>{
	       	aux = data.slice();
	       	//**************************************
	       	//primero tenemos que comprobar que el el select de ciudad se selecciono algo
	       	 if(datosGet.ciudadId == "todas"){
	       	  	  //si no se escogio nada quiere decir que en ciudad tienen que ir todas y la data se queda igual
	       	  	  dataCiudad = aux.slice();
	       	  }else{
	       	  	//si se escogio una ciudad comparamos los datos
	       	  	aux.forEach((element, index) => {
                   if(element.Ciudad == datosGet.ciudadId){
                   	  dataCiudad.push(element);
                   }
                });
	       	  }
	       	  //hacemos una copia de los datos de ciudad para filtrar ahora por tipo
	       	  	aux = [];
	       	  	aux = dataCiudad.slice();
	       	 //comprobamos qu el select de tipo seleccciono algo
	       	 if(datosGet.tipoId == "todos"){
	       	  	//si no se escogio nada 
	       	  	dataTipo = aux.slice();	       	  	
	       	  }else{
	       	  	//si no comparamos los datos
                	//tenemos que hacer un bucle para comparar los datos
			       	aux.forEach((element, index) => {
			       		if(element.Tipo == datosGet.tipoId){
			       			dataTipo.push(element);
			       		}
			       	});				       
	       	  }  
	       	  //hacemos una copia para filtrar por precio
			      aux = [];
			      aux = dataTipo.slice();		       	
	       	  //aqui empezamos con los datos por precio
	       	    aux.forEach((element, index) => {
			        let precio = parseInt(element.Precio.replace("$","").replace(",",""));
			       	if(precio >= parseInt(datosGet.desdeVal) && precio <= parseInt(datosGet.hastaVal)){
			       		    dataPer.push(element);
			       		} 
			      });	
	       	//**************************************
	       	res.status(200).json({"error": false,"datos":dataPer});
	       })
	       .catch((err)=>{
	       	 res.json({"error": true,"datos":err});
	       })   
   console.log('La api funciona correctamente');
}

module.exports = {
	getFiltros,
	getTodo,
	getPersonaliza
}
