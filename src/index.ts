
import * as commandLineArgs from 'command-line-args';
import { DiceData } from './dice-data';
import stats from './stats';
import report from './report';
import verifyDice from './verify-dice';

const optionDefinitions = [
  { name: 'start_block', type: Number },
  { name: 'end_block', type: Number }
]

const options = commandLineArgs(optionDefinitions);

options.end_block = options.end_block || Infinity;

if (!options.start_block ) {
  console.log(`Missing arguments. Usage: --start_block blockNumber --end_block blockNumber`);
} else {
  console.log('### Magic dice report ###')
  console.log(`Start block: ${options.start_block}`);
  console.log(`End block: ${options.end_block}`);

  startReport();
}

async function startReport() {
  const diceData = await new DiceData(options).getDiceData();
  const verifyData = verifyDice.verifyDiceRolls(diceData);
  const diceStats = stats.getStats(diceData);

  report.createReport(diceData, verifyData, diceStats);
}

