import './App.css';
import Boton from './Components/Botones';
import './StyleSheets/Botones.css';
import Pantalla from './Components/Pantalla';
import './StyleSheets/Pantalla.css';
import { useState } from "react";
import { evaluate } from "mathjs";

// La funcion del '=' esta dicha en su Componente 'Boton'

// Puedo asignar el condicional 'valorPantalla' debido a que en programación hay elementos que por defecto son Falsy y otros Truthy... Una cadena de caracteres vacia por defecto es falsa, y si tiene caracteres dentro es verdadera... Esto soluciona el problema de si le damos igual antes de tocar un numero salga 'undefined'

function App() {

  const [valorPantalla, setValorPantalla] = useState('')

  const mostrar = valor => {
    setValorPantalla(valorPantalla + valor)
  }

  const teclado = tecla => {
    console.log(`Se presiono la tecla: ${tecla}`)
  }

  const calcularResultado = () => {
    if (valorPantalla) {
      setValorPantalla(evaluate(valorPantalla))
    } else {
      alert("Por favor ingrese valores validos")
    }
  }

  return (
    <div className="App">
      <div className='calculadora'>
        <Pantalla input={valorPantalla} />
        <div className='filas'>
          <Boton accion={mostrar} accionTeclado={teclado}>7</Boton>
          <Boton accion={mostrar} accionTeclado={teclado}>8</Boton>
          <Boton accion={mostrar}>9</Boton>
          <Boton accion={mostrar}>DEL</Boton>
          <Boton accion={() => setValorPantalla('')}>AC</Boton>
        </div>
        <div className='filas'>
          <Boton accion={mostrar}>4</Boton>
          <Boton accion={mostrar}>5</Boton>
          <Boton accion={mostrar}>6</Boton>
          <Boton accion={mostrar}>*</Boton>
          <Boton accion={mostrar}>/</Boton>
        </div>
        <div className='filas'>
          <Boton accion={mostrar}>1</Boton>
          <Boton accion={mostrar}>2</Boton>
          <Boton accion={mostrar}>3</Boton>
          <Boton accion={mostrar}>+</Boton>
          <Boton accion={mostrar}>-</Boton>
        </div>
        <div className='filas'>
          <Boton accion={mostrar}>.</Boton>
          <Boton accion={mostrar}>0</Boton>
          <Boton accion={mostrar}>^</Boton>
          <Boton accion={mostrar}>ANS</Boton>
          <Boton accion={calcularResultado}>=</Boton>
        </div>
      </div>
    </div>
  );
}

export default App;
