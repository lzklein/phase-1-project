// console.log(Math.floor(Math.random()*100))

const dadJoke = document.querySelector('#dad-joke');
const jokeButton = document.querySelector('#joke-button')

// get the data from the api
function getJokeData(){
    return fetch('https://icanhazdadjoke.com/', {
        headers: {
            Accept: 'application/json'
        }
    })
    .then(r => r.json())
}

// change joke display to new random joke
function displayJoke(jokeData){
    dadJoke.textContent = jokeData.joke;
}

// attach a like and dislike button to joke
function likeDislike(){
    const likeButton = document.createElement('button');
    const dislikeButton = document.createElement('button');
    likeButton.classList='like-dislike';
    dislikeButton.classList='like-dislike';
    likeButton.textContent = '😂';
    dislikeButton.textContent = '😐';
    // add event listners to like and dislike that save and change like values

    dadJoke.append(likeButton, dislikeButton);
}

// populate top and bottom 5 with jokes based on number of likes


// have the joke button display a new joke
jokeButton.addEventListener('click', function(){getJokeData()
    .then(function(joke){
        displayJoke(joke);
        likeDislike();
    });
})



//add to joke button eventlistener after display joke, create the like and dislike buttons and append to the joke
//

//for just generating jokes just fetch and display joke no need to persist
//after like or dislike, then save a copy of joke object with like/dislike 
//then post/patch copy to own db


//button text: can I get a dad joke?
//text appears: I don't know, caaaan you?
//mouseover reagion: may I get a dad joke?