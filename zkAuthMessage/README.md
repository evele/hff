# zkAuthMessenger
Mejorar
Este proyecto permite la autenticación y envío de mensajes encriptados utilizando carteras de Ethereum. A continuación, se detallan los pasos para configurar y ejecutar la aplicación:
Este proyecto permite la autenticación y envío de mensajes encriptados utilizando carteras de Ethereum. A continuación, se detallan los pasos para configurar y ejecutar la aplicación:

### 1. Configuración del Entorno

1. **Instalar Node.js**:
    
    - Asegúrate de tener Node.js instalado en tu computadora. Puedes descargarlo desde [Node.js](https://nodejs.org/).
2. **Crear el Proyecto**:
    
    - Crea un nuevo directorio para tu proyecto y navega a él en la terminal:
        
        `mkdir zk-auth-messenger cd zk-auth-messenger`
        
3. **Inicializar el Proyecto Node.js**:
    
    - Inicializa un nuevo proyecto Node.js:
        
        `npm init -y`
        
4. **Instalar Dependencias**:
    
    - Instala las dependencias necesarias:
        
        `npm install web3 web3modal ethers`
        

### 2. Configuración de Remix y Despliegue del Contrato

1. **Abrir Remix**:
    
    - Abre Remix en tu navegador: [Remix IDE](https://remix.ethereum.org/).
2. **Crear y Compilar el Contrato**:
    
    - Crea un nuevo archivo llamado `ZKAuthMessenger.sol` y copia el código del contrato inteligente.
    - Compila el contrato en Remix.
3. **Desplegar el Contrato**:
    
    - Despliega el contrato en la red de prueba de tu elección (por ejemplo, Scroll Sepolia Testnet).
    - Asegúrate de tener ETH de prueba en tu wallet.
    - Copia la dirección del contrato y el ABI generado una vez desplegado.

### 3. Configuración del Código JavaScript

1. **Crear el Archivo JavaScript**:
    
    - Crea un nuevo archivo llamado `app.js` en tu directorio del proyecto y pega el código JavaScript que interactúa con los elementos del HTML.
2. **Actualizar Direcciones y ABI**:
    
    - Reemplaza `contractAddress` con la dirección de tu contrato desplegado.
    - Reemplaza `contractABI` con el ABI generado por Remix.

### 4. Configuración para Usar Módulos ES6

1. **Actualizar `package.json`**:
    - Abre el archivo `package.json` y añade la siguiente línea:
        
        `"type": "module"`
        
    - Esto permitirá usar importaciones ES6 en tu script.

### 5. Creación de un Archivo HTML Básico

1. **Crear el Archivo HTML**:
    - Crea un archivo `index.html` en tu directorio del proyecto con el contenido necesario para la interfaz de usuario.

### 6. Ejecución de la Aplicación

1. **Instalar un Servidor Local**:
    
    - Instala un servidor local simple:
        
        `npm install -g http-server`
        
2. **Ejecutar el Servidor**:
    
    - Ejecuta el servidor:
        
        `http-server`
        
3. **Abrir la Aplicación en el Navegador**:
    
    - Abre tu navegador y ve a `http://localhost:8080`.

### 7. Uso de la Aplicación

1. **Conectar la Wallet**:
    
    - Asegúrate de estar en la red correcta, como Scroll Sepolia Testnet.
2. **Registrar y Autenticar Usuarios**:
    
    - Registra tu correo electrónico y autentícate usando el mismo correo.
3. **Enviar y Recibir Mensajes**:
    
    - Envía mensajes a otras direcciones.
    - Obtén y responde a tus mensajes.

### Notas Adicionales

- Recuerda que esta es una aplicación de prueba y no debe usarse en un entorno de producción sin las debidas medidas de seguridad y optimización.
- Asegúrate de tener ETH de prueba en tu wallet para pagar las transacciones en la red de prueba.

#### Aplicamos a bounty
La categoría a la que aplicamos


#### Dirección de contratos verificados

Hasta donde llegamos y que falta:

Sistema de evaluacion:
Creatividad innovacion
Impacto y adopcion
Experiencia de usuario
Calidad tecnica
Presentacion