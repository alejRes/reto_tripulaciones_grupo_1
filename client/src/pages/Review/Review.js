import React, { Component } from 'react';
import axios from 'axios'
import "./List.css"
import { useState, useEffect } from 'react';
function Reseñas () { 

  // Initialize the state
  const [produstsList, setProductList] = useState([]);
 

  useEffect(() => {
    getList()
  }, []); 


   const getList = async() => {    
    let datos = await axios.get('/api/productos')
    setProductList(datos.data)
  }

  const getReseña = async(event) => {    
    event.preventDefault();
    let product= event.target.elements.name.value 
    console.log(product)
     let datos = await axios.get(`/api/producto/${product}`)
     console.log(datos.data)
     setProductList(datos.data) 
  }
       
 
 console.log("hola")
    return (
      
      <div id="todo" className="App">

            <div onChange={this.onChangeValue}>
              <input type="radio" value="" name="Discapacidad" /> 
              <input type="radio" value="" name="Discapacidad" /> 
              <input type="radio" value="" name="Discapacidad" /> 
            </div>

            <form onSubmit={getReseña}>
            <input type="text" name="Reseña" />
            <input type="submit" />
            </form>
      </div>
    );
          }

export default List ;
