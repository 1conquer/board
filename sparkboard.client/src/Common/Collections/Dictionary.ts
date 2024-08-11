/**
 * Represents a collection of keys and values.
 * Unlike a JavaScript object used as dictionary, this type supports keys of any type (not just strings or numbers like JavaScript objects do).
 *
 * @template TKey The type of the keys in the dictionary.
 * @template TValue The type of the values in the dictionary.
 */
export class Dictionary<TKey, TValue> {
  constructor() {
    this._keys = new Array<TKey>();
    this._values = new Array<TValue>();
  }

  public get(key: TKey): TValue {
    const keyIndex = this._keys.indexOf(key);

    if (keyIndex === -1) {
      let keyAsString: string;

      if (key === undefined) {
        keyAsString = "undefined";
      } else if (key === null) {
        keyAsString = "null";
      } else {
        keyAsString = key.toString();
      }

      throw new Error(
        `The given key was not present in the dictionary. The key was: "${keyAsString}".`
      );
    }

    return this._values[keyIndex];
  }

  public set(key: TKey, value: TValue): void {
    const keyIndex = this._keys.indexOf(key);

    if (keyIndex !== -1) {
      this._values[keyIndex] = value;
    } else {
      this._keys.push(key);
      this._values.push(value);
    }
  }

  public containsKey(key: TKey): boolean {
    return this._keys.indexOf(key) !== -1;
  }

  public containsValue(value: TValue): boolean {
    return this._values.indexOf(value) !== -1;
  }

  public clear(): void {
    this._keys.clear();
    this._values.clear();
  }

  public remove(key: TKey): boolean {
    const keyIndex = this._keys.indexOf(key);

    if (keyIndex === -1) {
      return false;
    }

    this._keys.removeAt(keyIndex);
    this._values.removeAt(keyIndex);
    return true;
  }

  public get keys(): TKey[] {
    return this._keys.clone();
  }

  public get values(): TValue[] {
    return this._values.clone();
  }

  public get length(): number {
    return this._keys.length;
  }

  private _keys: TKey[];
  private _values: TValue[];
}
