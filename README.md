# magic-dice-report

Report and verification script for https://magic-dice.com

# Report

This script creates a report for all bets and dice rolls for Magic Dice.
Every bet and dice roll of Magic Dice is published to the Steem blockchain. The script verifies that all dice rolls are provably fair. All data for the report is extracted directly from the Steem blockchain.

# Install

```html
npm install
```

# Run report

```html
npm run start-ts -- --start_block 27837575 --end_block 27838654 > report.txt
```