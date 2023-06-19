// Pasos: 
// 1. Crear una lista de números duplicados y luego desordenarlos al azar
//  1.1 sort() vs toSorted()
// 2. Encontrar el index de cada card según se haga clic (event.target.tagName, parentNode)
// 3. Crear un contador para cada vez que se haga un click en alguna card
// 4. Mostrar un primer y segundo numero random en una card y luego deshabilitar las card (.disabled = true)
// 5. Detectar la cantidad de moviemientos realizados por el jugador y mostrarlo en el pantalla 
// 6. Verificar si la primera tarjeta es igual a la segunda  e incrementar los aciertos (intentos exitosos) en pantalla, además de volver a cero el contador de tarjetas
// 7. De no ser iguales ocultar tarjetas con setTimeout y decirle que las dos tarjetas esten en disabled = false, además debemos volver el contador en cero. 
// 8. Verificar si los aciertos son igual a 8 y mostrar el tiempo usado
// 9. Agregar temporizador de 30 segundos y al perder mostrar todas los numeros de las tarjetas
// 10. Agregar botón de reset game

let cards = document.getElementById('cards');
let p_movements = document.getElementById('movements');
let p_successful_attempts = document.getElementById('successful-attempts');
let p_time_left = document.getElementById('time-left');
let b_reset = document.querySelector('.visible');

let win_audio = new Audio('./sound/win.wav');
let lose_audio = new Audio('./sound/lose.wav');
let clic_audio = new Audio('./sound/clic.wav');
let right_audio = new Audio('./sound/right.wav');
let wrong_audio = new Audio('./sound/wrong.wav');

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let random = numbers.toSorted(() => Math.random() - 0.5);
console.log(random);

let card;
let index;
let card_one;
let card_two;
let first_result;
let second_result;
let time_left;
let time_controller;
let block_card;

let card_counter = 0;
let movements = 0;
let successful_attempts = 0;
let time = 30;
let total_time = 30;
let timer = false;

cards.addEventListener('click', find_index);
b_reset.addEventListener('click', reset_game);

function find_index(event) {
    if (event.target.tagName == 'BUTTON') {
        card = document.getElementsByTagName('div');
        index = Array.prototype.indexOf.call(card, event.target.parentNode);
    }
    show_card(index);
}

function show_card(index) {
    if (timer == false) {
        measure_time();
        timer = true;
    }

    card_counter++;

    if (card_counter == 1) {
        card_one = document.getElementById(index);
        first_result = random[index]
        card_one.innerHTML = `<img src="./image/${first_result}.png" alt="">`;

        clic_audio.play();

        card_one.disabled = true;
    } else if (card_counter == 2) {
        card_two = document.getElementById(index);
        second_result = random[index];
        card_two.innerHTML = `<img src="./image/${second_result}.png" alt="">`;

        card_two.disabled = true;

        movements++;
        p_movements.innerText = `Movements: ${movements}`;

        if (first_result == second_result) {
            card_counter = 0;

            successful_attempts++;
            p_successful_attempts.innerText = `Successful attempts: ${successful_attempts}`;

            right_audio.play();

            if (successful_attempts == 8) {
                clearInterval(time_controller);
                win_audio.play();

                p_successful_attempts.innerText = `Successful attempts: ${successful_attempts} 😱`;
                p_time_left.innerText = `Great, you only took ${total_time - time} seconds 😄`;
                p_movements.innerText = `Movements: ${movements} 😎`;

                b_reset.classList.toggle('visible');
            }
        } else {
            wrong_audio.play();

            setTimeout(() => {
                if (time > 0) {
                    card_counter = 0;

                    card_one.innerText = ' ';
                    card_two.innerText = ' ';
                    card_one.disabled = false;
                    card_two.disabled = false;
                }
            }, 800)

            /* if(time == 0){
                show_and_lock_card();
            } */
        }
    }

    console.log(card_counter);
}

function measure_time() {
    time_controller = setInterval(() => {
        time--;
        p_time_left.innerText = `Time: ${time} seconds`

        if (time <= 0) {
            b_reset.classList.toggle('visible')
            clearInterval(time_controller);
            show_and_lock_card();

            lose_audio.play();
        }

    }, 1000);
}

function show_and_lock_card() {
    for (let i = 0; i <= 15; i++) {
        block_card = document.getElementById(i);
        block_card.innerHTML = `<img src="./image/${random[i]}.png" alt="">`;
        block_card.disabled = true;
    }
}

function reset_game() {
    location.reload();
}