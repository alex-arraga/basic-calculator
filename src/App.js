import './App.css';
import Boton from './Components/Botones';
import './StyleSheets/Botones.css';
import Pantalla from './Components/Pantalla';
import './StyleSheets/Pantalla.css';
import { useState } from "react";
import { evaluate } from "mathjs";

// Slice(0, -1): Toma una cadena de caracteres y la corta. El primer parametro es 'start', el indice, en este caso decimos que tome todos los caracteres de la cadena, desde el indice 0, es decir, desde el principio. Y -1 quiere decir que vamos a reemplazar el ultimo valor de la cadena, en este caso lo reemplazamos por 'valor'

function App() {

  const [valorPantalla, setValorPantalla] = useState('')

  const mostrar = valor => {
    const ultimosDosCaracteres = valorPantalla.slice(-2);
    const operadores = /[+\-*^%/]/;

    if (operadores.test(ultimosDosCaracteres) && operadores.test(valor)) {
      setValorPantalla(valorPantalla.slice(0, -1) + valor);
    } else {
      setValorPantalla(valorPantalla + valor);
    }
  };



  const calcularResultado = () => {
    if (valorPantalla) {    // Si el input no es un string vacio
      setValorPantalla(evaluate(valorPantalla))
    } else {
      alert("Ingrese una expresion valida")
    }
  }



    onkeydown = eventKey => {
    const tecla = eventKey.key
    const validarNum = Number(eventKey.key) >= 0 && Number(eventKey.key) <= 9;
    if (validarNum) {
      setValorPantalla(valorPantalla + tecla)
    } else if (tecla) {
      switch (tecla) {
        case '(':
        case ')':
        case '/':
        case '*':
        case '+':
        case '-':
        case '.':
        case '%':
        case '^':
          mostrar(tecla)
          break;
        case 'Enter':
          calcularResultado()
          break;
        default:
          break;
      }
    }
  }

  
  return (
    <div className="App">
      <div className='calculadora'>
        <Pantalla input={valorPantalla} />
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

// Comprobar info teclas:
// onkeydown = eventKey => console.log(eventKey)