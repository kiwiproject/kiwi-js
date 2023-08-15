import { describe, it, expect } from "@jest/globals";
import { KiwiSort } from "../../src";

describe("KiwiSort", () => {
  describe("ofAscending", () => {
    it("should create KiwiSort defaulted to ascending", () => {
      const sort = KiwiSort.ofAscending("name");
      expect(sort).toEqual({
        property: "name",
        ascending: true,
        direction: "ASC",
        ignoreCase: false,
      });
    });
  });

  describe("ofDescending", () => {
    it("should create KiwiSort defaulted to descending", () => {
      const sort = KiwiSort.ofDescending("name");
      expect(sort).toEqual({
        property: "name",
        ascending: false,
        direction: "DESC",
        ignoreCase: false,
      });
    });
  });

  describe("of", () => {
    it("should create KiwiSort with given values", () => {
      const sort = KiwiSort.of("name", "ASC");
      expect(sort).toEqual({
        property: "name",
        ascending: true,
        direction: "ASC",
        ignoreCase: false,
      });
    });

    it("should throw an exception when property is null", () => {
      expect(() => {
        KiwiSort.of(null, "ASC");
      }).toThrow("IllegalArgumentException");
    });

    it("should throw an exception when property is undefined", () => {
      expect(() => {
        KiwiSort.of(undefined, "ASC");
      }).toThrow("IllegalArgumentException");
    });

    it("should throw an exception when property is blank", () => {
      expect(() => {
        KiwiSort.of("", "ASC");
      }).toThrow("IllegalArgumentException");
    });

    it("should throw an exception when direction is null", () => {
      expect(() => {
        KiwiSort.of("name", null);
      }).toThrow("IllegalArgumentException");
    });

    it("should throw an exception when direction is undefined", () => {
      expect(() => {
        KiwiSort.of("name", undefined);
      }).toThrow("IllegalArgumentException");
    });

    it("should throw an exception when direction is blank", () => {
      expect(() => {
        KiwiSort.of("name", "");
      }).toThrow("IllegalArgumentException");
    });
  });

  describe("isDescending", () => {
    it("should return true when sort is descending", () => {
      const sort = KiwiSort.ofDescending("name");
      expect(sort.isDescending()).toBe(true);
    });

    it("should return false when sort is ascending", () => {
      const sort = KiwiSort.ofAscending("name");
      expect(sort.isDescending()).toBe(false);
    });
  });
});
