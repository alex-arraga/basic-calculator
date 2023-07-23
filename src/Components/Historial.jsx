import React from 'react';
import '../StyleSheets/Historial.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

function Historial({ historial, setHistorial, numeroOperacion, setNumeroOperacion, setValorPantalla }) {
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fecha = new Date().toLocaleDateString()

    const reiniciarRegistro = () => {
        setHistorial([]);
        setNumeroOperacion(() => numeroOperacion = 1);
    };

    // Buscar como funciona exactamente esta funcion
    const eliminarRegistro = id => {
        const actualizarRegistro = historial.filter(registro => registro.id !== id);
        setHistorial(actualizarRegistro);
    };

    const recuperarResultado = res => {
        setValorPantalla(() => res)
    };

    const recuperarExpresion = exp => {
        setValorPantalla(() => exp)
    };

    // Crea cada registro
    historial.map(registro => (
        <div key={registro.id = uuidv4()}>
            <p>{registro.numeroOperacion}</p>
            <p>{registro.expresion}</p>
            <p>{registro.resultado.replace('.', ',')}</p>
        </div>
    ))

    return (
        <div className='contenedor-historial'>
            <div className='registro-historial'>
                <div className='registro-titulo-contenedor'>
                    <h2 className='registro-titulo'>Registro de operaciones</h2>
                </div>
                <button className='registro-reiniciar' onClick={() => reiniciarRegistro()}>Borrar Historial</button>

                {historial.map((registro) => (
                    <div className='registro-estructura' key={registro.id} >
                        <div className='registro-opciones-contenedor'>
                            <p className='registro-fecha'>{fecha}</p>
                            <AiOutlineCloseCircle className='registro-opciones-eliminar' onClick={() => eliminarRegistro(registro.id)} />
                        </div>
                        <hr className='registro-divisor' />
                        <p className='registro-hora'>{hora}</p>
                        <h4 className='registro-numero'>N° {registro.numeroOperacion}</h4>
                        <p className='registro-expresion' onClick={() => recuperarExpresion(registro.expresion)}><span>Exp:</span> {registro.expresion} </p>
                        <p className='registro-resultado' onClick={() => recuperarResultado(registro.resultado)}><span>Res:</span> {registro.resultado}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Historial;