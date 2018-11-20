

class Stats {

  getStats(diceData) {
    let bets = diceData.validBets.map(bet => ({
      ...bet,
      asset : bet.amount.split(' ')[1],
      amount: parseFloat(bet.amount.split(' ')[0]),
    }));

    let diceRolls = diceData.diceRolls.map(roll => ({
      ...roll,
      asset : roll.amount.split(' ')[1],
      amount: parseFloat(roll.amount.split(' ')[0]),
    }));

    const totalBetSBD = bets.filter(b => b.asset === 'SBD').reduce((sum, b) => sum + b.amount, 0);
    const totalBetSTEEM = bets.filter(b => b.asset === 'STEEM').reduce((sum, b) => sum + b.amount, 0);

    const totalPayoutSBD = diceRolls.filter(dr => dr.asset === 'SBD').reduce((sum, dr) => sum + dr.amount, 0);
    const totalPayoutSTEEM = diceRolls.filter(dr => dr.asset === 'STEEM').reduce((sum, dr) => sum + dr.amount, 0);

    const totalPlayers = bets.map(b => b.from).filter(this.onlyUnique).length;

    return {
      totalBetSBD,
      totalBetSTEEM,
      totalPayoutSBD,
      totalPayoutSTEEM,
      totalPlayers
    }
  }

  onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }

}

const stats = new Stats();
export default stats;