import { ethers } from "ethers";

async function main() {
    // Conectar a MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Solicitar acceso a las cuentas de MetaMask
    const signer = provider.getSigner();

    const walletAddress = await signer.getAddress();
    console.log("Sender Address:", walletAddress);

    // Detalles de la transacción
    const tokenAddress = "0xC2283D397A487D827D780ceB2C55418284bBD702"; // Dirección del token LINK en Sepolia
    // TODO: creo que acá en el spender hay un problema
    // const spender = "0x8F0efdC1E4dAB65Fa91Ec938DCb0556f292D4410"; // Dirección del contrato que manejará el gasto
    const spender = "0x023f20a018dbB5995Ea428e3E3f6498740C9F23C"; // Dirección del contrato que manejará el gasto
    const amount = ethers.utils.parseUnits("10", 18); // 10 LINK (asumiendo 18 decimales)
    
    // Crear una instancia del contrato de token
    const tokenContract = new ethers.Contract(tokenAddress, [
        "function nonces(address owner) view returns (uint256)"
    ], signer);

    const nonce = await tokenContract.nonces(walletAddress); // Obtener el nonce del contrato de tokens
    const deadline = Math.floor(Date.now() / 1000) + 3600; // Una hora desde ahora
    const receiver = "0x023f20a018dbB5995Ea428e3E3f6498740C9F23C"; // Reemplaza con la dirección del receptor

    const domain = {
        name: 'ChainLink', // Nombre del token
        version: '1',
        chainId: (await provider.getNetwork()).chainId,
        verifyingContract: tokenAddress,
    };

    const types = {
        Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' },
            { name: 'receiver', type: 'address' }
        ],
    };

    const value = {
        owner: walletAddress,
        spender: spender,
        value: amount,
        nonce: nonce,
        deadline: deadline,
        receiver: receiver
    };

    // Firmar el mensaje de permiso
    const signature = await signer._signTypedData(domain, types, value);
    const { v, r, s } = ethers.utils.splitSignature(signature);

    console.log("Nonce:", nonce);
    console.log("Deadline:", deadline);
    console.log("Signature:", signature);
    console.log("Amount", amount);
    console.log("v:", v);
    console.log("r:", r);
    console.log("s:", s);
}

// Ejecutar la función main
main().catch((error) => {
    console.error("Error:", error);
});
