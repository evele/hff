// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConditionalTransfer {
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        bool isAuthorized;
    }

    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;

    event TransactionProposed(uint256 transactionId, address indexed sender, address indexed receiver, uint256 amount);
    event TransactionAuthorized(uint256 transactionId, address indexed receiver);
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
            isAuthorized: false
        });

        emit TransactionProposed(transactionCount, msg.sender, _receiver, _amount);
    }

    // Authorize a transaction
    function authorizeTransaction(uint256 _transactionId) external {
        Transaction storage txn = transactions[_transactionId];
        
        require(txn.receiver == msg.sender, "Only the receiver can authorize this transaction");
        require(!txn.isAuthorized, "Transaction has already been authorized");
        require(txn.amount > 0, "Invalid transaction");

        txn.isAuthorized = true;

        emit TransactionAuthorized(_transactionId, msg.sender);
    }

    // Execute an authorized transaction
    function executeTransaction(uint256 _transactionId) external {
        Transaction storage txn = transactions[_transactionId];

        require(txn.isAuthorized, "Transaction is not authorized");
        require(txn.amount > 0, "Invalid transaction");

        uint256 amount = txn.amount;
        address receiver = txn.receiver;
        address sender = txn.sender;

        txn.amount = 0; // Prevent reentrancy

        payable(receiver).transfer(amount);

        emit TransactionExecuted(_transactionId, sender, receiver, amount);
    }
}
