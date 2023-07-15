import React from "react";

const Pantalla = ({ input }) => {

    const manejarEnvio = e => {
        // Evita que se vuelva a enviar el formulario en caso de un error
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