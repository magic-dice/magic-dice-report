
import * as steem from 'steem';

const Account = 'magicdice';

export class DiceData {

  options: any;

  constructor(options) {
    this.options = options;
  }

  async getDiceData() {

    const accountState = await steem.api.getStateAsync(`@${Account}/transfers`);
    const transferHistory = accountState.accounts[Account].transfer_history.map(op => op[1]);

    const seeds = this.getSeeds(accountState);
    const diceRolls = this.getDiceRolls(transferHistory);
    const placedBets = this.getPlacedBets(transferHistory);

    const invalidBets = placedBets.filter(bet => {
      let roll = diceRolls.find(roll => roll.refTransactionId === bet.transactionId);
      return roll ? !roll.isValid : false;
    });

    const validBets = placedBets.filter(bet => {
      let roll = diceRolls.find(roll => roll.refTransactionId === bet.transactionId);
      return roll ? roll.isValid : false;
    });

    const unhandledBets = placedBets.filter(bet => !diceRolls.find(roll => roll.refTransactionId === bet.transactionId));

    return {
      seeds,
      diceRolls,
      placedBets,
      invalidBets,
      validBets,
      unhandledBets
    }
  }

  getSeeds(accountState: any) {

    let postedHash = <any[]>accountState.accounts[Account].other_history
                           .map(op => op[1])
                           .filter(trx => trx.op[0] === 'custom_json' && trx.op[1].id === 'diceHash')
                           .map(trx => ({
                              block: trx.block,
                              timestamp: trx.timestamp,
                              transactionId: trx.id,
                              ...JSON.parse(trx.op[1].json)
                           }))
                           .sort((a, b) => a.block - b.block)
                           .filter(trx => trx.block >= this.options.start_block && trx.block <= this.options.end_block);

    let postedSeeds = <any[]>accountState.accounts[Account].other_history
                           .map(op => op[1])
                           .filter(trx => trx.op[0] === 'custom_json' && trx.op[1].id === 'diceSeed')
                           .map(trx => ({
                              block: trx.block,
                              timestamp: trx.timestamp,
                              transactionId: trx.id,
                              ...JSON.parse(trx.op[1].json)
                           }))
                           .sort((a, b) => a.block - b.block)
                           .filter(trx => trx.block >= this.options.start_block && trx.block <= this.options.end_block);

    let seeds = postedSeeds.map(seed => {
      let hashIndex = postedHash.findIndex(hash => hash.serverSeedHash === seed.refServerSeedHash);

      return {
        startBlock: hashIndex >= 0 ? postedHash[hashIndex].block + 1 : -1,
        endBlock: hashIndex >= 0 && hashIndex + 1 < postedHash.length ? postedHash[hashIndex + 1].block : seed.block,
        seed: seed.serverSeed,
        hash: seed.refServerSeedHash
      };
    });

    return seeds;

  }

  getPlacedBets(transferHistory: any[]) {
    return transferHistory.filter(trx => trx.op[0] === 'transfer'
                                  && trx.op[1].to === Account
                                  && trx.op[1].from !== Account
                                  && trx.block >= this.options.start_block && trx.block <= this.options.end_block)
                          .map(trx => ({
                            transactionId: trx.trx_id,
                            block: trx.block,
                            timestamp: trx.timestamp,
                            ...trx.op[1]
                          }));
  }

  getDiceRolls(transferHistory: any[]) {
    return transferHistory.filter(trx => trx.op[0] === 'transfer'
                                  && trx.op[1].to !== Account
                                  && trx.op[1].from === Account
                                  && trx.block >= this.options.start_block && trx.block <= this.options.end_block
                                  && trx.op[1].memo.includes('isValid'))
                          .map(trx => ({
                            transactionId: trx.trx_id,
                            block: trx.block,
                            timestamp: trx.timestamp,
                            ...trx.op[1],
                            ...JSON.parse(trx.op[1].memo.substr(trx.op[1].memo.indexOf('{')))
                          }));
  }
}