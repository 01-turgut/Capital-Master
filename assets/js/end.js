const userName = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalscore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores)
finalScore.innerText = mostRecentScore;

userName.addEventListener('keyup', () => {

    saveScoreBtn.disabled = !userName.value;
});

saveHighScore = e => {
    console.log('clicked the save button!');
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: userName.value
    };
    highScores.push(score)
    console.log(score);
}