import { Dictionary } from 'App/Common/Collections/Dictionary';

/********************************************************************************************************************************************************
 * This is legacy test code and may not follow our testing guidelines and best practices - Be careful when you search for something to copy + paste
 ********************************************************************************************************************************************************/

describe('Dictionary', () => {
  describe('set()', () => {
    it('should associate a key with a value', () => {
      var dictionary = new Dictionary<number, string>();
      dictionary.set(1, 'One');
      dictionary.set(2, 'Two');

      expect(dictionary.get(1)).toEqual('One');
      expect(dictionary.get(2)).toEqual('Two');
    });

    it('should associate a key (of any type) with a value (of any type)', () => {
      var key1 = { id: 'key1' };
      var key2 = { id: 'key2' };

      var value1 = { id: 'value1' };
      var value2 = { id: 'value2' };

      var dictionary = new Dictionary<{ id: string }, { id: string }>();
      dictionary.set(key1, value1);
      dictionary.set(key2, value2);

      expect(dictionary.get(key1)).toEqual(value1);
      expect(dictionary.get(key2)).toEqual(value2);
    });
  });

  describe('get()', () => {
    it('should throw an error if the given key is not present in the dictionary', () => {
      var dictionary = new Dictionary<number, string>();
      dictionary.set(1, 'One');
      dictionary.set(2, 'Two');

      expect(() => dictionary.get(3)).toThrow('The given key was not present in the dictionary. The key was: "3".');
    });
  });

  describe('get()', () => {
    it('should compare keys by reference and not by value', () => {
      var key1 = { id: 'key1' };
      var key2 = { id: 'key1' }; // Note: key2 has the same id as key1, but should nevertheless be threatened as a different key.

      var value1 = { id: 'value1' };
      var value2 = { id: 'value2' };

      var dictionary = new Dictionary<{ id: string }, { id: string }>();
      dictionary.set(key1, value1);
      dictionary.set(key2, value2);

      expect(dictionary.get(key1)).toEqual(value1);
      expect(dictionary.get(key2)).toEqual(value2);
    });
  });

  describe('containsKey()', () => {
    it('should determine if a given key exists in the dictionary', () => {
      var dictionary = new Dictionary<number, string>();
      dictionary.set(1, 'One');
      dictionary.set(2, 'Two');

      expect(dictionary.containsKey(1)).toEqual(true);
      expect(dictionary.containsKey(2)).toEqual(true);
      expect(dictionary.containsKey(3)).toEqual(false);
    });
  });

  describe('containsValue()', () => {
    it('should determine if a given value exists in the dictionary', () => {
      var dictionary = new Dictionary<number, string>();
      dictionary.set(1, 'One');
      dictionary.set(2, 'Two');

      expect(dictionary.containsValue('One')).toEqual(true);
      expect(dictionary.containsValue('Two')).toEqual(true);
      expect(dictionary.containsValue('Three')).toEqual(false);
    });
  });

  describe('clear()', () => {
    it('should clear the dictionary', () => {
      var dictionary = new Dictionary<number, string>();
      dictionary.set(1, 'One');
      dictionary.set(2, 'Two');

      expect(dictionary.containsKey(1)).toEqual(true);
      expect(dictionary.containsKey(2)).toEqual(true);
      expect(dictionary.containsValue('One')).toEqual(true);
      expect(dictionary.containsValue('Two')).toEqual(true);

      dictionary.clear();

      expect(dictionary.containsKey(1)).toEqual(false);
      expect(dictionary.containsKey(2)).toEqual(false);
      expect(dictionary.containsValue('One')).toEqual(false);
      expect(dictionary.containsValue('Two')).toEqual(false);
    });
  });

  describe('remove()', () => {
    it('should remove the given key (and the associated value) from the dictionary', () => {
      var dictionary = new Dictionary<number, string>();
      dictionary.set(1, 'One');
      dictionary.set(2, 'Two');

      expect(dictionary.containsKey(1)).toEqual(true);
      expect(dictionary.containsKey(2)).toEqual(true);
      expect(dictionary.containsValue('One')).toEqual(true);
      expect(dictionary.containsValue('Two')).toEqual(true);

      dictionary.remove(2);

      expect(dictionary.containsKey(1)).toEqual(true);
      expect(dictionary.containsKey(2)).toEqual(false);
      expect(dictionary.containsValue('One')).toEqual(true);
      expect(dictionary.containsValue('Two')).toEqual(false);
    });
  });

  describe('keys()', () => {
    it('should return the keys present in the dictionary', () => {
      var dictionary = new Dictionary<number, string>();
      dictionary.set(1, 'One');
      dictionary.set(2, 'Two');

      expect(dictionary.keys).toEqual([1, 2]);
    });
  });

  describe('values()', () => {
    it('should return the values present in the dictionary', () => {
      var dictionary = new Dictionary<number, string>();
      dictionary.set(1, 'One');
      dictionary.set(2, 'Two');

      expect(dictionary.values).toEqual(['One', 'Two']);
    });
  });

  describe('length()', () => {
    it('should return the number of key/value pairs present in the dictionary', () => {
      var dictionary = new Dictionary<number, string>();
      dictionary.set(1, 'One');
      dictionary.set(2, 'Two');

      expect(dictionary.length).toEqual(2);
    });
  });
});
