import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function Historial({ historial, setHistorial }) {
    const fecha = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Buscar como funciona exactamente esta funcion
    const eliminarRegistro = id => {
        const actualizarRegistro = historial.filter(registro => registro.id !== id)
        setHistorial(actualizarRegistro);
    };

    // Recorre y define cada registro
    historial.map(registro => (
        <div key={registro.id = uuidv4()}>
            <p>{registro.numeroOperacion}</p>
            <p>{registro.expresion}</p>
            <p>{registro.resultado}</p>
        </div>
    ))

    return (
        <div className="contenedor-historial">
            <div className="registro-historial">
                <h2 className="registro-titulo">Registro de operaciones</h2>
                {historial.map((registro) => (
                    <div className="registro-estructura" key={registro.id}>
                        <div className="registro-opciones-contenedor">
                            <AiOutlineCloseCircle className="registro-opciones-eliminar" onClick={() => eliminarRegistro(registro.id)} />
                        </div>
                        <p className="registro-fecha">{fecha}</p>
                        <h4 className="registro-numero">N° {registro.numeroOperacion}</h4>
                        <p className="registro-expresion"><span>Exp:</span> {registro.expresion} </p>
                        <p className="registro-resultado"><span>Res:</span> {registro.resultado}</p>
                    </div>
                ))}
                <hr className="registro-linea-divisora" />
            </div>
        </div>
    )
}

export default Historial;