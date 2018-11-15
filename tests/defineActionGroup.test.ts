import "mocha";
import "should";

import { defineActionGroup } from "../src";
// import { Action } from "redux";

describe("defineActionGroup", () => {
    it("should be possible to create action group", () => {
        const group = defineActionGroup("TEST GROUP");
        group.should.be.not.empty();
    });

    it("should be possible to define action creators with action group", () => {
        const group = defineActionGroup("TEST GROUP");
        const groupAction = group.defineAction<{ id: number }>("GET BY ID");

        const action = groupAction({ id: 1 });

        action.should.be.eql({
            id: 1,
            type: groupAction.TYPE
        });
    });

    it("actions created by group's action creator should be recognized by group", () => {
        const group = defineActionGroup("TEST GROUP");
        const groupAction = group.defineAction<{ id: number }>("GET BY ID");

        const action = groupAction({ id: 1 });

        group.isGroupAction(action).should.be.true();
        group.isExactlyGroupAction(action).should.be.true();
    });
});
