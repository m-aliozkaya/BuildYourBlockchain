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
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
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
        block.hash = block.calculateHash();
        block.index = this.chain.length;
        this.chain.push(block);
    }
}

export {Block, BlockChain};