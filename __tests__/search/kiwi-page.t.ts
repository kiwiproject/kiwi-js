import {describe, it, expect} from '@jest/globals';
import {KiwiPage, KiwiSort} from "../../src";

describe('KiwiPage', () => {
  describe('of', () => {
    it('should create a new KiwiPage object with provided information', () => {
      const page = KiwiPage.of(1, 10, 100, [{ name: 'foo' }]);

      expect(page.content).toEqual([{ name: 'foo' }]);
      expect(page.size).toBe(10);
      expect(page.number).toBe(1);
      expect(page.numberOfElements).toBe(1);
      expect(page.totalPages).toBe(10);
      expect(page.totalElements).toBe(100);
      expect(page.sort).toBeUndefined();
      expect(page.pagingStartsWith).toBe(0)
    });

    it('should throw exception if pageNum is negative', () => {
      expect(() => {
        KiwiPage.of(-1, 10, 100, []);
      }).toThrow('IllegalStateException: value must be positive or zero');
    });

    it('should throw exception if limit is negative', () => {
      expect(() => {
        KiwiPage.of(1, -1, 100, []);
      }).toThrow('IllegalStateException: value must be a positive number');
    });

    it('should throw exception if limit is zero', () => {
      expect(() => {
        KiwiPage.of(1, 0, 100, []);
      }).toThrow('IllegalStateException: value must be a positive number');
    });

    it('should throw exception if total is negative', () => {
      expect(() => {
        KiwiPage.of(10, 10, -1, []);
      }).toThrow('IllegalStateException: value must be positive or zero');
    });

    it('should throw exception if contentList is undefined', () => {
      expect(() => {
        KiwiPage.of(10, 10, 100, undefined);
      }).toThrow('IllegalArgumentException');
    });
  });

  describe('addKiwiSort', () => {
    it('should set the sort on the KiwiPage', () => {
      const page = KiwiPage.of(10, 1, 100, []);
      page.addKiwiSort(KiwiSort.ofAscending('name'));

      expect(page.sort).toEqual({ property: 'name', ascending: true, direction: 'ASC', ignoreCase: false});
    });
  });

  describe('addSupplementaryData', () => {
    it('should set the supplementary data on the KiwiPage', () => {
      const page = KiwiPage.of(10, 1, 100, []);
      page.addSupplementaryData({ aggregations: {} });

      expect(page.supplementaryData).toEqual({ aggregations: {}});
    });
  });

  describe('usingZeroAsFirstPage', () => {
    it('should set pagingStartsWith to zero', () => {
      const page = KiwiPage.of(10, 1, 100, []);
      page.usingZeroAsFirstPage();

      expect(page.pagingStartsWith).toEqual(0);
    });
  });

  describe('usingOneAsFirstPage', () => {
    it('should set pagingStartsWith to one', () => {
      const page = KiwiPage.of(10, 1, 100, []);
      page.usingOneAsFirstPage();

      expect(page.pagingStartsWith).toEqual(1);
    });
  });

  describe('isFirst', () => {
    it('should return true if pageNum is first page', () => {
      const page = KiwiPage.of(0, 1, 100, []);

      expect(page.isFirst()).toEqual(true);
    });

    it('should return false if pageNum is not first page', () => {
      const page = KiwiPage.of(5, 1, 100, []);

      expect(page.isFirst()).toEqual(false);
    });
  });

  describe('isLast', () => {
    it('should return true if pageNum is last page', () => {
      const page = KiwiPage.of(9, 10, 100, []);

      expect(page.isLast()).toEqual(true);
    });

    it('should return false if pageNum is not last page', () => {
      const page = KiwiPage.of(5, 10, 100, []);

      expect(page.isLast()).toEqual(false);
    });
  });

  describe('isSorted', () => {
    it('should return true if page is sorted', () => {
      const page = KiwiPage.of(9, 10, 100, []);
      page.addKiwiSort(KiwiSort.ofDescending('name'))

      expect(page.isSorted()).toEqual(true);
    });

    it('should return false if page is not sorted', () => {
      const page = KiwiPage.of(5, 10, 100, []);

      expect(page.isSorted()).toEqual(false);
    });
  });
});
