// console.log(Math.floor(Math.random()*100))

const dadJoke = document.querySelector('#dad-joke');
const jokeButton = document.querySelector('#joke-button');
const accordion = document.querySelectorAll('.accordion');
const jokeWindow = document.querySelector('.joke-window');
const finger = document.querySelector('#pull-my-finger');

const newJokesObject = [];

// get the data from the api
function getJokeData(){
    return fetch('https://icanhazdadjoke.com/', {
        headers: {
            Accept: 'application/json'
        }
    })
    .then(r => r.json())
}

function patchLikes(jokeObj){
    fetch(`http://localhost:3000/dadjokes/${jokeObj.id}`, {
        method: "PATCH",
        headers: {
            "content-type" : "application/json"},
        body: JSON.stringify(jokeObj)
    })
}

function getSavedJokes(){
    return fetch('http://localhost:3000/dadjokes').then(r=>r.json());
}

function saveJokeInternal(jokeObject){
    fetch('http://localhost:3000/dadjokes', {
        method: "POST",
        headers: {
            "content-type" : "application/json"},
        body: JSON.stringify(jokeObject)
    })
}

// change joke display to new random joke
function displayJoke(jokeData){
    dadJoke.textContent = jokeData.joke;
}

// attach a like and dislike button to joke
function likeDislike(jokeData){
    const likeButton = document.createElement('button');
    const dislikeButton = document.createElement('button');
    likeButton.classList='like-dislike';
    dislikeButton.classList='like-dislike';
    likeButton.textContent = `😂`;
    dislikeButton.textContent = `😐`;
// add event listeners to like and dislike that save and change like values
    likeButton.addEventListener('click', function(){
        getSavedJokes().then(function(newJokesObject){
            const jokeExists = !!newJokesObject.find(jokeObj => jokeObj.id === jokeData.id);
            if (jokeExists) {
                newJokesObject.forEach(jokeObj => {
                    if (jokeObj.id === jokeData.id) {
                        jokeObj.likes++;
                        patchLikes(jokeObj);
                        if(jokeObj.likes > 0){
                            likeButton.textContent = `😂 ${jokeObj.likes}`;
                        }
                        else{
                            dislikeButton.textContent = `😐 ${jokeObj.likes}`;
                            likeButton.textContent = `😂 0`
                        }
                    }
                });
            } 
            else {
                const newJoke = {
                    joke: jokeData.joke,
                    id: jokeData.id,
                    url: jokeData.url,
                    likes: 1
                };
                // console.log(newJoke.id);
                likeButton.textContent = `😂 1`;
                saveJokeInternal(newJoke);
            }
        })

    })
    dislikeButton.addEventListener('click', function(){
        getSavedJokes().then(function(newJokesObject){
            const jokeExists = !!newJokesObject.find(jokeObj => jokeObj.id === jokeData.id);
            if(jokeExists){
                newJokesObject.forEach(jokeObj =>{
                    if(jokeObj.id === jokeData.id){
                        jokeObj.likes--;
                        patchLikes(jokeObj);
                        if(jokeObj.likes < 0){
                            dislikeButton.textContent = `😐 ${jokeObj.likes}`;
                        }
                        else{
                            likeButton.textContent = `😂 ${jokeObj.likes}`;
                            dislikeButton.textContent = `😐 0`;
                        }
                    }
                })
            }
            else{
                const newJoke = {
                    joke: jokeData.joke,
                    id: jokeData.id,
                    url: jokeData.url,
                    likes: -1
                }
                // console.log(newJoke.id);
                dislikeButton.textContent = `😐 -1`;
                saveJokeInternal(newJoke);
            }
        })
    })
    dadJoke.append(likeButton, dislikeButton);
}

