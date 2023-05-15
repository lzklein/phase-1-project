// console.log(Math.floor(Math.random()*100))

const dadJoke = document.querySelector('#dad-joke');
const jokeButton = document.querySelector('#joke-button');
const accordion = document.querySelectorAll('.accordion');

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
    // add event listeners to like and dislike that save and change like values

    dadJoke.append(likeButton, dislikeButton);
}

// populate top and bottom 5 with jokes based on number of likes


//make top and bottom 5 collapsible click is temp change to mouseover to toggle on and mouseleave to toggle off for final
accordion.forEach(button => button.addEventListener('mouseover', function(){
    let content = this.nextElementSibling;
    content.style.display = "block";
}))

accordion.forEach(button => button.addEventListener('mouseleave', function(){
    let content = this.nextElementSibling;
    content.style.display = "none";
}))

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

//PROPOSED CHANGE TO JOKE BUTTON:
//button text: can I get a dad joke?
//text appears: I don't know, caaaan you?
//button changes: may I get a dad joke?
