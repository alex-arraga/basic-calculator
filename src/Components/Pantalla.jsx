import React from "react";

const Pantalla = ({ input }) => {
    return (
        <input className="pantalla"
            placeholder="0"
            type="text"
            readOnly
            value={input}>
        </input>
    )
}

export default Pantalla