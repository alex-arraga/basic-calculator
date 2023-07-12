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
  const operadores = /[+\-*^%/]/;
  const parentesisVacios = /\(\)|[\(\)]/;
  const expresionValida = /^[0-9+\-*^%/]+$/.test(valorPantalla);
  const punto = /[.]/;

  const ultimoCaracter = valorPantalla.slice(-1);
  const expresionDentroParentesis = parentesisVacios.test(valorPantalla.slice(1, -1));
  const contieneParentesisVacios = parentesisVacios.test(valorPantalla);
  const terminaEnOperador = operadores.test(ultimoCaracter);
  const terminaEnPunto = punto.test(ultimoCaracter);

  const mostrar = valor => {
    const valorIngresadoOperador = operadores.test(valor);

    if (typeof valorPantalla === "string") {

      // Si el ultimo caracter es Operador y se quiere ingresar otro Operador
      if (terminaEnOperador && valorIngresadoOperador) {

        // Se eliminar el ultimo caracter (operador) y se lo reemplaza por el nuevo
        setValorPantalla(valorPantalla.slice(0, -1) + valor);
      }

      // Si el ultimo valor no es un operador, este se agrega este valor al final
      else {
        setValorPantalla(valorPantalla + valor);
      }
    }
  };


  const calcularResultado = () => {

    // Array vacio donde se almacenaran operaciones y resultados en Objetos, c/u tendrá un id
    const arr = [];
    const nId = 0;

    // Validaciones: 
    // 1- Si el input contiene caracteres (o si NO es un string vacio). ej: evita error '' -> calcular
    // 2- O Si la expresion es una expresion entre parentesis. ej: Evita error '2*(3+5)' -> calcular
    // 3- Si la expresion es valida. ej: Evita error '(9) -> calcular'
    // 4- Y si ademas no hay parentesis vacios. ej: Evita error '( o ()' -> calcular

    if (valorPantalla || expresionDentroParentesis && expresionValida && !contieneParentesisVacios) {

      // 5- Si no termina en operador. ej: Evita error '2-3+' o '3*' -> calcular
      // 6- Y si no termina en punto. ej: Evita error '.' -> calcular

      if (!terminaEnOperador && !terminaEnPunto) {

        // ¿Para qué uso try/catch? Try ejecutará una operación valida. Y si no lo es, por ej: '()()()+2', catch manejará este error o esta operacion matematica invalida y mostrará en pantalla 'Error'

        try {
          // Calcula la operacion en pantalla
          const resultado = evaluate(valorPantalla);
          const resultadoString = resultado.toString();

          // Muestra el resultado convertido a String. Evita error con slice(), ya que Math.js devuelve el resultado convertido a 'Number' y slice() solo analiza strings
          setValorPantalla(resultadoString);

          // Defino el objeto donde se almacenan las operaciones y sus resultados
          let objetoOperaciones = {
            "id": nId,
            "operacion": valorPantalla,
            "resultado": resultadoString
          };

          // Almaceno el objeto de cada operacion en el array
          arr.push(objetoOperaciones)

          // Muestro los Objetos en consola
          console.log(objetoOperaciones);
        } catch {
          setValorPantalla('Error');
          alert("Expresión no válida");
        }
      }

      // Si la expresion termina en operador. ej: '2+'
      else {
        setValorPantalla('Error')
      }

      // Si la pantalla es un string vacio y se calcula
    } else {
      alert("Ingrese una expresión")
    }
  };

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
  )
};

export default App;

// Comprobar info teclas:
// onkeydown = eventKey => console.log(eventKey)