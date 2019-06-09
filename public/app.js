//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

//setSearch()

//mi app
(function(document, window, undefined, $){
    (function (){
        return app = {
            //variables
            url:"http://localhost:3000/",
            miUrl:"",
            $buscar:$('#buscar'),//boton Ver todos
            $checkPersonalizada:$('#checkPersonalizada'),
            $lista:$('.lista'),
            $rangoPrecio:$("#rangoPrecio"),//este es el slider
            $ciudad:$('#ciudad'),//select ciudad
            $tipo:$('#tipo'),//select tipo
            init:function(){
              this.cargarFiltro();
              this.eventoBuscar();
              
            },
            eventoBuscar: function(){
               //aqui va a estar el evento para buscar y despues lo llamaremos  en init
                let self = this;
                self.$buscar.on('click', function(){
                 //aqui tenemos dos opciones
                 //si checkPersonalizada esta cheked es una busqueda personalizada y si no se buscan todos  
                    if(self.$checkPersonalizada[0].checked){
                         //busqueda personalizada
                     var valor = self.$rangoPrecio.val();
                     valor = valor.split(";");
                     let rango = {
                            "min": valor[0],
                            "max": valor[1]
                        }
                     self.miUrl = "";
                     self.miUrl = self.url + `ciudad/${self.$ciudad.val()}/tipo/${self.$tipo.val()}/desde/${rango.min}/hasta/${rango.max}`;
                     console.log("Mi url en cheked es: " + self.miUrl);                    
                     
                    }else{
                      //buscar todos
                     self.miUrl = "";
                     self.miUrl = self.url + "cargarTodo";
                     console.log("Mi url es: " + self.miUrl);                    

                    }
                //llamo a ajax                     
                  self.miAjax(self.miUrl, 'get', 'json')
                        .done(function(data){
                                  
                         self.$lista.html(self.render(data.datos));
                                    
                             if(data.error){
                                  console.log("Error en los Datos");
                              }else{
                                console.log("Datos obtenidos exitosamente" + data);
                                    }

                        }).catch((err) => {
                             res.json({ "error": true, "datos": err });
                             console.log(self.miUrl);
                        });
    
               })//self.$buscar.on
            },
            cargarFiltro:function(){
              //cargarFiltros
              let self = this;
              self.miUrl = "";
              self.miUrl = self.url + "cargarFiltros";
               self.miAjax(self.miUrl, 'get', 'json')
                          .done(function(data){                            
                            //cargo los filtros en los select
                            self.$ciudad.append(self.renderFiltro(data.ciudades));                            
                            self.$tipo.append(self.renderFiltro(data.tipos)); 
                            self.$ciudad.material_select();
                            self.$tipo.material_select();                                                        
                            console.log(data);  

                          }).catch((err) => {
                              res.json({ "error": true, "datos": err });
                              console.log(self.miUrl);
                          });

            },
            renderFiltro: function(data){
              let html = "";                   
              data.forEach( function(element, index) {
                html += `<option value="${element}">${element}</option>`;
             });
               return html;             
            },
            slider: function(){
              let self = this;
              self.$rangoPrecio.on('ionRangeSlider', function(){
                
  
              })
            },
            render: function (data) {
                let html = '';
                console.log("la data de render es: " + data.datos)               
                data.forEach(function(key, idx)
                {
                    html += `<div class="card horizontal">
                            <div class="card-image">
                                <img src="http://localhost:3000/img/home.jpg">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                    <div> <p><strong>Direccion: </strong>${ key.Direccion }</p> </div>
                                    <div> <p><strong>Ciudad: </strong>${ key.Ciudad }</p> </div>
                                    <div> <p><strong>Telefono: </strong>${ key.Telefono }</p> </div>
                                    <div> <p><strong>Código postal: </strong>${ key.Codigo_Postal }</p> </div>
                                    <div> <p><strong>Precio: </strong>${ key.Precio }</p> </div>
                                    <div> <p><strong>Tipo: </strong>${ key.Tipo }</p> </div>
                                </div>
                            </div>
                        </div>`;
                });
                return html;
            }, // 
            miAjax: function(url, type, dataType){
                return $.ajax({
                  url:url,
                  type: type,
                  dataType: dataType
                })
          }
        }
    })()//fin de function  
      app.init()
  })(document, window, undefined, jQuery)

  setSearch()

 



