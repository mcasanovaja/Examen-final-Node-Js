'use strict'
//deve de tener estas funciones
//1*El buscador debe mostrar todos los registros disponibles en los datos generales al hacer click en el botón “Mostrar todos”.
//2*Los menús desplegables a la izquierda de la página que indican la ciudad y el tipo de vivienda deben cargarse con todas las ciudades y tipos presentes en los datos generales sin repetirse.
//3*Todas las búsquedas deben ser filtradas por un rango de precios, es decir, se deben mostrar todos los registros cuyo precio se encuentre entre los dos valores del rango especificado en el buscador.
//4*Si se selecciona un elemento del menú desplegable Ciudad, se deben seleccionar únicamente los registros que hagan parte de la ciudad seleccionada y cuyo precio esté dentro del rango indicado.
//5*Si se selecciona un elemento del menú desplegable Tipo, se deben seleccionar únicamente los registros que hagan parte del tipo seleccionado y cuyo precio esté dentro del rango indicado.
//6*Si se seleccionan elementos tanto del menú desplegable Ciudad como del menú desplegable Tipo, se deben filtrar los resultados por la ciudad, tipo y precios ingresados.
const express = require('express');
const datos = require('../controllers/cargarDatos');
const api = express.Router();

//primero necesitamos que cargen las opciones de los filtros con la informacion de la data
api.get('/cargarFiltros',datos.getFiltros);
//necesitamos una funcion para cargar toda la data
api.get('/cargarTodo', datos.getTodo);
//esta funcion es para cargar la data personalizada
api.get('/ciudad/:ciudadId/tipo/:tipoId/desde/:desdeVal/hasta/:hastaVal',datos.getPersonaliza);
api.use(express.static('public'));       
      


module.exports = api;