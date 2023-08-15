import { KiwiPreconditions } from "../base/kiwi-preconditions";

export class KiwiSort {
  readonly direction: string;
  readonly property: string;
  readonly ignoreCase: boolean;
  readonly ascending: boolean;

  constructor(
    property: string,
    direction: string,
    ignoreCase: boolean,
    ascending: boolean,
  ) {
    this.property = property;
    this.direction = direction;
    this.ignoreCase = ignoreCase;
    this.ascending = ascending;
  }

  static ofAscending(property: string): KiwiSort {
    return KiwiSort.of(property, "ASC");
  }

  static ofDescending(property: string): KiwiSort {
    return KiwiSort.of(property, "DESC");
  }

  static of(property: string, direction: string): KiwiSort {
    KiwiPreconditions.checkArgumentNotBlank(property);
    KiwiPreconditions.checkArgumentNotBlank(direction);

    return new KiwiSort(property, direction, false, "ASC" === direction);
  }

  isDescending(): boolean {
    return !this.ascending;
  }
}
