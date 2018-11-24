import * as steem from 'steem';
import * as crypto from 'crypto';

class VerifyDice {

  verifyDiceRolls(diceData) {

    let verifiedRolls = [];
    let unverifiedRolls = [];
    let missingSeedRolls = [];

    diceData.diceRolls.forEach(roll => {

      let bet = diceData.placedBets.find(bet => bet.transactionId === roll.refTransactionId);
      if (bet && roll.isValid) {
          let serverSeed = diceData.seeds.find(s => bet.block >= s.startBlock && bet.block <= s.endBlock);

          if(!serverSeed || !serverSeed.seed) {
            missingSeedRolls.push(roll);
          } else {
            let clientSeed = bet.memo.split(' ', )[2];
            let resultSeed = crypto.createHmac('sha256', serverSeed.seed).update(`${clientSeed}-${bet.block}`).digest('hex');
            let diceRoll = (parseInt(resultSeed.substr(0, 10), 16) % 100) + 1;

            diceRoll === roll.diceRoll ? verifiedRolls.push(roll) : unverifiedRolls.push(roll);
          }
      }
    });

    return {
      verifiedRolls,
      unverifiedRolls,
      missingSeedRolls
    };
  }

}

const verifyDice = new VerifyDice();
export default verifyDice;