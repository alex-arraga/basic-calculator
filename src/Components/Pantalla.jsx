import React from "react";

// En esta ocasion vamos a ver otra manera de definir un Componente, que es usando una función flecha, en vez de una 'function'

const Pantalla = ({ input }) => {
    return (
        <div className="pantalla">
            {input}
        </div>
    )
}

export default Pantalla