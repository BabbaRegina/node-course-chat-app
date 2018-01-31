[{
    id: '/sdf234rfs',
    name: 'Irene',
    room: 'A'
}]

class Users {
    // costruttore
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var newUser = {
            id,
            name,
            room
        };
        this.users.push(newUser);
        return this.users;
    }

    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser(id) {
        var users = this.users.filter((user) => user.id === id);
        return users[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room.toUpperCase() === room.toUpperCase());
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
};

module.exports = {
    Users
};