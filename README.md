# Sendy

# Description

# Disclaimer: 
    - Se encaró el proyecto en 3 partes 
        - zk login (privacy)
        - back smart contract transferencia de crypto y mensaje con aprobación 
        - front para utilizacion de smart contracts e integracion con login

    - Tuvimos problemas con las ejecución y verificacion en scroll del contrato v1 
    - También problemas con la ejecucución y verificación de la versión superadora del contrato utilizando permit.
    - Logramos verificar un único contrato (un token de ejemplo con implementecion de permit)
    - Al no resolver los problemas de los contratos se nos truncó la intergación de las partes y el cierre completo del circuito del proyecto. 
    - Queda pendiente, fix del smart contract principal, e integración de las 3 partes.

# Track y Bounty
    Track: Privacy
    Bounty: Begginers Bounty - Scroll

# Instruccioneseguir pasos 
    FRONT: front/README.md
    ZKLOGIN:  zkAuthMessage/README.md
# Smart Contracts

 - 0xC2283D397A487D827D780ceB2C55418284bBD702 (https://sepolia.scrollscan.com/address/0xC2283D397A487D827D780ceB2C55418284bBD702) // Sendy Token (VERIFIED)
 - 0x761E874f641c17C5AB1D86144F03F902f4edCD14 (https://sepolia.scrollscan.com/address/0x761E874f641c17C5AB1D86144F03F902f4edCD14) // Condition Transfer V1, with extra auth (UNVERIFIED)
 - 0x8F0efdC1E4dAB65Fa91Ec938DCb0556f292D4410 (https://sepolia.scrollscan.com/address/0x8F0efdC1E4dAB65Fa91Ec938DCb0556f292D4410) // Condition Transfer V2, with permit (UNVERIFIED)
 - 0xA41a9328a091EE1D79b6c5726B0AAa7af30bdBAe (https://sepolia.scrollscan.com/address/0xA41a9328a091EE1D79b6c5726B0AAa7af30bdBAe) // Zk Login contract (UNVERIFIED)