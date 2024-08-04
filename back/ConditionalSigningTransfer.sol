// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ADDRESS: 0x8F0efdC1E4dAB65Fa91Ec938DCb0556f292D4410
// Interfaz ERC20 con la función permit
interface IERC20Permit {
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function nonces(address owner) external view returns (uint256);
}

contract TokenTransferWithPermit {
    mapping(bytes32 => bool) public executedTransactions;

    event TransactionExecuted(address indexed sender, address indexed receiver, uint256 amount, address token);

    // Execute a token transaction with a signature from the sender
    function executeTransaction(
        address _tokenAddress,
        address _sender,
        address _receiver,
        uint256 _amount,
        uint256 _deadline,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) external {
        // Crear una instancia del contrato de token
        IERC20Permit token = IERC20Permit(_tokenAddress);

        // Generar un ID de transacción
        bytes32 transactionId = keccak256(abi.encodePacked(_tokenAddress, _sender, _receiver, _amount, _deadline));

        // Asegurarse de que la transacción no se haya ejecutado aún
        require(!executedTransactions[transactionId], "Transaction already executed");

        // Usar permit para aprobar la transferencia
        token.permit(_sender, address(this), _amount, _deadline, _v, _r, _s);

        // Marcar la transacción como ejecutada
        executedTransactions[transactionId] = true;

        // Transferir tokens
        require(token.transferFrom(_sender, _receiver, _amount), "Token transfer failed");

        emit TransactionExecuted(_sender, _receiver, _amount, _tokenAddress);
    }
}
