import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Historial({ nOperacion, expresion, resultadoExpresion, id, eliminar, recuperar }) {
    const fecha = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="contenedor-historial">
            <div className="registro-historial">
                <h2 className="registro-titulo">Registro de operaciones</h2>
                <div className="registro-estructura" onClick={() => recuperar}>
                    <div className="registro-opciones-contenedor">
                        <AiOutlineCloseCircle className="registro-opciones-eliminar" onClick={() => eliminar(id)} />
                    </div>
                    <p className="registro-fecha">{fecha}</p>
                    <h4 className="registro-numero">N° {nOperacion}</h4>
                    <p className="registro-expresion"><span>Exp:</span> {expresion} </p>
                    <p className="registro-resultado"><span>Res:</span> {resultadoExpresion}</p>
                </div>
                <hr className="registro-linea-divisora" />
                <div className="registro-estructura">
                    <div className="registro-opciones-contenedor">
                        <AiOutlineCloseCircle className="registro-opciones-eliminar" onClick={() => eliminar(id)} />
                    </div>
                    <p className="registro-fecha">{fecha}</p>
                    <h4 className="registro-numero">N° {nOperacion}</h4>
                    <p className="registro-expresion"><span>Exp:</span> {expresion} </p>
                    <p className="registro-resultado"><span>Res:</span> {resultadoExpresion}</p>
                </div>
                <hr className="registro-linea-divisora" />
            </div>
        </div>
    )
}

export default Historial;