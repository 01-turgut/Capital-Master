const userName = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalscore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores)
finalScore.innerText = mostRecentScore;

// This event listener is for enable the username input when there is any text
userName.addEventListener('keyup', () => {

    saveScoreBtn.disabled = !userName.value;
});

// this function is for saving all the scores, and push into an array
saveHighScore = e => {
    console.log('clicked the save button!');
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: userName.value
    };
    highScores.push(score);
    highScores.sort( (a,b) => b.score- a.score);
    highScores.splice(5);
    
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/')
}