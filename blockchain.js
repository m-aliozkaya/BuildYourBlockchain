import SHA256 from 'crypto-js/sha256.js';

class Block{
    constructor(data){
        this.index = 0;
        this.timestamp = Date.now();
        this.data = data;
        this.previousHash = "";
        this.hash = '';
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
            this.hash = this.calculateHash();
            this.nonce++;
        }

        console.log("Mining bitti Hash:" + this.hash);
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }

    createGenesisBlock(){
        const block = new Block("Genesis Block");
        block.timestamp = Date.parse("2015-05-01");
        block.hash = block.calculateHash();
        return block;
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(block){
        block.previousHash = this.getLatestBlock().hash;
        block.index = this.chain.length;
        block.mineBlock(this.difficulty);
        this.chain.push(block);
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

export {Block, BlockChain};