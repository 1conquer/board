/* eslint-disable func-names */
/* eslint-disable no-extend-native */
import linqjs from "linq";

declare global {
  /**
   * Defines extension functions for the Array type.
   */
  interface ArrayExtensions<T> {
    /**
     * Returns the array as an linqjs.IEnumerable, so that linqjs functions (such as where, select, etc...) can be called on the array.
     * This function is simply a shorthand for linqjs.Enumerable.from().
     * In other words:
     * myArray.asLinq().where(...) is the same as Enumerable.from(myArray).where(...).
     *
     * @deprecated Guideline TS_001_13 is deprecated and asLinq and the library linqjs must not be longer used!
     *
     * @returns The array as an linqjs.IEnumerable.
     *
     * @example Filter an array
     * var myArray = [1, 2, 3, 4, 5];
     * myArray.asLinq().where(a => a < 3).toArray(); // Returns all numbers in the array which are smaller than 3.
     */
    asLinq(): linqjs.IEnumerable<T>;

    /**
     * Empties the array by removing all elements in the array.
     */
    clear(): void;

    /**
     * Creates a clone of the array.
     * @returns A new array containing all elements the original array has.
     */
    clone(): Array<T>;

    /**
     * Removes an element from the array.
     * @param element The element to remove from the array.
     * @returns True if the given element was found in the array and has been removed; Otherwise false.
     */
    remove(element: T): boolean;

    /**
     * Removes all elements from the array that match the given predicate.
     *
     * @param predicate A function that determines if a given element should be removed.
     */
    removeAll(predicate: (element: T) => boolean): void;

    /**
     * Removes the element at the specified index.
     * @param index The zero-based index of the element to remove.
     * @returns True if the element was removed, otherwise false.
     */
    removeAt(index: number): boolean;

    /**
     * Determines if the array contains the given element.
     *
     * @deprecated Use native JS function Array.includes() instead.
     *
     * @param element The element to be searched in the array.
     * @returns True if the given element was found in the array; Otherwise false.
     */
    contains(element: T): boolean;

    /**
     * Determines if the array contains all of the given elements.
     * @param elements The elements to be searched in the array.
     * @returns True if all of the given elements where found in the array; Otherwise false.
     */
    containsAll(elements: T[]): boolean;

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
     */
    flat<T>(this: T[][]): T[];

    /**
     * Returns a flat list of items from a list of hierarchical structured items.
     *
     * @param childrenSelector A function that returns a list of child items for a given item.
     * @returns A flat list with all items including children of all hierarchy levels.
     *
     * @example Get a list with all persons including their children, children of children, children of children of children and so on.
     * var items = [
     * {
     *     name: "Mother",
     *     children: [
     *         {
     *             name: "Child of Mother",
     *             children: [
     *                 {
     *                     name: "Grandchild of Mother",
     *                     children: []
     *                 }
     *             ]
     *         },
     *         {
     *             name: "Other child of Mother",
     *             children: []
     *         }
     *     ]
     * }
     * ];
     *
     * items.flatten(person => person.children);
     *
     * This code will return a list equivalent to:
     * [
     *      items[0],                           // "Mother"
     *      items[0].children[0],               // "Child of mother"
     *      items[0].children[0].children[0],   // "Grandchild of Mother"
     *      items[0].children[1]                // "Other child of Mother"
     * ]
     */
    flatten(childrenSelector: (element: T) => T[]): T[];

    /**
     * Inserts an element at the given (zero-based) index.
     *
     * @param index The index to insert the given element at.
     * @param element The element to insert at the given index.
     *
     * @throws {Error} Thrown if the given index is less than 0 (zero) or greater than the length of the array.
     */
    insert(index: number, element: T): void;

    /**
     * Appends elements to the array and returns the new length of the array.
     *
     * @param elements The elements to append to the array.
     * @returns The new length of the array after the given elements have been appended to the array.
     *
     * @throws {Error} Throw if elements is null or undefined.
     */
    pushAll(elements: T[]): number;

    /**
     * Appends elements to the array expect those which are already contained in the array and returns the new length of the array.
     *
     * @param elements The elements to append to the array.
     *  Only those of the given elements which are not already contained in the array will be appended to the array.
     * @returns The new length of the array after the given elements have been appended to the array.
     *
     * @throws {Error} Throw if elements is null or undefined.
     */
    pushAllExceptDuplicates(elements: T[]): number;

    /**
     * Determines if another array is equal to this array,
     * meaning both arrays have the same length and contain the same elements in the same order.
     *
     * Two elements are considered to be equal if:
     * 1. They are the same object (two references to a single object) or
     * 2. They are primitives and have the same value or
     * 3. They are both null or
     * 4. They are both undefined
     *
     * If the other array is null false is returned.
     * If the other array is undefined false is returned.
     *
     * @param otherArray The other array to compare to this one.
     * @returns True if the array is equal to the other given array.
     */
    equals(otherArray: T[]): boolean;

    /**
     * Returns the first element of this array that is satisfying the predicate function.
     *
     * @param predicate {(element: T, index?: number, array?: T[]) => boolean} The function to test each element of this array.
     * @returns {T} The first element that is satisfying the predicate function.
     */
    find(predicate: (element: T, index?: number, array?: T[]) => boolean): T;

    /**
     * Determines if this array contains an element that has the same id as the given search element.
     *
     * @param searchElement The search element.
     * @param getIdFunction A function that gets the id of an element.
     * @returns True if this array contains an element that has the same id as the given element, otherwise false.
     *
     * @example Usage
     * var items = [{name: "A"}, {name: "B"}];
     * items.containsById(items[0], a => a.name); // returns true.
     * items.containsById({name: "A"}, a => a.name); // returns true.
     * items.containsById({name: "C"}, a => a.name); // returns false.
     */
    containsById(searchElement: T, getIdFunction: (element: T) => any): boolean;

    /**
     * Gets the (zero-based) index of the first element in this array that has the same id as the given search element.
     *
     * @param searchElement The search element.
     * @param getIdFunction A function that gets the id of an element.
     * @returns The (zero-based) index of the first element in this array that has the same id as the given search element.
     * In case no matching element was found -1 is returned.
     *
     * @example Usage
     * var items = [{name: "A"}, {name: "B"}];
     * items.indexOfById(items[0], a => a.name); // returns 0.
     * items.indexOfById(items[1], a => a.name); // returns 1.
     * items.indexOfById({name: "A"}, a => a.name); // returns 0.
     * items.indexOfById({name: "B"}, a => a.name); // returns 1.
     * items.indexOfById({name: "C"}, a => a.name); // returns -1.
     */
    indexOfById(searchElement: T, getIdFunction: (element: T) => any): number;

    /**
     * Determines if another array contains elements with the same ids, in the same order as this array.
     *
     * @param otherArray The other array to compare to this one.
     * @param getIdFunction A function that gets the id of an element.
     * @returns True if the given other array contains elements with the same ids, in the same order as this array.
     *
     * @example Usage
     * var items = [{name: "A"}, {name: "B"}];
     * items.equalsByIds([{name: "A"}, {name: "B"}], a => a.name); // returns true.
     * items.equalsByIds([{name: "A"}, {name: "B"}, {name: "C"}], a => a.name); // returns false.
     */
    equalsByIds(otherArray: T[], getIdFunction: (element: T) => any): boolean;

    /**
     * Returns the list ordered by a element keys. The keys are selected using the given key selectors.
     * When the keys of the first key selector are equal, the second key selector will be used for comparison.
     * This behaviour is similar to .orderBy().thenBy() calls.
     *
     * @param keySelectors An array of functions that gets the value of an element property using the key of the property.
     * @returns the ordered list.
     *
     * @example Usage with one key selector
     * var items = [{ id: 1, name: "Z"}, { id: 2, name: "U"}, { id: 3, name: "Ü"}];
     * items.orderBy(element => element.name); // returns [{ id: 3, name: "Ü"}, { id: 2, name: "U"}, { id: 1, name: "Z"}].
     *
     * @example Usage with multiple key selectors.
     * var items = [{ id: 1, name: "A"}, { id: 2, name: "Ü"}, { id: 3, name: "A"}];
     * items.orderBy(element => element.name, element => element.id);
     * // returns [{ id: 1, name: "A"}, { id: 3, name: "A"}, { id: 2, name: "Ü"}].
     */
    orderBy(...keySelectors: Array<(element: T) => any>): Array<T>;

    /**
     * Returns the list ordered descending by a element keys. The keys are selected using the given key selectors.
     * When the keys of the first key selector are equal, the second key selector will be used for comparison.
     * This behaviour is similar to .orderBy().thenBy() calls.
     *
     * @example Usage with one key selector
     * var items = [{ id: 1, name: "Z"}, { id: 2, name: "U"}, { id: 3, name: "Ü"}];
     * items.orderBy(element => element.name); // returns [{ id: 1, name: "Z"}, { id: 2, name: "U"}, { id: 3, name: "Ü"}].
     *
     * @example Usage with multiple key selectors.
     * var items = [{ id: 1, name: "A"}, { id: 2, name: "Ü"}, { id: 3, name: "A"}];
     * items.orderBy(element => element.name, element => element.id);
     * // returns [{ id: 2, name: "Ü"}, { id: 3, name: "A"}, { id: 1, name: "A"}].
     */
    orderByDescending(...keySelectors: Array<(element: T) => any>): Array<T>;

    /**
     * Determines whether an array includes a certain value among its entries, returning true or false as appropriate.
     *
     * @param searchElement The value to search for.
     * @param fromIndex The position in this array at which to begin searching for valueToFind;
     * the first character to be searched is found at fromIndex for positive values of fromIndex,
     * or at array.length + fromIndex for negative values of fromIndex (using the absolute value of fromIndex
     * as the number of characters from the end of the string at which to start the search).
     * Defaults to 0.
     * @returns A Boolean which is true if the value valueToFind is found within the array
     * (or the part of the array indicated by the index fromIndex, if specified).
     * Values of zero are all considered to be equal regardless of sign
     * (that is, -0 is considered to be equal to both 0 and +0), but false is not considered to be the same as 0.
     */
    includes(searchElement: T, fromIndex?: number): boolean;

    /**
     * Returns the index of the first element in the array that satisfies the provided testing function.
     * Otherwise, it returns -1, indicating that no element passed the test.
     * @param callback {(element: T, index?: number, array?: T[]) => boolean} The function to test each element of this array.
     * @param thisArg Optional object to use as this when executing callback.
     * @returns {T} The index of the element that is satisfying the predicate function.
     */
    findIndex(
      callback: (element: T, index?: number, array?: T[]) => boolean,
      thisArgs?: T
    ): number;
  }

  interface Array<T> extends ArrayExtensions<T> {}
  interface ReadonlyArray<T> extends ArrayExtensions<T> {}

  /**
   * Defines static extension functions for the Array type.
   */
  interface ArrayConstructor {
    /**
     * Determines if two array are equal, meaning they have the same length and contain the same elements in the same order.
     *
     * Two elements are considered to be equal if:
     * 1. They are the same object (two references to a single object) or
     * 2. They are primitives and have the same value or
     * 3. They are both null or
     * 4. They are both undefined
     *
     * If both arrayA and arrayB is null they are considered equal.
     * If both arrayA and arrayB is undefined they are considered equal.
     *
     * @param arrayA The first array to compare.
     * @param arrayB The second array to compare.
     * @returns True if the two arrays are equal.
     */
    areEqual(arrayA: any[], arrayB: any[]): boolean;

    /**
     * Creates a new, shallow-copied Array instance from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapFn Map function to call on every element of the array.
     * @param thisArg Value to use as this when executing mapFn.
     * @returns A new Array instance.
     */
    from(arrayLike: any, mapFunction?, thisArg?): any[];
  }
}

