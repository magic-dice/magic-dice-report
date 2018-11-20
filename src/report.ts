
class Report {

  createReport(diceData, verifyData, diceStats) {
    console.log('');
    console.log(`###############`);
    console.log(`Stats`)
    console.log(`###############`);
    console.log(`Total bets SBD: ${diceStats.totalBetSBD}`);
    console.log(`Total bets STEEM: ${diceStats.totalBetSTEEM}`);
    console.log(`Total payout SBD: ${diceStats.totalBetSBD}`);
    console.log(`Total payout STEEM: ${diceStats.totalBetSTEEM}`);
    console.log(`Total players: ${diceStats.totalPlayers}`);

    console.log('');
    console.log(`###############`);
    console.log(`Bets/Dice Rolls`)
    console.log(`###############`);
    console.log(`Total bets: ${diceData.placedBets.length}`);
    console.log(`Valid bets: ${diceData.validBets.length}`);
    console.log(`Invalid bets: ${diceData.invalidBets.length}`);
    console.log(`Unhandled bets: ${diceData.unhandledBets.length}`);
    console.log('');
    console.log(`Verified dice rolls: ${verifyData.verifiedRolls.length}`);
    console.log(`Unverfied dice rolls: ${verifyData.unverifiedRolls.length}`);
    console.log(`Missing seed dice rolls: ${verifyData.missingSeedRolls.length}`)
  }

}

const report = new Report();
export default report;

