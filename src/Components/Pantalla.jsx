import React from "react";
import { v4 as uuidv4 } from "uuid";

const Pantalla = ({ input, resultado }) => {

    const manejarEnvio = e => {
        // Evita que se vuelva a enviar el formulario en caso de un error
        e.preventDefault();
        const nuevoRegistro = {
            id: uuidv4(),
            expresion: input,
            resultado: resultado
        }
    };

    return (
        <form className="formulario-pantalla" onSubmit={manejarEnvio}>
            <input className="pantalla"
                placeholder="0"
                type="text"
                readOnly
                value={input}>
            </input>
        </form>
    )
}

export default Pantalla;