Array.prototype.asLinq = function <T>(this: Array<T>): linqjs.IEnumerable<T> {
  return linqjs.from<T>(this);
};

Array.prototype.clear = function <T>(this: Array<T>): void {
  this.splice(0, this.length);
};

Array.prototype.clone = function <T>(this: Array<T>): Array<T> {
  return this.slice(0);
};

Array.prototype.remove = function <T>(this: Array<T>, element: T): boolean {
  const indexOfElement = this.indexOf(element);

  if (indexOfElement === -1) {
    return false;
  }

  this.splice(indexOfElement, 1);
  return true;
};

Array.prototype.removeAll = function <T>(
  this: Array<T>,
  predicate: (element: T) => boolean
): void {
  const matchingItems = this.filter((a) => predicate(a));
  matchingItems.forEach((element: T) => this.remove(element));
};

Array.prototype.removeAt = function <T>(
  this: Array<T>,
  index: number
): boolean {
  if (index > this.length - 1) {
    return false;
  }

  this.splice(index, 1);
  return true;
};

Array.prototype.contains = function <T>(this: Array<T>, element: T): boolean {
  return this.indexOf(element) !== -1;
};

Array.prototype.containsAll = function <T>(
  this: Array<T>,
  elements: T[]
): boolean {
  for (let i = 0; i < elements.length; i++) {
    if (!this.contains(elements[i])) {
      return false;
    }
  }

  return true;
};

