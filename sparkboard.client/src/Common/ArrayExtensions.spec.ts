/* **************************************************************************************
 * This is legacy test code and may not follow our testing guidelines and best practices
 * Be careful when you search for something to copy + paste!
 ************************************************************************************* */

class Item {
  public constructor(public name: string) {
    this.children = new Array<Item>();
  }

  public children: Item[];
}

describe('ArrayExtensions', () => {
  describe('asLinq()', () => {
    it('should return an array as a linq object', () => {
      const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const subList = list
        .asLinq()
        .where((item) => item < 6)
        .toArray();

      expect(subList).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('clear()', () => {
    it('should clear an array', () => {
      const items = [1, 2, 3, 4];
      items.clear();

      expect(items).toEqual([]);
    });
  });

  describe('clone()', () => {
    it('should clone an array', () => {
      const items = [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }];
      const clone = items.clone();

      expect(clone.length).toEqual(items.length);
      expect(clone[0]).toEqual(items[0]);
      expect(clone[1]).toEqual(items[1]);
      expect(clone[2]).toEqual(items[2]);
      expect(clone[3]).toEqual(items[3]);

      expect(items).not.toBe(clone); // Make sure we really got a clone and not just the original array.
    });
  });

  describe('remove()', () => {
    it('should remove an element from an array', () => {
      const items = [1, 2, 3, 4];

      const result = items.remove(3);
      expect(result).toEqual(true);

      expect(items).toEqual([1, 2, 4]);
    });
  });

  describe('remove()', () => {
    it('should return false if the given element could not be removed', () => {
      const items = [1, 2, 3, 4];

      const result = items.remove(5);
      expect(result).toEqual(false);

      expect(items).toEqual([1, 2, 3, 4]);
    });
  });

  describe('removeAll()', () => {
    it('should remove all elements that match the given predicate', () => {
      const items = [1, 2, 3, 4];

      items.removeAll((a) => a > 2);

      expect(items).toEqual([1, 2]);
    });
  });

  describe('removeAt()', () => {
    it('should remove the element at the given index from an array', () => {
      const items = [1, 2, 3, 4];

      const result = items.removeAt(1);
      expect(result).toEqual(true);

      expect(items).toEqual([1, 3, 4]);
    });
  });

  describe('removeAt()', () => {
    it('should return false if the given no element exists at the given index in the array', () => {
      const items = [1, 2, 3, 4];

      const result = items.removeAt(4);
      expect(result).toEqual(false);

      expect(items).toEqual([1, 2, 3, 4]);
    });
  });

  describe('contains()', () => {
    it('should determine if an array contains a given element', () => {
      const items = [1, 2, 3, 4];

      expect(items.contains(1)).toEqual(true);
      expect(items.contains(2)).toEqual(true);
      expect(items.contains(3)).toEqual(true);
      expect(items.contains(4)).toEqual(true);
      expect(items.contains(5)).toEqual(false);
    });
  });

  describe('flatten()', () => {
    it('should return a flat list of items from the given hierarchical list of items', () => {
      const itemA = new Item('A');
      const itemAA = new Item('A.A');
      const itemAAA = new Item('A.A.A');
      const itemAB = new Item('A.B');

      const itemB = new Item('B');
      const itemBA = new Item('B.A');
      const itemBAA = new Item('B.A.A');
      const itemBB = new Item('B.B');

      itemA.children.push(itemAA);
      itemA.children.push(itemAB);
      itemAA.children.push(itemAAA);

      itemB.children.push(itemBA);
      itemB.children.push(itemBB);
      itemBA.children.push(itemBAA);

      const items = [itemA, itemB];

      const result = items.flatten((item: Item): Item[] => item.children);

      expect(result).toEqual([itemA, itemAA, itemAAA, itemAB, itemB, itemBA, itemBAA, itemBB]);

      expect(items).toEqual([itemA, itemB]); // flatten() should not modify the given array
    });
  });

  describe('insert()', () => {
    it('should insert the given element at the given index', () => {
      let items: number[];

      items = [0, 1, 2, 3, 4];
      items.insert(0, 100);
      expect(items).toEqual([100, 0, 1, 2, 3, 4]);

      items = [0, 1, 2, 3, 4];
      items.insert(1, 100);
      expect(items).toEqual([0, 100, 1, 2, 3, 4]);

      items = [0, 1, 2, 3, 4];
      items.insert(2, 100);
      expect(items).toEqual([0, 1, 100, 2, 3, 4]);

      items = [0, 1, 2, 3, 4];
      items.insert(3, 100);
      expect(items).toEqual([0, 1, 2, 100, 3, 4]);

      items = [0, 1, 2, 3, 4];
      items.insert(4, 100);
      expect(items).toEqual([0, 1, 2, 3, 100, 4]);

      items = [0, 1, 2, 3, 4];
      items.insert(5, 100);
      expect(items).toEqual([0, 1, 2, 3, 4, 100]);
    });
  });

  describe('insert()', () => {
    it('should throw an error if an invalid index (less than 0 or greather than the length of the array) is passed', () => {
      const items = [0, 1, 2, 3, 4];

      expect(() => items.insert(-1, 100)).toThrow(
        "The given index '-1' is less than 0. The index must be greater than or equal to 0 (zero).",
      );
      expect(items).toEqual([0, 1, 2, 3, 4]); // Make sure the insert() method did not modify the given array.

      expect(() => items.insert(6, 100)).toThrow(
        "The given index '6' is greater than the length of the array, which is '5'." +
          ' The index must be less than or equal to the length of the array.',
      );
      expect(items).toEqual([0, 1, 2, 3, 4]); // Make sure the insert() method did not modify the given array.
    });
  });

  describe('pushAll()', () => {
    it('should append the given elements to the array', () => {
      const items = [0, 1, 2, 3, 4];

      items.pushAll([100, 101, 102]);

      expect(items).toEqual([0, 1, 2, 3, 4, 100, 101, 102]);
    });

    it("doesn't append duplicates if the ignoreDuplicates parameter is set to true", () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      (items as any).pushAll([2, 4, 6, 8, 10, 12], true);

      expect(items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]);
    });
  });

  describe('pushAll()', () => {
    it('should append the given elements to the array even if they are already contained in the array', () => {
      const items = [0, 1, 2, 3, 4];

      items.pushAll([100, 101, 102, 0, 1, 2, 3, 4]);

      expect(items).toEqual([0, 1, 2, 3, 4, 100, 101, 102, 0, 1, 2, 3, 4]);
    });
  });

  describe('pushAll()', () => {
    it('should throw an error if the given elements is null or undefined', () => {
      const items = [0, 1, 2, 3, 4];

      expect(() => items.pushAll(null)).toThrow("The given parameter 'elements' is null or undefined.");
      expect(items).toEqual([0, 1, 2, 3, 4]); // Make sure the inser() method did not modify the given array.

      expect(() => items.pushAll(undefined)).toThrow("The given parameter 'elements' is null or undefined.");
      expect(items).toEqual([0, 1, 2, 3, 4]); // Make sure the inser() method did not modify the given array.
    });
  });

  describe('pushAllExceptDuplicates()', () => {
    it('should append only those of the given elements to the array that are not already contained in the array', () => {
      const items = [0, 1, 2, 3, 4];

      items.pushAllExceptDuplicates([100, 101, 102, 0, 1, 2, 3, 4]);

      expect(items).toEqual([0, 1, 2, 3, 4, 100, 101, 102]);
    });
  });

  describe('equals()', () => {
    it('should determine if an array is equal to another array', () => {
      expect([1, 2, 3, null, undefined].equals([1, 2, 3, null, undefined])).toEqual(true); // both arrays contain the same primitive values
      expect([1, 2, 3, 4].equals([1, 2, 3])).toEqual(false); // both arrays do not contain the same primitive values
      expect([1, 2, 3].equals([3, 2, 1])).toEqual(false); // both arrays contain the same primitive values, but not in the same order

      const item1 = { id: 1 };
      const item2 = { id: 2 };
      const item3 = { id: 3 };

      // both arrays contain references to the same objects
      expect([item1, item2, item3].equals([item1, item2, item3])).toEqual(true);
      // both arrays do not contain references to the same objects
      expect([item1, item2, item3].equals([item1, item2])).toEqual(false);
      // both arrays contain references to the same objects, but not in the same order
      expect([item1, item2, item3].equals([item3, item2, item1])).toEqual(false);
    });
  });

  describe('containsById()', () => {
    it('should determine if an array contains an element that has the same id as a given element', () => {
      // the array contains an element with the name 'A'
      expect([{ name: 'A' }, { name: 'B' }, { name: 'C' }].containsById({ name: 'A' }, (a) => a.name)).toEqual(true);
      // the array contains an element with the name 'B'
      expect([{ name: 'A' }, { name: 'B' }, { name: 'C' }].containsById({ name: 'B' }, (a) => a.name)).toEqual(true);
      // the array contains an element with the name 'C'
      expect([{ name: 'A' }, { name: 'B' }, { name: 'C' }].containsById({ name: 'C' }, (a) => a.name)).toEqual(true);
      // the array does not contain an element with the name 'D'
      expect([{ name: 'A' }, { name: 'B' }, { name: 'C' }].containsById({ name: 'D' }, (a) => a.name)).toEqual(false);

      const itemA = { name: 'A' };
      const itemB = { name: 'B' };
      const itemC = { name: 'C' };
      const itemD = { name: 'D' };

      // the array contains an element with the name 'A'
      expect([itemA, itemB, itemC].containsById(itemA, (a) => a.name)).toEqual(true);
      // the array contains an element with the name 'B'
      expect([itemA, itemB, itemC].containsById(itemB, (a) => a.name)).toEqual(true);
      // the array contains an element with the name 'C'
      expect([itemA, itemB, itemC].containsById(itemC, (a) => a.name)).toEqual(true);
      // the array does not contain an element with the name 'D'
      expect([itemA, itemB, itemC].containsById(itemD, (a) => a.name)).toEqual(false);

      // the array contains undefined
      expect([itemA, itemB, itemC, undefined].containsById(undefined, (a) => a.name)).toEqual(true);
      // the array contains null
      expect([itemA, itemB, itemC, null].containsById(null, (a) => a.name)).toEqual(true);
    });
  });

  describe('indexOfById()', () => {
    it('should get the index of the first element in an array that has the same id as a given element', () => {
      // the array contains an element with the name 'A' at the index 0
      expect([{ name: 'A' }, { name: 'B' }, { name: 'C' }].indexOfById({ name: 'A' }, (a) => a.name)).toEqual(0);
      // the array contains an element with the name 'B' at the index 1
      expect([{ name: 'A' }, { name: 'B' }, { name: 'C' }].indexOfById({ name: 'B' }, (a) => a.name)).toEqual(1);
      // the array contains an element with the name 'C' at the index 2
      expect([{ name: 'A' }, { name: 'B' }, { name: 'C' }].indexOfById({ name: 'C' }, (a) => a.name)).toEqual(2);
      // the array does not contain an element with the name 'D'
      expect([{ name: 'A' }, { name: 'B' }, { name: 'C' }].indexOfById({ name: 'D' }, (a) => a.name)).toEqual(-1);

      const itemA = { name: 'A' };
      const itemB = { name: 'B' };
      const itemC = { name: 'C' };
      const itemD = { name: 'D' };

      // the array contains an element with the name 'A' at the index 0
      expect([itemA, itemB, itemC].indexOfById(itemA, (a) => a.name)).toEqual(0);
      // the array contains an element with the name 'B' at the index 1
      expect([itemA, itemB, itemC].indexOfById(itemB, (a) => a.name)).toEqual(1);
      // the array contains an element with the name 'C' at the index 2
      expect([itemA, itemB, itemC].indexOfById(itemC, (a) => a.name)).toEqual(2);
      // the array does not contain an element with the name 'D'
      expect([itemA, itemB, itemC].indexOfById(itemD, (a) => a.name)).toEqual(-1);

      // the array contains undefined at index 3
      expect([itemA, itemB, itemC, undefined].indexOfById(undefined, (a) => a.name)).toEqual(3);
      // the array contains null at index 3
      expect([itemA, itemB, itemC, null].indexOfById(null, (a) => a.name)).toEqual(3);
    });
  });

  describe('equalsByIds()', () => {
    it('should determine if another array contains elements with the same ids', () => {
      expect(([] as Array<{ name: string }>).equalsByIds([], (a) => a.name)).toEqual(true); // both arrays are empty

      // both arrays contain elements with the same ids
      expect(
        [{ name: 'A' }, { name: 'B' }, { name: 'C' }].equalsByIds([{ name: 'A' }, { name: 'B' }, { name: 'C' }], (a) => a.name),
      ).toEqual(true);

      // both arrays contain elements with the same ids, but in different orders
      expect(
        [{ name: 'A' }, { name: 'B' }, { name: 'C' }].equalsByIds([{ name: 'C' }, { name: 'B' }, { name: 'A' }], (a) => a.name),
      ).toEqual(false);
      // the arrays have elements with different ids
      expect(
        [{ name: 'A' }, { name: 'B' }, { name: 'C' }].equalsByIds([{ name: 'D' }, { name: 'E' }, { name: 'F' }], (a) => a.name),
      ).toEqual(false);
      // the arrays do not have the same number of elements
      expect([{ name: 'A' }, { name: 'B' }, { name: 'C' }].equalsByIds([{ name: 'A' }, { name: 'B' }], (a) => a.name)).toEqual(false);

      const itemA = { name: 'A' };
      const itemB = { name: 'B' };
      const itemC = { name: 'C' };
      const itemD = { name: 'D' };
      const itemE = { name: 'E' };
      const itemF = { name: 'F' };

      // both arrays contain elements with the same ids
      expect([itemA, itemB, itemC].equalsByIds([itemA, itemB, itemC], (a) => a.name)).toEqual(true);

      // both arrays contain elements with the same ids, but in different orders
      expect([itemA, itemB, itemC].equalsByIds([itemC, itemB, itemA], (a) => a.name)).toEqual(false);
      // the arrays have elements with different ids
      expect([itemA, itemB, itemC].equalsByIds([itemD, itemE, itemF], (a) => a.name)).toEqual(false);
      // the arrays do not have the same number of elements
      expect([itemA, itemB, itemC].equalsByIds([itemA, itemB], (a) => a.name)).toEqual(false);

      // both arrays contain elements with the same ids and undefined and null
      expect([itemA, itemB, itemC, undefined, null].equalsByIds([itemA, itemB, itemC, undefined, null], (a) => a.name)).toEqual(true);
    });
  });

  describe('areEqual()', () => {
    it('should determine if two arrays are equal', () => {
      // both arrays contain the same primitive values
      expect(Array.areEqual([1, 2, 3, null, undefined], [1, 2, 3, null, undefined])).toEqual(true);
      // both arrays do not contain the same primitive values
      expect(Array.areEqual([1, 2, 3, 4], [1, 2, 3])).toEqual(false);
      // both arrays contain the same primitive values, but not in the same order
      expect(Array.areEqual([1, 2, 3], [3, 2, 1])).toEqual(false);

      const item1 = { id: 1 };
      const item2 = { id: 2 };
      const item3 = { id: 3 };

      // both arrays contain references to the same obejcts
      expect(Array.areEqual([item1, item2, item3], [item1, item2, item3])).toEqual(true);
      // both arrays do not contain references to the same obejcts
      expect(Array.areEqual([item1, item2, item3], [item1, item2])).toEqual(false);
      // both arrays contain references to the same obejcts, but not in the same order
      expect(Array.areEqual([item1, item2, item3], [item3, item2, item1])).toEqual(false);
      // both are null
      expect(Array.areEqual(null, null)).toEqual(true);
      // the first is null, bot not the second
      expect(Array.areEqual([1, 2], null)).toEqual(false);
      // both are undefined
      expect(Array.areEqual(undefined, undefined)).toEqual(true);
      // the first is undefined, but not the second
      expect(Array.areEqual(undefined, [1, 2])).toEqual(false);
    });
  });
});
