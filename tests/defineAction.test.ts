import "mocha";
import "should";

import { defineAction } from "../src";

describe("defineAction", () => {
    it("should create action with specified field", () => {
        const testAction = defineAction<{ data: string; value: number }>("test action");

        testAction({ data: "abc", value: 1111 }).should.be.eql({
            type: "RD : TEST ACTION",
            data: "abc",
            value: 1111
        });
    });

    it("should override type with action type", () => {
        const testAction = defineAction<{ data: string; value: number; type: string }>("test action");

        testAction({
            data: "abc",
            value: 1111,
            type: "broken action type"
        }).should.be.eql({ type: "RD : TEST ACTION", data: "abc", value: 1111 });
    });
});
