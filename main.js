import {Block, BlockChain} from './blockchain.js';

const block = new Block({
    amount : 5
})

const block1 = new Block({
    amount : 10
})

const block2 = new Block({
    amount : 15
})


const myBlockChain = new BlockChain();
myBlockChain.addBlock(block);
myBlockChain.addBlock(block1);
myBlockChain.addBlock(block2);

console.log(myBlockChain.chain);