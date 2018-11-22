
class Report {

  createReport(diceData, verifyData, diceStats) {
    console.log('');
    console.log(`###############`);
    console.log(`Stats`)
    console.log(`###############`);
    console.log(`Total bets SBD: ${diceStats.totalBetSBD}`);
    console.log(`Total bets STEEM: ${diceStats.totalBetSTEEM}`);
    console.log(`Total payout SBD: ${diceStats.totalPayoutSBD}`);
    console.log(`Total payout STEEM: ${diceStats.totalPayoutSTEEM}`);
    console.log(`Total players: ${diceStats.totalPlayers}`);

    console.log('');
    console.log(`###############`);
    console.log(`Bets/Dice Rolls`)
    console.log(`###############`);
    console.log(`Total bets: ${diceData.placedBets.length}`);
    console.log(`Valid bets: ${diceData.validBets.length}`);
    console.log(`Invalid bets: ${diceData.invalidBets.length}`);
    console.log(`Unhandled bets: ${diceData.unhandledBets.length}`);

    console.log(`Verified dice rolls: ${verifyData.verifiedRolls.length}`);
    console.log(`Unverfied dice rolls: ${verifyData.unverifiedRolls.length}`);
    console.log(`Missing seed dice rolls: ${verifyData.missingSeedRolls.length}`)

    // if (diceData.validBets.length > 0) {
    //   console.log('')
    //   console.log(`###############`);
    //   console.log(`Valid bets`)
    //   console.log(`###############`);
    //   diceData.validBets.forEach(b => this.printBet(b));
    // }

    if (diceData.invalidBets.length > 0) {
      console.log('')
      console.log(`###############`);
      console.log(`Invalid bets`)
      console.log(`###############`);
      diceData.invalidBets.forEach(b => this.printBet(b));
    }

    if (diceData.unhandledBets.length > 0) {
      console.log('')
      console.log(`###############`);
      console.log(`Unhandled bets`)
      console.log(`###############`);
      diceData.unhandledBets.forEach(b => this.printBet(b));
    }

    // if (verifyData.verifiedRolls.length > 0) {
    //   console.log('')
    //   console.log(`###############`);
    //   console.log(`Verified dice rolls`)
    //   console.log(`###############`);
    //   verifyData.verifiedRolls.forEach(b => this.printDiceRoll(b));
    // }

    if (verifyData.unverifiedRolls.length > 0) {
      console.log('')
      console.log(`###############`);
      console.log(`Unverfied dice rolls`)
      console.log(`###############`);
      verifyData.unverifiedRolls.forEach(b => this.printDiceRoll(b));
    }

    if (verifyData.missingSeedRolls.length > 0) {
      console.log('')
      console.log(`###############`);
      console.log(`Missing seed dice rolls`)
      console.log(`###############`);
      verifyData.missingSeedRolls.forEach(b => this.printDiceRoll(b));
    }
  }

  printBet(bet) {
    console.log(`TransactionId: ${bet.transactionId}, BlockNumber: ${bet.block}, ${bet.from} -> ${bet.amount}, Memo: ${bet.memo}`);
  }

  printDiceRoll(dr) {
    console.log(`BetId: ${dr.betId}, TransactionId: ${dr.transactionId}, BlockNumber: ${dr.block}, RefTransactionId: ${dr.refTransactionId}, Player: ${dr.to}, DiceRoll: ${dr.diceRoll}, ServerSeedHash: ${dr.serverSeedHash}`);
  }


}

const report = new Report();
export default report;

