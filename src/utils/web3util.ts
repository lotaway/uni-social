import Web3Utils from "web3-utils";
import Web3 from "web3";

class BlockChain extends Web3 {

	web3: Web3 | null = null;

	constructor(...params: any) {
		// @ts-ignore
		super(...params);
	}

	init(provider?: string) {
		if (this.web3 !== null) {
			this.web3 = new BlockChain((this.web3 as Web3).currentProvider);
		}
		//	#ifdef H5
		else if ((<any>window).ethereum) {
			//	using MetaMask
			this.web3 = new BlockChain((<any>window).ethereum);
		}
		//	#endif
		else {
			this.web3 = new BlockChain(new BlockChain.providers.HttpProvider(provider || BlockChain.givenProvider));
		}

		return this.web3;
	}

}

export {BlockChain, Web3Utils};