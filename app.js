/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activatePlayer, gamePlaying, lastRoundDice, currentRoundDice, finalScore;

// init();

document.querySelector(".btn-roll").addEventListener('click',function(){

  if(gamePlaying){

    // 1. Random number
    currentRoundDice = Math.floor(Math.random()*6)+1;

    // 2. Display the result
    var diceDOM=document.querySelector(".dice");
    diceDOM.style.display = 'block';
    diceDOM.src= 'dice-'+currentRoundDice+'.png';


    if((currentRoundDice === 6) && (lastRoundDice === 6))
    {
      // When roundDice and lastRoundDice both are not equal to 6, the player looses his ENTIRE score
      scores[activatePlayer] = 0;

      // Update the UI
      document.querySelector('#score-'+activatePlayer).textContent='0';
      nextPlayer();
    }
    else if (currentRoundDice !== 1)
    {
      //Update the round score IF the rolled number was a NOT 1 and
      //Add score
      roundScore += currentRoundDice;
      document.querySelector('#current-'+activatePlayer).textContent=roundScore;

    }
    else
    {
      nextPlayer();
    }

     lastRoundDice=currentRoundDice;
  }

});

document.querySelector('.btn-hold').addEventListener('click',function(){
  if(gamePlaying){
    // Add CURRENT score to GLOBAL score
    scores[activatePlayer]+=roundScore;

    // Update the UI
    document.querySelector('#score-'+activatePlayer).textContent=scores[activatePlayer];

    if (scores[activatePlayer] >= finalScore){
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

document.querySelector('.btn-new').addEventListener('click',configureGame);

document.querySelector('.btn-final-score').addEventListener('click',init);

function configureGame(){

  //Show Configuration Final Score Panel
  document.getElementById('final_score').value=100;
  document.getElementById('final-score-panel').style.display='block';

  //Hidden Game Panel
  document.getElementById('game-panel').style.display='none';

}

function init(){

  scores = [0,0];
  roundScore = 0;
  activatePlayer = 0;
  gamePlaying = true;
  lastRoundDice = 0;
  currentRoundDice = 0;
  finalScore=100;

  finalScore = document.getElementById('final_score').value;

  ///Hidden Configuration Final Score Panel
  document.getElementById('final-score-panel').style.display='none';

  //Show Game Panel
  document.getElementById('game-panel').style.display='block';

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
  lastRoundDice = 0;
  currentRoundDice = 0;

  document.getElementById('current-0').textContent= '0';
  document.getElementById('current-1').textContent= '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display='none';

};


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that,
it's the next player's turn.

2. Add a input field to the HTML where players can set the winning score,
so that they can change the predefined score of 100.

3. Add another dice to the game, so that there are two dices now. The player
looses his current score when one of them is a 1.

*/
