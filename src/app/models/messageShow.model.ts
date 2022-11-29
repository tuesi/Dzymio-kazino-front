export class MessageShowModel {
    avatar: string;
    username: string;
    message: string;

    constructor(avatar: string, username: string, message: string) {
        this.avatar = avatar;
        this.username = username;
        this.message = message;
    }
};