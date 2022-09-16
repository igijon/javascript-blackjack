/**2C = 2 de tréboles
 * 2D = 2 de diamantes
 * 2H = 2 de corazones
 * 2S = 2 de espadas
 */

/**tenemos que alcanzar 21 puntos */

let deck = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];


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
pedirCarta();