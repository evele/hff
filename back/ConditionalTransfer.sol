// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConditionalTransfer {
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        bool exists;
    }

    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;

    event TransactionProposed(uint256 transactionId, address indexed sender, address indexed receiver, uint256 amount);
    event TransactionExecuted(uint256 transactionId, address indexed sender, address indexed receiver, uint256 amount);

    // Propose a transaction
    function proposeTransaction(address _receiver, uint256 _amount) external payable {
        require(msg.value == _amount, "The amount sent must match the transaction value");
        require(_receiver != msg.sender, "Cannot send funds to yourself");
        require(_amount > 0, "Amount must be greater than zero");

        transactionCount++;
        transactions[transactionCount] = Transaction({
            sender: msg.sender,
            receiver: _receiver,
            amount: _amount,
            exists: true
        });

        emit TransactionProposed(transactionCount, msg.sender, _receiver, _amount);
    }

    // Execute a transaction (authorization is implicit)
    function executeTransaction(uint256 _transactionId) external {
        Transaction storage txn = transactions[_transactionId];

        require(txn.exists, "Transaction does not exist");
        require(txn.receiver == msg.sender, "Only the receiver can execute this transaction");
        require(txn.amount > 0, "Invalid transaction");

        uint256 amount = txn.amount;
        address receiver = txn.receiver;
        address sender = txn.sender;

        // Mark transaction as completed
        txn.exists = false; 

        // Transfer funds
        payable(receiver).transfer(amount);

        emit TransactionExecuted(_transactionId, sender, receiver, amount);
    }
}
