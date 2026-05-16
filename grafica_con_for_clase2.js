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

let svg = null;
const width_espacio = 1200;
const height_espacio = 600;

//estas son las variables de los rectangulos del fondo.
const width = 200;
const height = 500;

const arreglo = [
    {w: width, h: height, fill: "#f6a418", stroke: "#915414"},
];

//En D3, para poner texto necesitas definir la posición x y y (donde empieza la letra) y usar .text() para escribir el contenido
function setup(){
    svg = d3
        .select("#contenedor")
        .append("svg")
        .attr("width", width_espacio)
        .attr("height", height_espacio)
        .style("background", "#f9f9f9");
    
    //definicion automatica para la estatura (lo de y)
    const escalaY = d3.scaleLinear()
        .domain([0, 2])     //los datos van de 0 a 2
        .range([height_espacio, 0]);   //en svg esta invertida entonces tenemos que definir que empiece en 0
    
    const anchoBarra = (width_espacio - 100) / datos.length; //dejo espacio a la derecha para poner los atributos

    //recorrer el arreglo "datos" desde el 0 al final
    for(let i = 0; i < datos.length; i++){
        const d = datos[i];
        const color = arreglo[0]; //para sacar el color

        //aqui llamo a la funcion para dibujar, pasando el dato y su posición
        dibujarRectangulo(d, i, anchoBarra, escalaY, color);
    }

}

function dibujarRectangulo(dato, i, ancho, escalaY, colorObj){
    //aqui se dibujan las barras
    svg
        .append("rect")
        .attr("x", i * ancho + 5) // Posición X con un pequeño margen
        .attr("y", escalaY(dato.estatura)) // La escala nos da la posición vertical
        .attr("width", ancho - 10) // Ancho de la barra menos margen
        .attr("height", height_espacio - escalaY(dato.estatura) -40 ) // Altura calculada. cambiar el -20 para la altura de la base de las barras
        .attr("fill", colorObj.fill) //lo uso como el objeto de colores
        .attr("stroke", colorObj.stroke)
        .attr("stroke-width", "2");

    //Aqui va el texto de la estatura (arriba de la barra)
    svg
        .append("text")
        .attr("x", i * ancho + (ancho / 2)) // Centrado en la barra)
        .attr("y", escalaY(dato.estatura) -5 ) //5 pixeles arriba de la barra
        .attr("text-anchor", "middle") // Centra el texto horizontalmente
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .text(dato.estatura);

    //aqui va el texto de la edad, en la parte de abajo
    svg
        .append("text")
        .attr("x", i * ancho + (ancho / 2)) //centrado a la barra
        .attr("y", height_espacio - 10) // 10 pixeles arriba del borde de abajo
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .text(dato.edad);

    svg
        .append("text")
        .attr("x", width_espacio-80) //hasta la derecha
        .attr("y", height_espacio - 10)
        .style("font-family", "sans-serif")
        .text("EDAD");

    svg
        .append("text")
        .attr("x", width_espacio-80)
        .attr("y", height_espacio - height)
        .style("font-family", "sans-serif")
        .text("ALTURA");
}

setup();
