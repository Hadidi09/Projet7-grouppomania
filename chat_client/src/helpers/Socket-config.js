import io from 'socket.io-client'


const EndPoint = 'localhost:8000/'

const Socket = io(EndPoint, {
    transports: ['websocket', 'polling', 'flashsocket']
})
  
export default Socket;