import React from "react";
import '../StyleSheets/Pantalla.css';

const Pantalla = ({ input }) => {
    // Evita que se vuelva a enviar el formulario en caso de un error
    const manejarEnvio = e => {
        e.preventDefault();
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