//Code for the match game

//Card object code
function cardImages(){
    this.front = ""; //Card image to be made in populateCards()
    this.back = "../images/matchimages/cardback.png"; //Default cardback image. Only one for the match game
    this.cardid = "" //The id of the related div element
}

//array of card objects to be used in any functions
let myCardArray = [];

//array of cards chosen to be compared for matches
let cardsChosen = [];

//array of cards already matched and removed
let cardsMatched = [];

//Number of points our player has gotten
let points = 0;

//Var to change the number of cards generated. *NOTE* More card images will need to be include for more than 8 cards
let numOfCards = 8;

//function for populating the cards
function populateCards()
{
    //create card game elements
    for(i = 0; i < numOfCards; i++) //loop up to the number of cards we want in the match game
    {
        let tempcard = document.createElement("img"); //creates a div element that we can place on the page
        tempcard.setAttribute("id", "matchcard" + i); //sets the id of the created div element
        tempcard.setAttribute("class", "matchcard"); // sets the class of the created div element
        tempcard.addEventListener("click", function(){flipCard(this.id);}, false); // adds click event to our card images
        document.getElementById("gameboard").appendChild(tempcard); //places our created div element in the gameboard div
    }
    //EDITING NOTE
    //addEventListener fires the function immediately, to prevent our cards from flipping, we add and additional function that calls flipCard

    //generate array of card numbers to assist with card generation
    let cardnumarray = [];

    for(i = 0; i < numOfCards/2; i++)
    {
        cardnumarray.push(i + 1);
        cardnumarray.push(i + 1);
        //*NOTE* We push 2 of the same number into the array to allow 2 copies of each card to be generated
    }

    //generate cards with only 2 copies of each "front" image total
    for(i = 0; i < numOfCards; i++) //same as the loop above
    {
        let cardImageIndex = Math.ceil(Math.random() * cardnumarray.length - 1); //get an image number to add to the card
        let cardImgs = new cardImages; //create a card object to hold relevant data
        cardImgs.front = "../images/matchimages/" + cardnumarray[cardImageIndex] + ".png"; //set the card front image so we can actually match
        cardImgs.cardid = "matchcard" + i; //set matching id for reference in flipCard
        myCardArray.push(document.getElementById("matchcard" + i)); //add the object for association to an array
        myCardArray[i].cardInfo = cardImgs; //add the image data to the img element in the array
        cardnumarray.splice(cardImageIndex, 1); //remove the number from cardnumarray to prevent unwanted duplicates
    }

    //assign card back images
    for(i = 0; i < myCardArray.length; i++) //using length of previously populated myCardArray
    {
        myCardArray[i].setAttribute("src", myCardArray[i].cardInfo.back); //Place back images on to cards
    }
}

//autorun on page load
document.getElementById("gameboard").onload = populateCards();

//Check for matches
function checkForMatch()
{
    if(cardsChosen.length == 2)
    {
        if(cardsChosen[0].getAttribute("src") == cardsChosen[1].getAttribute("src"))
        {
            points += 1;
            document.getElementById("score").innerHTML = points;
            cardsMatched.push(cardsChosen[0]);
            cardsMatched.push(cardsChosen[1]);
            cardsChosen.splice(0, 2);
        }
        else
        {
            setTimeout(unFlipCards, 780);
            setTimeout(() => {cardsChosen.splice(0,2)}, 800);
        }
        if(cardsMatched.length == myCardArray.length)
        {
            setTimeout(resetBoard, 700);
        }
    }
}

//function to flip cards
function flipCard(idToFlip)
{
    let elementToFlip = document.getElementById(idToFlip);//get the id number of the card that was selected
    if(!cardsMatched.includes(elementToFlip))
    {
        let idNum = elementToFlip.getAttribute("id").replace("matchcard", "");
        elementToFlip.setAttribute("src", myCardArray[idNum].cardInfo.front);
        cardsChosen.push(elementToFlip);
        checkForMatch();
    }
}

//function to flip the cards back over in the event they are not a match
function unFlipCards()
{
    for(i = 0; i < cardsChosen.length; i++)
    {
        cardsChosen[i].setAttribute("src", myCardArray[0].cardInfo.back);
    }
}

//function to reset game board
function resetBoard()
{
    clearGameInfo()
    clearboard();
    populateCards();
}

//function to clear gameboard
function clearboard()
{
    let parent = document.getElementById("gameboard");
    while(parent.firstChild)
    {
        parent.removeChild(parent.firstChild);
    }
}

//function to clear game info
function clearGameInfo()
{
    myCardArray = [];
    cardsMatched = [];
}
