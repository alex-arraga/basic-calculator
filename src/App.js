import './App.css';
import Boton from './Components/Botones';
import './StyleSheets/Botones.css';
import Pantalla from './Components/Pantalla';
import './StyleSheets/Pantalla.css';
import { useState } from "react";
import { evaluate } from "mathjs";


function App() {
  // Hook
  const [valorPantalla, setValorPantalla] = useState('')

  // Constantes
  const ultimoCaracter = valorPantalla.slice(-1);
  const operadores = /[+\-*^%/]/;
  const terminaEnOperador = operadores.test(ultimoCaracter);

  const mostrar = valor => {
    const valorIngresadoOperador = operadores.test(valor);

    if (typeof valorPantalla === "string") {

      // El ultimo caracter es Operador y se quiere ingresar otro Operador
      if (terminaEnOperador && valorIngresadoOperador) {
        setValorPantalla(valorPantalla.slice(0, -1) + valor);
      }

      // Si el ultimo valor no es un operador, es un numero y este se agrega este valor al final
      else {
        setValorPantalla(valorPantalla + valor);
      }
    }
  }


  const calcularResultado = () => {

    // Si el input no es un string vacio
    if (valorPantalla) {
      // Array vacio donde se almacenaran operaciones y resultados en Objetos, c/u tendrá un id
      const arr = []
      const nId = 0;

      // Si no termina en operador
      if (!terminaEnOperador) {
        
          // Calcula la operacion en pantalla
          const resultado = evaluate(valorPantalla);
          const resultadoString = resultado.toString()

          // Muestra el resultado de la operacion convertido a String para no tener problemas con slice()
          setValorPantalla(resultadoString);

          // Defino el objeto donde se almacenan las operaciones con sus resultados
          let objetoResultado = {
            "id": nId,
            "operacion": valorPantalla,
            "resultado": resultadoString
          }

          // Almaceno el objeto de cada operacion en el array
          arr.push(objetoResultado)

          // Muestro los Objetos en consola
          console.log(objetoResultado);
        } 

        // Si termina en operador
      else {
        setValorPantalla(`Error`)     
      }

      // Si la pantalla es un string vacio
    } else {
      alert("Ingrese una expresion")  
    }
  }

  // Validaciones a realizar: Si empieza con . o ()
  // !parentesis.test(valorPantalla)


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