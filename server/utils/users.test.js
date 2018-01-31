const expect = require('expect');

var {
    Users
} = require('./users');

describe('Users class', () => {

    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
                id: 1,
                name: 'Irene',
                room: 'A'
            },
            {
                id: 2,
                name: 'Lucia',
                room: 'B'
            },
            {
                id: 3,
                name: 'Serena',
                room: 'A'
            },
        ];
    });


    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Irene',
            room: 'A'
        };
        var res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return list of users in room A', () => {
        var userList = users.getUserList('A');
        expect(userList).toEqual(['Irene', 'Serena']);
    });

    it('should return list of users in room B', () => {
        var userList = users.getUserList('B');
        expect(userList).toEqual(['Lucia']);
    });
    
    it('should remove a user', () => {
        var id = 2;
        var userListA = users.getUserList('A');
        var userListB = users.getUserList('B');
        var numberOfUsers = userListA.length + userListB.length;
        var updateArray = users.removeUser(id);
        expect(updateArray.length).toEqual(numberOfUsers-1);
        expect(updateArray).toExclude({id});
    });

    it('should NOT remove a user', () => {
        var id = 6;
        var userListA = users.getUserList('A');
        var userListB = users.getUserList('B');
        var numberOfUsers = userListA.length + userListB.length;
        var updateArray = users.removeUser(id);
        expect(updateArray.length).toEqual(numberOfUsers);
    });

    it('should find user', () => {
        var id = 1;
        var user = users.getUser(id);
        expect(user.id).toBe(id);
    });

    it('should NOT find user', () => {
        var id = 8;
        var user = users.getUser(id);
        expect(user).toNotExist();
    });

    
});