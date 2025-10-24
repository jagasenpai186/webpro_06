const express = require('express');
const app = express();
const ejs = require('ejs'); 


app.set('view engine', 'ejs');


app.use(express.static('public'));

app.get("/janken", (req, res) => {
  
  let hand = req.query.hand; 

  
  let win = Number( req.query.win ) || 0;
  let total = Number( req.query.total ) || 0;
  
  
  const display = {
    your: hand,      
    cpu: null,
    judgement: null,
    win: win,        
    total: total     
  };
  if (hand) {
    const hands = ['グー', 'チョキ', 'パー'];
    const num = Math.floor( Math.random() * 3 );
    const cpu = hands[num];

    let judgement = '';
    if (hand === cpu) {
      judgement = 'あいこ';
    } else if (
      (hand === 'グー' && cpu === 'チョキ') ||
      (hand === 'チョキ' && cpu === 'パー') ||
      (hand === 'パー' && cpu === 'グー')
    ) {
      judgement = '勝ち';
      win += 1; 
    } else {
      judgement = '負け';
    }
    total += 1;  
    display.cpu = cpu;
    display.judgement = judgement;
    display.win = win;
    display.total = total;
  }
    res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));