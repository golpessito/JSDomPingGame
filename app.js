/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activatePlayer, gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener('click',function(){

  if(gamePlaying){

    // 1. Random number
    var dice = Math.floor(Math.random()*6)+1;

    // 2. Display the result
    var diceDOM=document.querySelector(".dice");
    diceDOM.style.display = 'block';
    diceDOM.src= 'dice-'+dice+'.png';

    // 3. Update the round score IF the rolled number was a NOT 1
    if (dice !== 1){
      //Add score
      roundScore += dice;
      document.querySelector('#current-'+activatePlayer).textContent=roundScore;
    }
    else
    {
      nextPlayer();
    }
  }

});

document.querySelector('.btn-hold').addEventListener('click',function(){
  if(gamePlaying){
    // Add CURRENT score to GLOBAL score
    scores[activatePlayer]+=roundScore;

    // Update the UI
    document.querySelector('#score-'+activatePlayer).textContent=scores[activatePlayer];

    if (scores[activatePlayer] >= 20){
      document.querySelector('#name-'+activatePlayer).textContent="Winner!";
      document.querySelector('.dice').style.display='none';
      document.querySelector('.player-'+activatePlayer+'-panel').classList.add('winner');
      document.querySelector('.player-'+activatePlayer+'-panel').classList.remove('active');
      gamePlaying=false;
    } else {
      // Check if player won the game
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
  scores = [0,0];
  roundScore = 0;
  activatePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = 'none';
  document.getElementById('score-0').textContent= '0';
  document.getElementById('score-1').textContent= '0';
  document.getElementById('current-0').textContent= '0';
  document.getElementById('current-1').textContent= '0';

  document.getElementById('name-0').textContent="Player 1";
  document.getElementById('name-1').textContent="Player 2";

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer(){

  //Next player
  activatePlayer === 0 ? activatePlayer = 1 : activatePlayer = 0;
  roundScore=0;

  document.getElementById('current-0').textContent= '0';
  document.getElementById('current-1').textContent= '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display='none';

};
