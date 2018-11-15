import "mocha";
import "should";

import { defineActionGroup, defineAction } from "../src";
import { equal } from "should";
// import { Action } from "redux";

describe("defineActionGroup", () => {
    it("should be possible to create action group", () => {
        const group = defineActionGroup("TEST GROUP");
        group.should.be.not.empty();
    });

    it("should be possible to define action creators with action group", () => {
        const group = defineActionGroup<{ key: string }>("TEST GROUP");
        const groupAction = group.defineAction<{ id: number }>("GET BY ID");

        const action = groupAction({ id: 1, key: "a" });

        action.should.be.eql({
            id: 1,
            key: "a",
            type: groupAction.TYPE
        });
    });

    describe("should recognize", () => {
        it("actions created with group's action creators", () => {
            const group = defineActionGroup<{ key: string }>("TEST GROUP");
            const groupAction = group.defineAction<{ id: number }>("GET BY ID");

            const action = groupAction({ id: 1, key: "a" });

            group.isGroupAction(action).should.be.true();
            group.isExactlyGroupAction(action).should.be.true();
        });

        it("actions included in group", () => {
            const myAction = defineAction<{ id: Number }>("MY GROUP");
            const group = defineActionGroup<{ key: string }>("TEST GROUP").includeAction(myAction.is, a => ({
                key: `${a.id}`
            }));

            const action = myAction({ id: 1234 });

            group.isGroupAction(action).should.be.true();
            group.isExactlyGroupAction(action).should.be.true();
        });

        it("should NOT recognize other actions", () => {
            const group = defineActionGroup<{ key: string }>("TEST GROUP");

            const action = {
                type: "TEST ACTION FOREIGN"
            };

            group.isGroupAction(action).should.be.false();
            group.isExactlyGroupAction(action).should.be.false();
        });
    });

    describe("data extraction", () => {
        describe("should work", () => {
            it("with group action", () => {
                const group = defineActionGroup<{ key: string }>("TEST GROUP");
                const myAction = group.defineAction<{ id: number }>("MY ACTION");

                group.tryExtractData(myAction({ key: "a", id: 1 }))!.should.be.eql({
                    key: "a"
                });
            });

            it("with included action", () => {
                const myAction = defineAction<{ id: number }>("MY ACTION");

                const group = defineActionGroup<{ key: string }>("TEST GROUP").includeAction(myAction.is, a => ({
                    key: `${a.id}`
                }));

                group.tryExtractData(myAction({ id: 1 }))!.should.be.eql({ key: "1" });
            });
        });

        describe("should not work", () => {
            it("with other action", () => {
                const myAction = defineAction<{ id: number }>("MY ACTION");

                const group = defineActionGroup<{ key: string }>("TEST GROUP");

                equal(undefined, group.tryExtractData(myAction({ id: 1 })));
            });
        });
    });
});
