import './App.css';

import Boton from './Components/Botones';
import './StyleSheets/Botones.css';

import Pantalla from './Components/Pantalla';
import './StyleSheets/Pantalla.css';

import Historial from './Components/Historial';
import './StyleSheets/Historial.css';

import { useState } from "react";
import { evaluate, sum } from "mathjs";
import { v4 as uuidv4 } from 'uuid';

function App() {
  // Hooks
  const [valorPantalla, setValorPantalla] = useState('');
  const [historial, setHistorial] = useState([]);

  // RegExp: validaciones
  const operadores = /[+\-*^%/]/;
  const parentesisVacios = /\(\)|[\(\)]/;
  const expresionValida = /^[0-9+\-*^%/]+$/.test(valorPantalla);
  const punto = /[.]/;

  // Validaciones
  const ultimoCaracter = valorPantalla.slice(-1);
  const expresionDentroParentesis = parentesisVacios.test(valorPantalla.slice(1, -1));
  const contieneParentesisVacios = parentesisVacios.test(valorPantalla);
  const terminaEnOperador = operadores.test(ultimoCaracter);
  const terminaEnPunto = punto.test(ultimoCaracter);

  // Mostrar en pantalla
  const mostrar = valor => {
    const valorIngresadoOperador = operadores.test(valor);
    if (typeof valorPantalla === "string") {
      if (terminaEnOperador && valorIngresadoOperador) {
        setValorPantalla(valorPantalla.slice(0, -1) + valor)
      }
      else {
        setValorPantalla(valorPantalla + valor);
      }
    }
  };

  // Evaluar resultados
  const calcularResultado = () => {
    if (valorPantalla || expresionDentroParentesis && expresionValida && !contieneParentesisVacios) {
      if (!terminaEnOperador && !terminaEnPunto) {
        try {
          const resultado = evaluate(valorPantalla);
          const resultadoString = resultado.toString();
          setValorPantalla(resultadoString);
          // Historial
          guardarEnHistorial(valorPantalla, resultadoString);
        } catch {
          setValorPantalla('Error');
          alert("Expresión no válida");
        }
      }
      else {
        setValorPantalla('Error')
      }
    } else {
      alert("Ingrese una expresión")
    }
  };

  const guardarEnHistorial = (expresion, resultado) => {
    const nuevoRegistro = {
      expresion,
      resultado
    }
    setHistorial([...historial, nuevoRegistro]);
  };

  // Keyboard
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
  };

  // Ejecuta la app
  return (
    <div className="App">

      <div className='historial'>
        <Historial
          historial={historial}
          setHistorial={setHistorial}
        />
      </div>

      <div className='calculadora'>
        <Pantalla input={valorPantalla} manejarEnvio={calcularResultado} />
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
  )
};

export default App;

// Comprobar info teclas:
// onkeydown = eventKey => console.log(eventKey)