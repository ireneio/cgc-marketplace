window.solchick = {
    connect,
	solflareConnect,
    connectedAccount: "",
    solflareAccount: "",
    claim,
    claimResult: 0,
};


async function connect() {
    try {
        const provider = await window.solana.connect();
        window.solchick.connectedAccount = provider.publicKey.toString();
        console.log(window.solana);
        //console.log(window.solchick);
    } catch (err) {
        console.log(err); // { code: 4001, message: 'User rejected the request.' }
    }

    window.solana.on("connect", () => { console.log("connected!"); });
}

async function solflareConnect() {
	try {
        await window.solflare.connect();
        window.solchick.solflareAccount = window.solflare.publicKey.toString();
	} catch (err) {
		console.log(err);
	}
	
	window.solflare.on("connect", () => { console.log("connected!"); });
}

async function claim() {
    try {
        claimResult = 0;
        await useClaim.claim();
        claimResult = 1;
    } catch (err) {
        console.log(err);
    }
}