Array.prototype.flatten = function <T>(
  this: Array<T>,
  childElementsSelector: (element: T) => T[]
): T[] {
  const result = new Array<T>();

  const elementsToProcess = new Array<T>();

  for (let i = this.length - 1; i >= 0; i--) {
    elementsToProcess.push(this[i]);
  }

  while (elementsToProcess.length > 0) {
    const element = elementsToProcess.pop();
    result.push(element);

    const childElements = childElementsSelector(element);

    if (!Object.isNullOrUndefined(childElements)) {
      for (let i = childElements.length - 1; i >= 0; i--) {
        elementsToProcess.push(childElements[i]);
      }
    }
  }

  return result;
};

Array.prototype.insert = function <T>(
  this: Array<T>,
  index: number,
  element: T
): void {
  if (index < 0) {
    throw new Error(
      `The given index '${index}' is less than 0. The index must be greater than or equal to 0 (zero).`
    );
  }

  if (index > this.length) {
    throw new Error(
      `The given index '${index}' is greater than the length of the array, which is '${this.length}'.` +
        " The index must be less than or equal to the length of the array."
    );
  }

  this.splice(index, 0, element);
};

Array.prototype.pushAll = function <T>(
  this: Array<T>,
  elements: T[],
  ignoreDuplicates: boolean = false
): number {
  if (Object.isNullOrUndefined(elements)) {
    throw new Error("The given parameter 'elements' is null or undefined.");
  }

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (!ignoreDuplicates || !this.contains(element)) {
      this.push(element);
    }
  }

  return this.length;
};

