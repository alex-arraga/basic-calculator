import React from 'react';
import Boton from './Botones';
import Pantalla from './Pantalla';
import Historial from './Historial'

import '../StyleSheets/Calculadora.css';

import { useState } from 'react';
import { evaluate } from 'mathjs';
import { FiDelete } from 'react-icons/fi';
import imagenRaiz from '../Images/raiz-cuadrada.svg';
import imgConversionNumero from '../Images/suma-resta.svg';
import imgPotencia from '../Images/potencia.svg';
import imgPi from '../Images/pi.svg';

function Calculadora() {
    // Hooks
    const [valorPantalla, setValorPantalla] = useState('');
    const [historial, setHistorial] = useState([]);
    const [numeroOperacion, setNumeroOperacion] = useState(1);
    const [ultimoResultado, setUltimoResultado] = useState([])

    // RegExp: validacioness
    const operadores = /[+\-%^*/]|[x÷√!]/;
    const parentesisVacios = /\(\)|[\(\)]/;
    const expresionValida = /^[0-9+\-*/^()%x÷√!lnlog.]+$/.test(valorPantalla);
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
            } else {
                setValorPantalla(valorPantalla + valor);
            }
        }
    };

    // Convierte simbolos especiales a operadores legibles por 'Math.js'
    const expresionConvertida = () => {
        if (valorPantalla || expresionDentroParentesis.test(valorPantalla)) {
            let valorConvertido = valorPantalla;

            // ExpReg
            const expRaiz = /√\(([^)]+)\)/g;
            const expLog = /log\((-?\d+(\.\d+)?)\)/g;
            const expLn = /ln\((-?\d+(\.\d+)?)\)/g;;

            // Valores fijos
            valorConvertido = valorConvertido.replace(/x/g, '*');
            valorConvertido = valorConvertido.replace(/÷/g, '/');
            valorConvertido = valorConvertido.replace(/π/g, Math.PI);
            valorConvertido = valorConvertido.replace(/e/g, Math.E);

            // Operaciones dinamicas
            valorConvertido = valorConvertido.replace(expRaiz, (_, valor) => {
                const resultadoRaiz = Math.sqrt(evaluate(valor));
                return resultadoRaiz;
            });
            valorConvertido = valorConvertido.replace(expLog, (_, valor) => {
                const resultadoLog = Math.log10(evaluate(valor));
                return resultadoLog
            });
            valorConvertido = valorConvertido.replace(expLn, (_, valor) => {
                const resultadoLn = Math.log(evaluate(valor));
                return resultadoLn
            });

            return valorConvertido;
        }
    };

    // Evaluar resultados
    const calcularResultado = () => {
        if ((valorPantalla || expresionDentroParentesis && expresionValida && !contieneParentesisVacios))
            if (!terminaEnOperador && !terminaEnPunto) {
                try {
                    // Evaluo la expresion y lo convierto a String
                    const resultado = evaluate(expresionConvertida());
                    const resultadoString = resultado.toString();

                    // Muestro el resultado de la expresion
                    setValorPantalla(resultadoString);

                    // Almacena el ultimo resultado (ANS)
                    setUltimoResultado(resultadoString);

                    // Historial: Suma 1 a N°
                    const nOperacion = () => {
                        setNumeroOperacion(() => numeroOperacion + 1)
                        return numeroOperacion
                    };

                    // Pasa argumentos al objeto 'nuevoRegistro' 
                    guardarEnHistorial(nOperacion(), valorPantalla, resultadoString);

                } catch {
                    setValorPantalla('Error');
                    alert('Expresión no válida');
                }
            }
            else {
                setValorPantalla('Error')
            }
        else {
            alert('Ingrese una expresión')
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

    // Convierte numeros Positivos a Negativos (viceversa)
    const convertirTipoNumero = () => {
        const primerCaracter = valorPantalla.slice(0, 1);
        const haySimboloMenos = /-/.test(primerCaracter);

        if (valorPantalla && !haySimboloMenos && !terminaEnOperador && !terminaEnPunto) {
            setValorPantalla('-' + valorPantalla)
        } else if (haySimboloMenos) {
            setValorPantalla(valorPantalla.replace('-', ''))
        } else if (terminaEnOperador || terminaEnPunto) {
            return
        } else { setValorPantalla(valorPantalla) }
    }

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
    return (

        // Componente Calculadora
        <div className='calculadora'>
            <Pantalla input={valorPantalla} manejarEnvio={calcularResultado} />
            <div className='filas'>
                <Boton accionClick={() => mostrar('ln(')}>ln</Boton>
                <Boton accionClick={() => mostrar('log(')}>log</Boton>
                <Boton accionClick={borrarUnValor}>
                    <FiDelete></FiDelete>
                </Boton>
                <Boton accionClick={() => setValorPantalla('')}>AC</Boton>
            </div>
            <div className='filas'>
                <Boton accionClick={() => mostrar('π')}>
                    <img className='img-pi' src={imgPi} alt="Simbolo PI" />
                </Boton>
                <Boton accionClick={mostrar}>e</Boton>
                <Boton accionClick={() => mostrar('√(')}>
                    <img className='img-raiz' src={imagenRaiz} alt='Raiz cuadrada' />
                </Boton>
                <Boton accionClick={() => mostrar('^')}>
                    <img className='img-potencia' src={imgPotencia} alt="Simbolo potencia" />
                </Boton>
            </div>
            <div className='filas'>
                <Boton accionClick={mostrar}>(</Boton>
                <Boton accionClick={mostrar}>)</Boton>
                <Boton accionClick={mostrar}>%</Boton>
                <Boton accionClick={mostrar}>÷</Boton>
            </div>
            <div className='filas'>
                <Boton accionClick={mostrar}>7</Boton>
                <Boton accionClick={mostrar}>8</Boton>
                <Boton accionClick={mostrar}>9</Boton>
                <Boton accionClick={mostrar}>x</Boton>
            </div>
            <div className='filas'>
                <Boton accionClick={mostrar}>4</Boton>
                <Boton accionClick={mostrar}>5</Boton>
                <Boton accionClick={mostrar}>6</Boton>
                <Boton accionClick={mostrar}>-</Boton>
            </div>
            <div className='filas'>
                <Boton accionClick={mostrar}>1</Boton>
                <Boton accionClick={mostrar}>2</Boton>
                <Boton accionClick={mostrar}>3</Boton>
                <Boton accionClick={mostrar}>+</Boton>
            </div>
            <div className='filas'>
                <Boton accionClick={convertirTipoNumero}>
                    <img className="img-conversion-num" src={imgConversionNumero} alt="positivo-negativo" />
                </Boton>
                <Boton accionClick={mostrar}>0</Boton>
                <Boton accionClick={mostrar}>,</Boton>
                <Boton accionClick={calcularResultado}>=</Boton>
            </div>

            {/* Componente Historial */}
            <div className='historial'>
                <Historial
                    historial={historial}
                    setHistorial={setHistorial}
                    numeroOperacion={numeroOperacion}
                    setNumeroOperacion={setNumeroOperacion}
                    setValorPantalla={setValorPantalla}
                />
            </div>
        </div>
    )
}

export default Calculadora

// Comprobar info teclas:
// onkeydown = eventKey => console.log(eventKey)

// expresionValidaExtendida = /^[0-9+\-*^%/x÷√!]*(\blog\b|log\()?[0-9+\-*^%/x÷√!]*$/.test(valorPantalla);