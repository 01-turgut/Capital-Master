const userName = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalscore')
const mostRecentScore = localStorage.getItem('mostRecentScore');


userName.addEventListener('keyup', () => {

    saveScoreBtn.disabled = !userName.value;
});

saveHighScore = e => {
    console.log('clicked the save button!');
    e.preventDefault();
}