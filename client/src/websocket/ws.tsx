import io from 'socket.io-client';

const ENDPOINT = "http://localhost:8080";

class Ws {
    socket: SocketIOClient.Socket;
    ready: boolean

    constructor(handlerReady: any) {
        this.socket = io(ENDPOINT)
        this.ready = false

        this.socket.on("connect", () => {
            handlerReady();
        })
    }

    login(username: string, password: string) {
        this.socket.emit("LOGIN_REQUEST", { username: username, password: password })
    }

    joinRoom(roomName: string) {
        this.socket.emit("JOIN_ROOM_REQUEST", { name: roomName })
    }

    sendToRoom(roomName: string, msg: string) {
        this.socket.emit("MESSAGE_ROOM_REQUEST", { room_name: roomName, msg: msg })
    }

    addListener(path: string, handler: any) {
        this.socket.on(path, (newData: any) => {
            handler(newData);
        })
    }

    emit(path: string, data: any) {
        this.socket.emit(path, data)
    }
}

export default Ws;