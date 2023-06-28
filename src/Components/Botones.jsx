import React from "react";

// 'Props.children', se usa cuando queremos que el valor del componente se tome como 'Prop', pero en este caso para poder usar 'props.children' debemos escribir el Componente de otra forma. Ya no es valido usar '<Boton />' sino que ahora lo usaremos con etiqueta de apertura y de cierre '<Boton><Boton/>

// AC: Cuando nosotros en onClick queremos decirle que 'props.accion' va a ejecutarse tomando como parametro 'props.children', ese 'props.accion' sera una función, por lo tanto retorna un valor... En estos casos es necesario pasar una función flecha dentro de onClick ya que la función de onClick llamara a otra función que sera 'props.accion', es decir, 'accion' es un callback

// Si escribimos 'onClick={props.accion(props.children)}>' estamos haciendo una llamada a una función... En cambio con 'onClick={() => props.accion(props.children)}>' estamos definiendo una función que se va a ejecutar cuando se de un click.

function Boton(props) {
    const esOperador = (valor) => {
        return isNaN(valor);
    }

    return (
        <div className={`contenedor-simbolo ${esOperador(props.children) ? 'operador' : 'numeros'}`}
            onClick={() => props.accion(props.children)}
            tabIndex="0">
            {props.children}
        </div>
    )
}

export default Boton