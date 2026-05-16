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
    
    
}