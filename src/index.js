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
        // console.log("I like this")
        // console.log(dadJoke.textContent[0])
        // fetch dbjson.then r.json .then
        const jokeExists = !!newJokesObject.find(jokeObj => jokeObj.id === jokeData.id);
        if (jokeExists) {
            newJokesObject.forEach(jokeObj => {
                if (jokeObj.id === jokeData.id) {
                    jokeObj.likes++;
                    console.log(jokeObj.likes);
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
            newJokesObject.push(newJoke);
        }
    })
    dislikeButton.addEventListener('click', function(){
        // console.log("please stop")
        // console.log(dadJoke.textContent[0])
        const jokeExists = !!newJokesObject.find(jokeObj => jokeObj.id === jokeData.id);
        if(jokeExists){
            newJokesObject.forEach(jokeObj =>{
                if(jokeObj.id === jokeData.id){
                    jokeObj.likes--;
                    // console.log(jokeObj.likes);
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
            newJokesObject.push(newJoke);
        }

    })
    dadJoke.append(likeButton, dislikeButton);
}

// populate top and bottom 5 with jokes based on number of likes
function topFiveList(listObject){
    //sort listObject
    //document.QuerySelector("#top-one").textcontent = listObject[0].joke
    //etc etc through [4].joke
}

function bottomFiveList(listObject){    
    //sort listObject
    //document.QuerySelector("#bottom-one").textcontent = listObject(listObject.length -1].joke
    //etc etc thru listObject[listObject.length -5].joke
}

// fetch dbjson, sort data by like value, get jokeArray[0] through [4] and jokeArray[jokeArray.length -1] through jokeArray[jokeArrayk.length - 5]
//then do forEach and append to top five list and bottom five list

//make top and bottom 5 collapsible click is temp change to mouseover to toggle on and mouseleave to toggle off for final
accordion.forEach(button => button.addEventListener('mouseover', function(){
    // topFiveList(newJokesObject);
    let content = this.nextElementSibling;
    content.style.display = "block";
}))

accordion.forEach(button => button.addEventListener('mouseleave', function(){
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