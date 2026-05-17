const datos = [
    { edad: 21, estatura: 1.52 }, { edad: 19, estatura: 1.55 },
    { edad: 24, estatura: 1.79 }, { edad: 20, estatura: 1.59 },
    { edad: 21, estatura: 1.56 }, { edad: 22, estatura: 1.60 },
    { edad: 20, estatura: 1.68 }, { edad: 19, estatura: 1.55 },
    { edad: 20, estatura: 1.72 }, { edad: 22, estatura: 1.78 },
    { edad: 19, estatura: 1.75 }, { edad: 21, estatura: 1.77 },
    { edad: 28, estatura: 1.76 }, { edad: 19, estatura: 1.79 },
    { edad: 22, estatura: 1.85 }
];

let svg=null;
const width_espacio = 1200;
const height_espacio = 600;

//configuracion de colores para las barras 
const color = { fill: rgb(13, 120, 227), stroke: rgb(20,40,60)}

function setup(){
    //para crear el lienzo
    svg = d3
        .select("#contenedor")
        .append("svg")
        .attr("width", width_espacio)
        .attr("height", height_espacio)
        .style("background", "#f9f9f9");

    //hago una linea base horizontal, pero le dejo un rango de 60 para los textos
    const lineaBase = height_espacio - 60

    //para la escala vertical uso d3-scale/linear que mapea metros reales a pixeles
    const escalaY = d3.scaleLinear()
        .domain([0, 2])
        .range([lineaBase, 30]) //para que a altura sea desde la base hsata 30 pixeles antes del tope
    
    //AQUI LA LOGICA PARA AGRUPAR POR EDADES. uso un ordenamiento de js
    datos.sort((a,b) => a.edad, b.edad); //entiendo que los ordena de forma ascendente 
    //https://d3js.org/d3-array/sort#sort

    //y ahora para ordenar esos datos por grupo de forma visual
    let xActual = 50; //posicion de la primera barra de la izquierda
    const anchoBarra = 35;
    const espacioEntreBarras = 4;
    const espacioEntreGrupos = 45;
    let edadAnterior = null; //variable para controlar cuando poner los espacios de edades distintas

    //ciclo
    for(let i=0; i<datos.length; i++){
        const d= datos[i];
        /*como se supone que ya esta ordenado, solo busco que cambie la edad para dar el salto*/
        if(edadAnterior !== null && d.edad !== edadAnterior){
            xActual += espacioEntreGrupos; //aqui se hace el salto de grupo
        }

        //eso dibuja una barra
        dibujarRectangulo(d, xActual, anchoBarra, escalaY, color);

        //ahora se avanza el espacio entre barras
        xActual += anchoBarra + espacioEntreBarras;

        //y guardo la edad actual para compararla en la siguiente vuelta
        edadAnterior = d.edad;
    }

    svg.append("text")
        .attr("x", width_espacio - 110)
        .attr("y", baseGrafica + 35)
        .style("font-family", "sans-serif")
        .style("font-weight", "bold")
        .text("EJE: EDAD");

    svg.append("text")
        .attr("x", width_espacio - 110)
        .attr("y", 40)
        .style("font-family", "sans-serif")
        .style("font-weight", "bold")
        .text("EJE: ALTURA");
}

function dibujarRectangulo(dato, x, ancho, escalaY, color, lineaBase){
    svg .append("rect")
        .attr("x", x)
        .attr("y", escalaY(dato.estatura)) //dice donde empieza el rectangulo de arriba a abajo
        .attr("width", ancho)
        .attr("height", lineaBase - escalaY(dato.estatura)) //queda: la base menos el tope superior para que se ajuste
        .attr("fill", color.fill)
        .attr("stroke", color.stroke)
        .attr("stroke-width", "2")

    //para el texto de la estatura arriba de cada barra individual
    svg .append("text")
        .attr("x", x + (ancho/2)) //que sea la mitad de cada barra
        .attr("y", escalaY(dato.estatura) -6) //se coloca 6 pixeles arriba de la barra
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "11px")
        .text(dato.estatura);
}

setup();