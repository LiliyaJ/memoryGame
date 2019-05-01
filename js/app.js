/*
 * Create a list that holds all of your cards
 */


 makeNewDeck();
 

//for game
const allCards = document.querySelectorAll('.card');
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
                    
                    openedCards.push(card);
                    card.classList.add('open', 'show');

                    //debugging
                    console.log(openedCards);
                    console.log(openedCards.length);
                    
                    //start the timer
                    if(counter == 1){
                        timeCount();
                    }
                    
                    if (openedCards.length == 2){
                        //check if they match
                        if(cardsMatch(openedCards)){  
                            openedCards.forEach(function(card){
                                card.classList.remove('open', 'show');
                                card.classList.add('match');
                                openedCards = [];
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

//reload
const reload = document.querySelector('.restart');

reload.addEventListener('click', function(){

    
    makeAllCardsClose();
  
    //make new Deck
    makeNewDeck();
    
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
    
});


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

function cardsMatch(array){
    return (openedCards[0].querySelector('i').classList[1] === openedCards[1].querySelector('i').classList[1]);
}

function timeToRemoveStar(){
    return(counter > 0 && counter < 49 && counter%16==0);
}

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

