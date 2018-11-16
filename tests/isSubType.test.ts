import "mocha";
import "should";
import { isSubType } from "../src/action-utils/actionTypeUtils";

describe("isSubType", () => {
    it("should match on exact match", () => {
        isSubType("A : B", "A : B").should.eql("match");
    });

    it("should not match on not matched", () => {
        isSubType("A : B", "A : C").should.be.false();
    });

    it("should correctly match child", () => {
        isSubType("A : B", "A : B : C").should.eql("child");
    });

    it("should correctly match grand child", () => {
        isSubType("A : B", "A : B : C : D").should.eql("grandchild");
    });

    it("should be false if parent type shorter than type", () => {
        isSubType("A : B : C", "A : B").should.be.false();
    });
});
