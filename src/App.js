import './App.css';
import Boton from './Components/Botones';
import './StyleSheets/Botones.css';
import Pantalla from './Components/Pantalla';
import './StyleSheets/Pantalla.css';
import { useState } from "react";
import { evaluate } from "mathjs";

// Dentro de la función, se verifica si 'tecla' está dentro del rango numérico de los caracteres en el teclado. El rango de los caracteres numéricos va desde 48 (correspondiente al 0) hasta 57 (correspondiente al 9). La condición 'tecla >= 48 && tecla <= 57' verifica si la tecla presionada corresponde a un número válido.


function App() {

  const [valorPantalla, setValorPantalla] = useState('')

  const mostrar = valor => {
    setValorPantalla(valorPantalla + valor)
  };

  const calcularResultado = () => {   // Solucion problema undefined presionando '='
    if (valorPantalla) {
      setValorPantalla(evaluate(valorPantalla))
    } else {
      alert("Por favor ingrese valores validos")
    }
  };

  onkeydown = eventKey => {
    const key = Number(eventKey.key)
    if (key >= 0 && key <= 9) {
      setValorPantalla(valorPantalla + eventKey.key)
    } else alert("Anda igual")
  }

  return (
    <div className="App">
      <div className='calculadora'>
        <Pantalla input={valorPantalla} funcionTecla={onkeydown} />
        <div className='filas'>
          <Boton accionClick={mostrar}>7</Boton>
          <Boton accionClick={mostrar}>8</Boton>
          <Boton accionClick={mostrar}>9</Boton>
          <Boton accionClick={mostrar}>DEL</Boton>
          <Boton accionClick={() => setValorPantalla('')}>AC</Boton>
        </div>
        <div className='filas'>
          <Boton accionClick={mostrar}>4</Boton>
          <Boton accionClick={mostrar}>5</Boton>
          <Boton accionClick={mostrar}>6</Boton>
          <Boton accionClick={mostrar}>*</Boton>
          <Boton accionClick={mostrar}>/</Boton>
        </div>
        <div className='filas'>
          <Boton accionClick={mostrar}>1</Boton>
          <Boton accionClick={mostrar}>2</Boton>
          <Boton accionClick={mostrar}>3</Boton>
          <Boton accionClick={mostrar}>+</Boton>
          <Boton accionClick={mostrar}>-</Boton>
        </div>
        <div className='filas'>
          <Boton accionClick={mostrar}>.</Boton>
          <Boton accionClick={mostrar}>0</Boton>
          <Boton accionClick={mostrar}>^</Boton>
          <Boton accionClick={mostrar}>ANS</Boton>
          <Boton accionClick={calcularResultado}>=</Boton>
        </div>
      </div>
    </div>
  );
}

export default App;
