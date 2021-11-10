import anyTypeSocket from './any';
const jsonSocket = new Rete.Socket('JSON value');
jsonSocket.combineWith(anyTypeSocket);
export default jsonSocket;
