const expect = require('expect');
const {Users} = require('./Users');

describe('Users test cases', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{id: 1, name: 't', room: 'a'}, {id: 2, name: 'x', room: 'a'}, {id: 3, name: 'z', room: 'b'}]
    });


    it('should add user', () => {
        const users = new Users();
        const user = {id: 1, name: 't', room: 'a'};
        const re = users.addUser(user.id, user.name, user.room);
        expect(re.id).toBe(user.id);
        expect(users.users.length).toBe(1);
        expect(users.users).toEqual([user]);
    });

    it('should remove user', () => {
        users.removeUser(1);
        expect(users.users.length).toBe(2);
    });

    it('should get user', () => {
        const user = users.getUser(2);
        expect(user.id).toBe(2);
        expect(user.name).toBe('x');
    });

    it('should get user list', () => {
        const list = users.getUserList('a');
        expect(list).toEqual(['t', 'x']);
    });
});