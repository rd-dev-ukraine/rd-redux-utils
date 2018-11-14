import "mocha";
import "should";

import { defineAction } from "../src";
import { Action } from "redux";

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

    it("should shrink action of own type", () => {
        const testAction = defineAction<{ data: string; value: number }>("test action");

        const instance: Action = testAction({ data: "abc", value: 111 });

        testAction.is(instance).should.be.true();
    });

    it("should not shrink action of other type", () => {
        const testAction = defineAction<{ data: string; value: number }>("test action");

        const instance: Action = { type: "SOME ACTION TYPE" };

        testAction.is(instance).should.be.false();
    });

    it("should not shrink nullish instance", () => {
        const testAction = defineAction<{ data: string; value: number }>("test action");

        testAction.is(undefined).should.be.false();
    });
});
