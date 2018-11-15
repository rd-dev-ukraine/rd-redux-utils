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

    describe("action recognition", () => {
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
        });

        describe("should not recognize", () => {
            it("other actions", () => {
                const group = defineActionGroup<{ key: string }>("TEST GROUP");

                const action = {
                    type: "TEST ACTION FOREIGN"
                };

                group.isGroupAction(action).should.be.false();
                group.isExactlyGroupAction(action).should.be.false();
            });
        });

        describe("for nested groups", () => {
            it("parent should recognize actions of child groups", () => {
                const group = defineActionGroup<{ key: string }>("PARENT");
                const child = group.defineActionGroup<{ childId: string }>("CHILD");

                const myAction = child.defineAction<{ value: number }>("MY ACTION");

                const action = myAction({ key: "a", childId: "1", value: 100 });

                group.isGroupAction(action).should.be.true();
                group.isExactlyGroupAction(action).should.be.false();
            });

            it("child should not recognize actions of child groups", () => {
                const group = defineActionGroup<{ key: string }>("PARENT");
                const child = group.defineActionGroup<{ childId: string }>("CHILD");

                const myAction = group.defineAction<{ value: number }>("MY ACTION");

                const action = myAction({ key: "a", value: 100 });

                child.isGroupAction(action).should.be.false();
                child.isExactlyGroupAction(action).should.be.false();
            });

            it("parent should recognize actions included to child groups", () => {
                const myAction = defineAction<{ value: number }>("MY ACTION");

                const group = defineActionGroup<{ key: string }>("PARENT");
                group
                    .defineActionGroup<{ childId: string }>("CHILD")
                    .includeAction(myAction.is, a => ({ key: "test", childId: `${a.value}` }));

                const action = myAction({ value: 100 });

                group.isGroupAction(action).should.be.true();
                group.isExactlyGroupAction(action).should.be.false();
            });

            it("child should not recognize actions included to parent groups", () => {
                const myAction = defineAction<{ value: number }>("MY ACTION");

                const group = defineActionGroup<{ key: string }>("PARENT").includeAction(myAction.is, a => ({
                    key: `${a.value}`
                }));

                const child = group.defineActionGroup<{ childId: string }>("CHILD");

                const action = myAction({ value: 100 });

                child.isGroupAction(action).should.be.false();
                child.isExactlyGroupAction(action).should.be.false();
            });
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

        describe("for nested groups", () => {
            it("parent should extract data from child actions", () => {
                const parent = defineActionGroup<{ parentId: number }>("PARENT");
                const child = parent.defineActionGroup<{ childId: number }>("CHILD");

                const myAction = child.defineAction<{ value: number }>("MY ACTION");

                const action = myAction({ parentId: 1, childId: 100, value: 555 });

                const data = parent.tryExtractData(action);

                data.should.be.containDeep({
                    parentId: 1
                });
            });

            it("child should not extract data for parent actions", () => {
                const parent = defineActionGroup<{ parentId: number }>("PARENT");
                const child = parent.defineActionGroup<{ childId: number }>("CHILD");

                const myAction = parent.defineAction<{ value: number }>("MY ACTION");

                const action = myAction({ parentId: 1, value: 555 });

                const data = child.tryExtractData(action);

                equal(data, undefined);
            });

            it("parent should extract data from actions included in child", () => {
                const myAction = defineAction<{ value: number }>("MY ACTION");

                const parent = defineActionGroup<{ parentId: number }>("PARENT");

                parent
                    .defineActionGroup<{ childId: number }>("CHILD")
                    .includeAction(myAction.is, a => ({ childId: a.value, parentId: a.value }));

                const action = myAction({ value: 555 });

                const data = parent.tryExtractData(action);

                data.should.be.containDeep({ parentId: 555 });
            });
        });
    });
});