// populate top and bottom 5 with jokes based on number of likes
function topFiveList(listObject){
    //sort listObject
    listObject.sort((a,b) => a.likes - b.likes);
    const topOne = document.querySelector('#top-one');
    const topTwo = document.querySelector('#top-two');
    const topThree = document.querySelector('#top-three');
    const topFour = document.querySelector('#top-four');
    const topFive = document.querySelector('#top-five');
    if(listObject.length > 0){
        topOne.textContent = `${listObject[listObject.length-1].joke}  😂 ${listObject[listObject.length-1].likes} 😂 ` 
    }
    if(listObject.length > 1){
        topTwo.textContent = `${listObject[listObject.length-2].joke}  😂 ${listObject[listObject.length-2].likes} 😂 ` 
    }
    if(listObject.length > 2){
        topThree.textContent = `${listObject[listObject.length-3].joke}  😂 ${listObject[listObject.length-3].likes} 😂 ` 
    }
    if(listObject.length > 3){
        topFour.textContent = `${listObject[listObject.length-4].joke}  😂 ${listObject[listObject.length-4].likes} 😂 ` 
    }
    if(listObject.length > 4){
        topFive.textContent = `${listObject[listObject.length-5].joke}  😂 ${listObject[listObject.length-5].likes} 😂 `
    }
}

// const testButton = document.createElement('button');
// testButton.textContent = 'test';
// testButton.addEventListener('click', function(){
//     topFiveList(newJokesObject);
// }
// )
// jokeWindow.append(testButton);



function bottomFiveList(listObject){    
    listObject.sort((a,b) => a.likes - b.likes);
    const bottomOne = document.querySelector('#bottom-one');
    const bottomTwo = document.querySelector('#bottom-two');
    const bottomThree = document.querySelector('#bottom-three');
    const bottomFour = document.querySelector('#bottom-four');
    const bottomFive = document.querySelector('#bottom-five');
    if(listObject.length > 0){
        bottomOne.textContent = `${listObject[0].joke}  😐 ${listObject[0].likes} 😐 ` 
    }
    if(listObject.length > 1){
        bottomTwo.textContent = `${listObject[1].joke}  😐 ${listObject[1].likes} 😐 ` 
    }
    if(listObject.length > 2){
        bottomThree.textContent = `${listObject[2].joke}  😐 ${listObject[2].likes} 😐 ` 
    }
    if(listObject.length > 3){
        bottomFour.textContent = `${listObject[3].joke}  😐 ${listObject[3].likes} 😐 ` 
    }
    if(listObject.length > 4){
        bottomFive.textContent = `${listObject[4].joke}  😐 ${listObject[4].likes} 😐 `
    }
}

// fetch dbjson, sort data by like value, get jokeArray[0] through [4] and jokeArray[jokeArray.length -1] through jokeArray[jokeArrayk.length - 5]
//then do forEach and append to top five list and bottom five list

//make top and bottom 5 collapsible click is temp change to mouseover to toggle on and mouseleave to toggle off for final
accordion.forEach(button => button.addEventListener('mouseover', function(){
    getSavedJokes().then(data => topFiveList(data));
    let content = this.nextElementSibling;
    content.style.display = "block";
}))

accordion.forEach(button => button.addEventListener('mouseleave', function(){
    getSavedJokes().then(data => bottomFiveList(data));
    let content = this.nextElementSibling;
    content.style.display = "none";
}))

const fart = document.createElement('audio');
fart.src='fart.mp3';

finger.addEventListener('click', function(){
    fart.play();
})

// have the joke button display a new joke
jokeButton.addEventListener('click', function(){getJokeData()
    .then(function(joke){
        displayJoke(joke);
        likeDislike(joke);
    });
})


//for just generating jokes just fetch and display joke no need to persist
//after like or dislike, then save a copy of joke object with like/dislike 
//then post/patch copy to own db



//PROPOSED CHANGE TO JOKE BUTTON:
//button text: can I get a dad joke?
//text appears: I don't know, caaaan you?
//button changes: may I get a dad joke?

//other stretch goal: have submit box only at start, after user types something in, title of "hi (whatever user submitted) I'm dad and rest of site fades in"