import {describe, it, expect} from '@jest/globals';
import { KiwiPreconditions } from "../../src";

describe('KiwiPreconditions', () => {
  describe('checkPositiveOrZero', () => {
    it('should throw an exception when given a negative number using the default message', () => {
      expect(() => {
        KiwiPreconditions.checkPositiveOrZero(-1);
      }).toThrow('IllegalStateException: value must be positive or zero');
    });

    it('should throw an exception when given a negative number using a custom message', () => {
      expect(() => {
        KiwiPreconditions.checkPositiveOrZero(-1, 'not cool man');
      }).toThrow('IllegalStateException: not cool man');
    });

    it('should not throw an exception when given a positive number', () => {
      expect(() => {
        KiwiPreconditions.checkPositiveOrZero(1);
      }).not.toThrow();
    });

    it('should not throw an exception when given a zero', () => {
      expect(() => {
        KiwiPreconditions.checkPositiveOrZero(0);
      }).not.toThrow();
    });
  });

  describe('checkState', () => {
    it('should throw an exception when false', () => {
      expect(() => {
        KiwiPreconditions.checkState(false, 'my error message');
      }).toThrow('IllegalStateException: my error message');
    });

    it('should not throw an exception when true', () => {
      expect(() => {
        KiwiPreconditions.checkState(true, 'my error message');
      }).not.toThrow();
    });
  });

  describe('checkPositive', () => {
    it('should throw an exception when given a negative number using the default message', () => {
      expect(() => {
        KiwiPreconditions.checkPositive(-1);
      }).toThrow('IllegalStateException: value must be a positive number');
    });

    it('should throw an exception when given a negative number using a custom message', () => {
      expect(() => {
        KiwiPreconditions.checkPositive(-1, 'not cool man');
      }).toThrow('IllegalStateException: not cool man');
    });

    it('should not throw an exception when given a positive number', () => {
      expect(() => {
        KiwiPreconditions.checkPositive(1);
      }).not.toThrow();
    });

    it('should throw an exception when given a zero using the default message', () => {
      expect(() => {
        KiwiPreconditions.checkPositive(0);
      }).toThrow('IllegalStateException: value must be a positive number');
    });
  });

  describe('checkArgumentDefined', () => {
    it('should throw an exception when argument is undefined', () => {
      expect(() => {
        KiwiPreconditions.checkArgumentDefined(undefined);
      }).toThrow('IllegalArgumentException');
    });

    it('should throw an exception when argument is null', () => {
      expect(() => {
        KiwiPreconditions.checkArgumentDefined(null);
      }).toThrow('IllegalArgumentException');
    });

    it('should not throw an exception when argument is defined and not null', () => {
      expect(() => {
        KiwiPreconditions.checkArgumentDefined('sample');
      }).not.toThrow();
    });
  });

  describe('checkArgument', () => {
    it('should throw an exception when false', () => {
      expect(() => {
        KiwiPreconditions.checkArgument(false);
      }).toThrow('IllegalArgumentException');
    });

    it('should not throw an exception when true', () => {
      expect(() => {
        KiwiPreconditions.checkArgument(true);
      }).not.toThrow();
    });
  });
});
