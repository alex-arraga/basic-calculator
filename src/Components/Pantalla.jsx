import React from "react";

const Pantalla = ({ input, funcionTecla }) => {
    return (
        <input className="pantalla"
            placeholder="0"
            type="text"
            onKeyDown={funcionTecla}
            readOnly
            value={input}>
        </input>
    )
}

export default Pantalla