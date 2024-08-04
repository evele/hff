import Web3Modal from "web3modal";
import Web3 from "web3";
import { ethers } from "ethers";

const contractABI = [[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "accepted",
				"type": "bool"
			}
		],
		"name": "MessageResponded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "MessageSent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_emailHash",
				"type": "bytes32"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_messageIndex",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_accept",
				"type": "bool"
			}
		],
		"name": "respondToMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_encryptedContent",
				"type": "string"
			}
		],
		"name": "sendMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_proof",
				"type": "bytes32"
			}
		],
		"name": "authenticate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyMessages",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "recipient",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "encryptedContent",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isPending",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isAccepted",
						"type": "bool"
					}
				],
				"internalType": "struct ZKAuthMessenger.Message[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]];
const contractAddress = "0xA41a9328a091EE1D79b6c5726B0AAa7af30bdBAe"; // Dirección del contrato desplegado

let web3, contract, userAddress;

async function connectWallet() {
    const providerOptions = {};
    const web3Modal = new Web3Modal({
        network: "Scroll Sepolia Testnet", // O la red que estés usando
        cacheProvider: true,
        providerOptions
    });

    const provider = await web3Modal.connect();
    web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];

    contract = new web3.eth.Contract(contractABI, contractAddress);

    console.log("Wallet conectada:", userAddress);
    document.getElementById('app').style.display = 'block';
}

async function registerUser() {
    const email = document.getElementById('emailInput').value;
    const emailHash = web3.utils.soliditySha3(email);
    await contract.methods.register(emailHash).send({ from: userAddress });
    console.log("Usuario registrado");
}

async function authenticateUser() {
    const email = document.getElementById('emailInput').value;
    const proof = web3.utils.soliditySha3(email);
    const isAuthenticated = await contract.methods.authenticate(proof).call({ from: userAddress });
    console.log("Autenticación:", isAuthenticated);
    alert(isAuthenticated ? "Autenticación exitosa" : "Autenticación fallida");
}

async function sendMessage() {
    const toAddress = document.getElementById('recipientAddress').value;
    const content = document.getElementById('messageContent').value;
    const encryptedContent = ethers.utils.formatBytes32String(content);
    await contract.methods.sendMessage(toAddress, encryptedContent).send({ from: userAddress });
    console.log("Mensaje enviado");
}

async function getMyMessages() {
    const messages = await contract.methods.getMyMessages().call({ from: userAddress });
    console.log("Mis mensajes:", messages);
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';
    messages.forEach((msg, index) => {
        const msgElement = document.createElement('div');
        msgElement.textContent = `De: ${msg.sender}, Contenido: ${ethers.utils.parseBytes32String(msg.encryptedContent)}`;
        const respondButton = document.createElement('button');
        respondButton.textContent = 'Responder';
        respondButton.onclick = () => respondToMessage(index, true);
        msgElement.appendChild(respondButton);
        messagesList.appendChild(msgElement);
    });
}

async function respondToMessage(messageIndex, accept) {
    await contract.methods.respondToMessage(messageIndex, accept).send({ from: userAddress });
    console.log("Respuesta enviada");
    getMyMessages();
}

document.getElementById('connectWallet').addEventListener('click', connectWallet);
document.getElementById('register').addEventListener('click', registerUser);
document.getElementById('authenticate').addEventListener('click', authenticateUser);
document.getElementById('sendMessage').addEventListener('click', sendMessage);
document.getElementById('getMessages').addEventListener('click', getMyMessages);