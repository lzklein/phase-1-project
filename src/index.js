console.log(Math.floor(Math.random()*100))
//Math.floor(Math.random()*dadJokeArray.length)

// const dadJoke = document.querySelector('#dad-joke');
// const jokeButton = document.querySelector('#joke-button')

// function getJokeData(){
//     return fetch('https://icanhazdadjoke.com/').then(r => r.json())
// }

// function displayJoke(jokeData){
//     dadJoke.textContent = jokeData.joke;
// }

// jokeButton.addEventListener('click', function(){getJokeData().then(data => displayJoke(data))})


// fetch('https://icanhazdadjoke.com/') will return random joke without needing randomizer, would probably cause issues down the line
// fetch('https://icanhazdadjoke.com/j/<JOKEID>') would return joke for specific id
// joke ids completely random, 744 total jokes
// create some sort of loop that fetches entire db? 
// will need entire db to add to object "likes" and "dislikes"
