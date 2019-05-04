

//for runGame
var allCards = makeNewDeck();
let openedCards = [];
let counter = 0;
const movesCounter = document.querySelector('.moves');
//for stars
const stars = document.querySelector('.stars');
const star = stars.firstElementChild;

runGame();



function runGame(){

    //action if a card is clicked
    allCards.forEach(function(card){
        card.addEventListener('click', function(){


        if(timeToRemoveStar()){
            stars.removeChild(stars.firstElementChild);
        }

            //main stuff
        if ((!card.classList.contains('open') && !card.classList.contains('show'))){
            if(!card.classList.contains('match')){
            
                //counts moves and changing the view
                counter++;
                movesCounter.innerHTML = counter;
                 
                //start the timer
                if(counter == 1){
                    timeCount();
                }

                //open cards
                openedCards.push(card);
                card.classList.add('open', 'show');

                    
                if (openedCards.length == 2){
                    //check if they match
                    if(cardsMatch(openedCards)){  
                        openedCards.forEach(function(card){
                            card.classList.remove('open', 'show');
                            card.classList.add('match');
                            openedCards = [];
                            if(win()){
                                popUpCongWindow(); 
                            }
                        });
                    }else{
                        //if they don't match
                        setTimeout(function(){
                            openedCards.forEach(function(card){
                                card.classList.remove('open', 'show');
                            });//openedCards
                            openedCards = [];
                        }, 300);//timeout
                    }//else
                }  
            }
        }  
    });  
});
}

//for restart
const reload = document.querySelector('.restart');

//restart
reload.addEventListener('click', function(){
    sec.innerHTML = '00';
    min.innerHTML = '00';
    restart();
    
});

function restart(){
     
    makeAllCardsClose();

    //delete the small bug 
    openedCards = [];
  
    //make new Deck
    allCards = makeNewDeck();
    
    runGame();

    //set 0 moves
    counter = 0;
    movesCounter.innerHTML = '0';

    //set three stars
    setNumberOfStars();

    //set timer to 0
    clearTimeout(timer); 
    sec.innerHTML = '00';
    min.innerHTML = '00';
    addSec = 0;
    addMin = 0;
}

//handy methods

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(originalArray) {
    let array = [...originalArray];
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//making new deck
function makeNewDeck(){
   const cards = 
    ['<i class="fa fa-diamond"></i>', '<i class="fa fa-diamond"></i>', 
    '<i class="fa fa-paper-plane-o"></i>', '<i class="fa fa-paper-plane-o"></i>',
    '<i class="fa fa-anchor"></i>', '<i class="fa fa-anchor"></i>', 
    '<i class="fa fa-leaf"></i>', '<i class="fa fa-leaf"></i>',
    '<i class="fa fa-bicycle"></i>', '<i class="fa fa-bicycle"></i>',
    ' <i class="fa fa-bomb"></i>', ' <i class="fa fa-bomb"></i>',
    '<i class="fa fa-bolt"></i>', '<i class="fa fa-bolt"></i>',
    '<i class="fa fa-cube"></i>', '<i class="fa fa-cube"></i>']

    const shuffledCards = shuffle(cards);
    
    const deck = document.querySelector('.deck');
    deck.innerHTML = '';

    for(let i = 0; i < shuffledCards.length; i++){
        const li = document.createElement('li');
        li.classList.add('card');
        deck.appendChild(li);
        li.innerHTML = li.innerHTML + shuffledCards[i];
    }
    const allShuffledCards = document.querySelectorAll('.card');
    return (allShuffledCards); 
}

function isCardClose(){
    return (!card.classList.contains('open') && !card.classList.contains('show') || !card.classList.contains('match'));
}

//for restart
function setNumberOfStars(){
    const numberOfStarsToAdd = 3 - stars.children.length;
    for(let i = 1; i <= numberOfStarsToAdd; i++){
        const starClone = star.cloneNode(true);
        stars.appendChild(starClone);
    }
}

//for restart
function makeAllCardsClose(){
    allCards.forEach(function(card){
    card.classList.remove('match', 'open','show');
   });
}

//runGame
function cardsMatch(array){
    return (openedCards[0].querySelector('i').classList[1] === openedCards[1].querySelector('i').classList[1]);
}

//runGame
function timeToRemoveStar(){
    return(counter > 0 && counter < 41 && counter%20==0);
}

//for timer
function win(){
       var matchArr = document.querySelectorAll('.match');
       return (matchArr.length == 16);
}

//variables for timer
let sec = document.querySelector('.sec');
let min = document.querySelector('.min');
var timer;
let addSec = 0;
var addMin = 0;

function timeCount(){  
    if(addSec<10 && !win()){
        sec.innerHTML = '0' + addSec;
        addSec++;
        timer = setTimeout(timeCount, 1000);
    }else if(addSec<60 && !win()){
        sec.innerHTML = addSec;
        addSec++;
        timer = setTimeout(timeCount, 1000);
    }else{
        if(addMin < 10 && !win()){
            addSec = 0;
            sec.innerHTML = '0' + addSec;
            //deletes two second interval
            addSec++;
            addMin++;
            min.innerHTML = '0' + addMin;
            timer = setTimeout(timeCount, 1000);
        }else if(!win()){
            addSec = 0;
            sec.innerHTML = '0' + addSec;
            //deletes two second interval
            addSec++;
            addMin++;
            min.innerHTML = addMin;
            timer = setTimeout(timeCount, 1000); 
        }else{
            clearTimeout(timer);
        }
    }  
}

//won pop-up
let result_popup = document.querySelector('.result-pop-up');

function popUpCongWindow(){
    
    
    let result_time = document.querySelector('.result-time');
    let result_moves = document.querySelector('.result-moves');
    let result_stars = document.querySelector('.result-stars');
    let button = document.querySelector('.btn');
    
    result_time.innerHTML = min.innerHTML + ':' + sec.innerHTML;

    result_moves.innerHTML = movesCounter.innerHTML;

    let length = document.querySelector('.stars').children.length;
    result_stars.innerHTML = length;

    button.addEventListener('click', function(){
        restart ();
        result_popup.style.display = 'none';
    });

    setTimeout(function(){result_popup.style.display = 'grid'}, 300);
    
}
