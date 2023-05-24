import { describe, it, expect } from '@jest/globals';
import {ErrorMessage} from "../../src";

describe('ErrorMessage', () => {
  describe('toMap', () => {
    it('should convert error message to a json map', () => {
      const errorMessage = new ErrorMessage(404, 'Item not found');
      const jsonMap = errorMessage.toMap();

      expect(jsonMap).toEqual({ message: 'Item not found', code: 404, fieldName: '', itemId: ''});
    });
  });
});
