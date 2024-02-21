// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
function createNumbersArray(count) {
    let pareArray = [];
    for(let i = 0; i < count; ++i) {
        pareArray.push(i+1,i+1);
    }
    return pareArray;
}



// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

let firstCardPick = null;
let secondCardPick = null;


let count = prompt("Введите количество пар",4);
const pareArray = createNumbersArray(count);
// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
function startGame(count) {
    let h1 = document.createElement('h1');
    h1.textContent = "Игра в пары";
    h1.setAttribute('style','margin-bottom:40px;display:flex;justify-content: center')
    document.body.append(h1);

    let div = document.createElement('div');
    div.classList.add('card-list');
    document.body.append(div);


    pareArray.forEach(element => {
        let div2 = document.createElement('div');
        div2.textContent = element;
        div2.setAttribute('style', 'display:flex;justify-content: center; align-items:center;width:100px;height:150px;border-radius:10px;cursor:pointer')
        div2.classList.add('card');

        div2.addEventListener('click',() => {
            if (div2.classList.contains('opened-card') || (div2.classList.contains('matched-card'))){
                console.log('Эта карточка уже была выбрана')
                return
            }

            if ((firstCardPick !== null) && (secondCardPick !== null)) {
                firstCardPick.classList.remove('opened-card');
                secondCardPick.classList.remove('opened-card');
                firstCardPick = null;
                secondCardPick = null;

            }

            div2.classList.add('opened-card');
            console.log(div2.textContent);

            if (firstCardPick === null) {
                firstCardPick = div2;
            } else {
                secondCardPick = div2;
            }
            // console.log('Первая карточка', firstCardPick);

            // console.log('Вторая карточка', secondCardPick);

            if ((firstCardPick !== null) && (secondCardPick !== null)) {
                if( firstCardPick.textContent === secondCardPick.textContent) {
                    // console.log('Обе карточки открыты!');
                    firstCardPick.classList.add('matched-card');
                    secondCardPick.classList.add('matched-card');
                }
            }

            if (document.querySelectorAll('.matched-card').length === pareArray.length ) {
                setTimeout(() => {
                    //alert('Игра окончена!');
                    playAgain();

                },500);

            }



        });

        div.append(div2);

    });

    div.setAttribute('style','display:grid;grid-template-columns: repeat(4,100px);gap:10px;max-width: fit-content;margin: 0 auto');




}

function resetGame() {
    const cardList = document.querySelector('.card-list');
    const gameTitle = document.querySelector('h1');
    gameTitle.innerHTML = ""; // убрать заголовок игры
    cardList.innerHTML = ""; // убрать все карточки

    shuffle(pareArray);
    startGame(count);
}

function playAgain() {
    const playAgainResponse = confirm("Сыграем еще?");
    if (playAgainResponse) {

        resetGame();
    }
}


console.log(pareArray);
shuffle(pareArray);
console.log(pareArray);
startGame(count);

