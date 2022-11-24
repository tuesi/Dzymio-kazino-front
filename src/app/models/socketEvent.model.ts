export class SocketEventModel {
    room: string;
    event: string;
    data: any;

    constructor(room: string, event: string, data: any) {
        this.room = room;
        this.event = event;
        this.data = data;
    }
};