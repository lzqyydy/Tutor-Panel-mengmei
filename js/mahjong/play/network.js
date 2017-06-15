import { Unit } from '../../structures.js';

var network = new Unit();


network.onNotify = function(source, event, param){
  switch(event){
    case 'inputReady':
      network.socket.emit('ready');
      break;
    case 'inputOperation':
      network.socket.emit('operation', param, function(){
        network.notify('objects', 'inputOperation');
      });
      break;
    case 'inputDiscard':
      network.socket.emit('discard', param, function(){
        network.notify('game', 'inputDiscard', param);
      });
      break;
    case 'socketStart'    :
    case 'socketDraw'     :
    case 'socketDiscard'  :
    case 'socketOperation':
    case 'socketFuro'     :
    case 'socketRoundEnd' :
    case 'socketGameEnd'  :
      network.notify(null, event, param);
      break;
  }
};
export { network as default };