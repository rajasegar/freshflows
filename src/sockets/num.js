import anyTypeSocket from './any';
const numSocket = new Rete.Socket('Number value');
numSocket.combineWith(anyTypeSocket);
export default numSocket;