Array.prototype.pushAllExceptDuplicates = function <T>(
  this: Array<T>,
  elements: T[]
): number {
  if (Object.isNullOrUndefined(elements)) {
    throw new Error("The given parameter 'elements' is null or undefined.");
  }

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (!this.contains(element)) {
      this.push(element);
    }
  }

  return this.length;
};

Array.prototype.equals = function <T>(
  this: Array<T>,
  otherArray: T[]
): boolean {
  if (this.length !== otherArray.length) {
    return false;
  }

  for (let i = 0; i < this.length; i++) {
    if (this[i] !== otherArray[i]) {
      return false;
    }
  }

  return true;
};

if (!Array.prototype.find) {
  Array.prototype.find = function <T>(
    this: Array<T>,
    predicate: (element: T, index?: number, array?: T[]) => boolean,
    thisArg?: any
  ): T {
    if (typeof predicate !== "function") {
      throw new TypeError("predicate must be a function.");
    }

    const list = Object(this);
    // eslint-disable-next-line no-bitwise
    const length = list.length >>> 0;

    for (let i = 0; i < length; ++i) {
      const value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }

    return undefined;
  };
}

Array.prototype.containsById = function <T>(
  this: Array<T>,
  searchElement: T,
  getIdFunction: (element: T) => any
): boolean {
  if (searchElement === undefined) {
    return this.contains(undefined);
  }

  if (searchElement === null) {
    return this.contains(null);
  }

  const searchElementId = getIdFunction(searchElement);

  return this.some(
    (a) => !Object.isNullOrUndefined(a) && getIdFunction(a) === searchElementId
  );
};

Array.prototype.orderBy = function <T>(
  this: Array<T>,
  ...keySelectors: Array<(element: T) => any>
): Array<T> {
  const collator = new Intl.Collator();
  return this.sort((a, b) => {
    let result = 0;
    let i = 0;
    while (result === 0 && i < keySelectors.length) {
      const keySelector = keySelectors[i];
      const aKey = keySelector(a);
      const bKey = keySelector(b);
      if (Number.isNumber(aKey) && Number.isNumber(bKey)) {
        result = aKey - bKey;
      } else if (
        Object.prototype.toString.call(aKey) === "[object Date]" &&
        Object.prototype.toString.call(bKey) === "[object Date]"
      ) {
        result = aKey.getTime() - bKey.getTime();
      } else {
        result = collator.compare(aKey, bKey);
      }
      // eslint-disable-next-line no-plusplus
      i++;
    }

    return result;
  });
};

Array.prototype.orderByDescending = function <T>(
  this: Array<T>,
  ...keySelectors: Array<(element: T) => any>
): Array<T> {
  return this.orderBy(...keySelectors).reverse();
};

Array.prototype.indexOfById = function <T>(
  this: Array<T>,
  searchElement: T,
  getIdFunction: (element: T) => any
): number {
  if (searchElement === undefined) {
    return this.indexOf(undefined);
  }

  if (searchElement === null) {
    return this.indexOf(null);
  }

  const searchElementId = getIdFunction(searchElement);

  for (let i = 0; i < this.length; i++) {
    const value = this[i];

    if (
      !Object.isNullOrUndefined(value) &&
      getIdFunction(value) === searchElementId
    ) {
      return i;
    }
  }

  return -1;
};

