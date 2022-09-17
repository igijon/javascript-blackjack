//Esto se conoce como patrón módulo
//Ya no podremos invocar funciones ni acceder por ejemplo al deck
(() => {
    'use strict' //Le decimos a JS que evalúe nuestro código de forma estricta

    /**tenemos que alcanzar 21 puntos */

    let deck = [];
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];

    //Referencias del HTML
    //Si voy a usar el elemento más de una vez, lo meto en una variable para reducir el número de 
    //llamadas a querySelector
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');


    const inicializarJuego = ( numeroJugadores = 2 ) => {
        deck = crearDeck();
        for ( let i = 0; i < numeroJugadores; i++ ) {
            puntosJugadores.push(0);
        }
    }

    //Crea una baraja
    const crearDeck = () => {
        deck = [];
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
        return _.shuffle(deck);
    }


    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    const valorCarta = ( carta ) => {
        //Extraer el número que será el valor de la carta en el caso de las numéricas
        const valor = carta.substring(0, carta.length-1);
        
        //Esto es equivalente a lo de arriba
        return isNaN(valor) ? 
            ((valor === 'A') ? 11: 10): valor*1; 
        
    }

    //Turno 0: primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] += valorCarta(carta); 
        console.log({carta, turno, puntosJugadores});
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador[turno].append(imgCarta);
    }

    //Turno de la computadora
    //Se va a disparar cuando el jugador pierde o cuando el jugador le da a detener
    //Intentará llegar a los puntos del jugador o a 21
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        //Siempre necesito una carta al menos.
        do {
            const carta = pedirCarta();
            const turno = puntosJugadores.length-1;
            puntosComputadora = acumularPuntos(carta, turno);
            crearCarta(carta, turno);
            if(puntosMinimos > 21) {
                break;
            }
        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        //Le vamos a decir a JS que ejecute el alert cuando pinte las cartas
        setTimeout(() => {
            if( puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if(puntosMinimos > 21) {
                alert('Computadora gana');
            } else if(puntosComputadora > puntosMinimos) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 20); //Vamos a pedir 10ms antes de ejecutar el alert
        
    }

    //Eventos
    //Cuando mandamos una función como argumento, estamos haciendo un callback
    //Cuando escuche un click se disparará la función indicada
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0); //Jugador 1
        
        crearCarta(carta, 0);

        if( puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if(puntosJugador === 21){
            console.warn('Ganaste!');
            alert('El jugador ganó');
            btnPedir.disabled = true;

        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener('click', () => {
        console.clear();
        inicializarJuego();
    });

})(); //Función anónima autoinvocada que se genera un scope sin
//referencia por nombre y no se podrá llamar

