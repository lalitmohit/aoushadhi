import {add} from "../controllers/user/userController.js";

describe('userController.js', function() {
    test("add two numbers", function() {
        expect(add(1,2)).toBe(3);
    })
})