import './App.css';

import Boton from './Components/Botones';
import './StyleSheets/Botones.css';

import Pantalla from './Components/Pantalla';
import './StyleSheets/Pantalla.css';

import Historial from './Components/Historial';
import './StyleSheets/Historial.css';

import { useState } from "react";
import { evaluate } from "mathjs";

function App() {
  // Hooks
  const [valorPantalla, setValorPantalla] = useState('');
  const [historial, setHistorial] = useState([]);
  const [numeroOperacion, setNumeroOperacion] = useState(1);
  const [ultimoResultado, setUltimoResultado] = useState([])

  // RegExp: validaciones
  const operadores = /[+\-%^*/]/;
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
      if (valor === "xⁿ") {
        if (!terminaEnOperador || !valorPantalla.endsWith("^")) {
          setValorPantalla(valorPantalla + "^");
        }
      } else if (terminaEnOperador && valorIngresadoOperador) {
        setValorPantalla(valorPantalla.slice(0, -1) + valor);
      } else {
        setValorPantalla(valorPantalla + valor);
      }
    }
  };

  // Convierte simbolos especiales a operadores legibles por 'Math.js'
  const expresionConvertida = () => {
    let valorConvertido = valorPantalla;
    valorConvertido = valorConvertido.replace(/x/g, '*');
    valorConvertido = valorConvertido.replace(/÷/g, '/');
    return valorConvertido;
  };

  // Evaluar resultados
  const calcularResultado = () => {
    // Si la pantalla no esta vacia, o hay una expresion dentro de parentesis, y es una expresion valida o con caracteres especiales
    if ((valorPantalla || expresionDentroParentesis && expresionValida && !contieneParentesisVacios))
      if (!terminaEnOperador && !terminaEnPunto) {
        try {
          // Evaluo la expresion y lo convierto a String
          const resultado = evaluate(expresionConvertida());
          const resultadoString = resultado.toString();

          // Muestro el resultado de la expresion
          setUltimoResultado(resultadoString);
          setValorPantalla(resultadoString);

          // Historial
          // Suma 1 a N°
          const nOperacion = () => {
            setNumeroOperacion(() => numeroOperacion + 1)
            return numeroOperacion
          };

          // Pasa argumentos al objeto 'nuevoRegistro' 
          guardarEnHistorial(nOperacion(), valorPantalla, resultadoString);
        } catch {
          setValorPantalla('Error');
          alert("Expresión no válida");
        }
      }
      else {
        setValorPantalla('Error')
      }
    else {
      alert("Ingrese una expresión")
    }
  };

  // Teclas especiales 'Backspace' y 'r'
  const borrarUnValor = () => {
    setValorPantalla(() => valorPantalla.slice(0, -1))
  }

  // Ultimo Resultado
  const recuperarUltimoResultado = () => {
    setValorPantalla(valorPantalla + ultimoResultado)
  };

  // Almacena una lista de objetos como registros en Historial
  const guardarEnHistorial = (numeroOperacion, expresion, resultado) => {
    const nuevoRegistro = {
      numeroOperacion,
      expresion,
      resultado
    }
    // Recorre el array 'historial' y añade un nuevo registro al final
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
        case '+':
        case '-':
        case '.':
        case '%':
        case '^':
          mostrar(tecla)
          break;
        case '*':
          mostrar(tecla.replace(/\*/g, 'x'));
          break;
        case '/':
          mostrar(tecla.replace(/\//g, '÷'));
          break;
        case 'Enter':
          calcularResultado()
          break;
        case 'Backspace':
          borrarUnValor()
          break;
        case 'r':
        case 'R':
          recuperarUltimoResultado()
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
          numeroOperacion={numeroOperacion}
          setNumeroOperacion={setNumeroOperacion}
          setValorPantalla={setValorPantalla}
        />
      </div>

      <div className='calculadora'>
        <Pantalla input={valorPantalla} manejarEnvio={calcularResultado} />
        <div className='filas'>
          <Boton accionClick={mostrar}>7</Boton>
          <Boton accionClick={mostrar}>8</Boton>
          <Boton accionClick={mostrar}>9</Boton>
          <Boton accionClick={borrarUnValor}>DEL</Boton>
          <Boton accionClick={() => setValorPantalla('')}>AC</Boton>
        </div>
        <div className='filas'>
          <Boton accionClick={mostrar}>4</Boton>
          <Boton accionClick={mostrar}>5</Boton>
          <Boton accionClick={mostrar}>6</Boton>
          <Boton accionClick={mostrar}>x</Boton>
          <Boton accionClick={mostrar}>÷</Boton>
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
          <Boton accionClick={mostrar}>xⁿ</Boton>
          <Boton accionClick={recuperarUltimoResultado}>ANS</Boton>
          <Boton accionClick={calcularResultado}>=</Boton>
        </div>
      </div>
    </div>
  )
};

export default App;

// Comprobar info teclas:
// onkeydown = eventKey => console.log(eventKey)