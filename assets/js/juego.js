/**2C = 2 de tréboles
 * 2D = 2 de diamantes
 * 2H = 2 de corazones
 * 2S = 2 de espadas
 */

/**tenemos que alcanzar 21 puntos */

let deck = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML
//Si voy a usar el elemento más de una vez, lo meto en una variable para reducir el número de 
//llamadas a querySelector
const btnPedir = document.querySelector('#btnPedir'); 
const smalls = document.querySelectorAll('small');

//Crea una baraja
const crearDeck = () => {
    for(let i = 2; i<=10; i++) {
        for( let tipo of tipos ) {
            deck.push( i + tipo);
        }
    }
    for(let tipo of tipos) {
        for(let especial of especiales) {
            deck.push(especial+tipo);
        }
    }


    //Vamos a utilizar una librería para barajar las cartas. Ofrece muchas funciones de 
    //JS que debería tener por defecto pero algunas no...  como el shuffle... que recibe un array 
    //y lo devuelve de forma aleatoria.
    deck = _.shuffle(deck);
    return deck;
}


crearDeck();

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}

const valorCarta = ( carta ) => {
    //Extraer el número que será el valor de la carta en el caso de las numéricas
    const valor = carta.substring(0, carta.length-1);

    // let puntos = 0;
    // if( isNaN(valor) ) {
    //     puntos = ( valor === 'A' ) ? 11 : 10;
    // } else {
    //     puntos = valor*1; //Esto lo convierte en numérico
    // }
    // return puntos;
    
    //Esto es equivalente a lo de arriba
    return isNaN(valor) ? 
        ((valor === 'A') ? 11: 10): valor*1; 
    
}


//Eventos
//Cuando mandamos una función como argumento, estamos haciendo un callback
//Cuando escuche un click se disparará la función indicada
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    smalls[0].innerText = puntosJugador;
    
});