Array.prototype.equalsByIds = function <T>(
  this: Array<T>,
  otherArray: T[],
  getIdFunction: (element: T) => any
): boolean {
  if (this.length !== otherArray.length) {
    return false;
  }

  for (let i = 0; i < this.length; i++) {
    const value = this[i];
    const otherValue = otherArray[i];

    const areBothValuesUndefined =
      value === undefined && otherValue === undefined;
    const areBothValuesNull = value === null && otherValue === null;

    if (!areBothValuesNull && !areBothValuesUndefined) {
      // If one of them is undefined or null, both not the other, than the are not equal.
      if (
        value === null ||
        otherValue === null ||
        value === undefined ||
        otherValue === undefined
      ) {
        return false;
      }

      if (getIdFunction(value) !== getIdFunction(otherValue)) {
        return false;
      }
    }
  }

  return true;
};

Array.areEqual = function (arrayA: any[], arrayB: any[]): boolean {
  if (arrayA === null && arrayB === null) {
    return true;
  }

  if (arrayA === undefined && arrayB === undefined) {
    return true;
  }

  // If either arrayA or arrayB is null or undefined (and not both are null or undefined,
  // which has been checked by the two if blocks above) they are not equal.
  if (
    arrayA === null ||
    arrayA === undefined ||
    arrayB === null ||
    arrayB === undefined
  ) {
    return false;
  }

  return arrayA.equals(arrayB);
};

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    value(searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      // 1. Let O be ? ToObject(this value).
      const o = Object(this);
      // 2. Let len be ? ToLength(? Get(O, "length")).
      // eslint-disable-next-line no-bitwise
      const len = o.length >>> 0;
      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }
      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      // eslint-disable-next-line no-bitwise
      const n = fromIndex | 0;
      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      function sameValueZero(x, y): boolean {
        // eslint-disable-next-line no-restricted-globals
        return (
          x === y ||
          (typeof x === "number" &&
            typeof y === "number" &&
            isNaN(x) &&
            isNaN(y))
        );
      }
      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1.
        // eslint-disable-next-line no-plusplus
        k++;
      }
      // 8. Return false
      return false;
    },
  });
}

// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = (function () {
    const toStr = Object.prototype.toString;
    const isCallable = function (fn): boolean {
      return typeof fn === "function" || toStr.call(fn) === "[object Function]";
    };
    const toInteger = function (value): number {
      const num = Number(value);
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(num)) {
        return 0;
      }
      // eslint-disable-next-line no-restricted-globals
      if (num === 0 || !isFinite(num)) {
        return num;
      }
      return (num > 0 ? 1 : -1) * Math.floor(Math.abs(num));
    };
    // eslint-disable-next-line no-restricted-properties
    const maxSafeInteger = 2 ** 53 - 1;
    const toLength = function (value): number {
      const len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };
    // The length property of the from method is 1.
    // eslint-disable-next-line sonarjs/cognitive-complexity
    return function from(this: unknown, arrayLike /* , mapFn, thisArg */) {
      // 1. Let C be the this value.
      const C = this;
      // 2. Let items be ToObject(arrayLike).
      const items = Object(arrayLike);
      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          "Array.from requires an array-like object - not null or undefined"
        );
      }
      // 4. If mapfn is undefined, then let mapping be false.
      // eslint-disable-next-line no-void, prefer-rest-params
      const mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      let T;
      if (typeof mapFn !== "undefined") {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            "Array.from: when provided, the second argument must be a function"
          );
        }
        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          // eslint-disable-next-line prefer-rest-params, prefer-destructuring
          T = arguments[2];
        }
      }
      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      const len = toLength(items.length);
      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      const A = isCallable(C) ? Object(new (C as any)(len)) : new Array(len);
      // 16. Let k be 0.
      let k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      let kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] =
            typeof T === "undefined"
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  })();
}

// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, "findIndex", {
    value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      const o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      // eslint-disable-next-line no-bitwise
      const len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      // eslint-disable-next-line prefer-rest-params
      const thisArg = arguments[1];

      // 5. Let k be 0.
      let k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        const kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        // eslint-disable-next-line no-plusplus
        k++;
      }

      // 7. Return -1.
      return -1;
    },
    configurable: true,
    writable: true,
  });
}
