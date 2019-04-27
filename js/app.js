/*
 * Create a list that holds all of your cards
 */

const allCards = document.querySelectorAll('.card');
let openedCards = [];
 let counter = 0;
 const movesCounter = document.querySelector('.moves');
 const stars = document.querySelector('.stars');
 const star = stars.firstElementChild;
 let allStars = document.querySelectorAll('.fa-star');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 


makeNewDeck();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//action if a card is clicked
 allCards.forEach(function(card){
    card.addEventListener('click', function(){

//counts moves
    counter++;
    movesCounter.innerHTML = counter;

    if(timeToRemoveStar()){
        stars.removeChild(stars.firstElementChild);
    }

    //debugging
    console.log('moves ' + counter);

    openedCards.push(card);
    card.classList.add('open', 'show');

    //debugging
   // console.log(openedCards);
   // console.log(openedCards.length);
    
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
            }, 300)//timeout
        }//else
    }    
});  
});

//reload

const reload = document.querySelector('.restart');


reload.addEventListener('click', function(){
    
    //all cards have only one class .card
    makeAllCardsClose();
    
    //schuffle cards
    makeNewDeck();

    //set 0 moves 
    counter=0;
    movesCounter.innerHTML = counter;
    
    //set three stars
    setNumberOfStars();

    //set timer to 0
    
});

//handy methods

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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
    const allCardsArr = Array.from(allCards);
    const shuffledAllCards = shuffle(allCardsArr);

    for(let i = 0; i<16; i++){
        //get the class to remove
        var oldClass = allCards[i].querySelector('i').classList[1];
    
        //get the class to add
        var newClass = shuffledAllCards[i].querySelector('i').classList[1];
    
        //just for debugging
    /* console.log('This is the element ' + i + ' of allCards ' + oldClass + ' and its gonna to be replaced with ' + newClass); */
    
        //get the place where to change
        var itemToChange = allCards[i].querySelector('i');
    
        //change classes
        itemToChange.classList.remove(oldClass);
        itemToChange.classList.add(newClass);
    }
}

function setNumberOfStars(){
    if(allStars.length < 3){
        console.log('fire');
    }
    
}

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