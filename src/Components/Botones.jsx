import React from 'react';
import '../StyleSheets/Botones.css'

function Boton(props) {
    const esOperador = (valor) => {
        return isNaN(valor);
    }

    return (
        <div className={`contenedor-simbolo ${esOperador(props.children) ? 'operador' : 'numeros'}`}
            tabIndex={0}
            onClick={() => props.accionClick(props.children)} >
            {props.children}
        </div>
    )
}

export default Boton;