import { KiwiPreconditions } from '../base/kiwi-preconditions';
import {KiwiSort} from "./kiwi-sort";
/**
 * Represents one page of an overall list of results.
 * <p>
 * By default, pagination assumes a start page index of 0 (i.e. the page offset). You can change this
 * by calling setPagingStartsWith(int) or usingOneAsFirstPage().
 * <p>
 * You can also indicate whether a sort has been applied to the data by setting the KiwiSort via
 * the setter method or via addKiwiSort(KiwiSort).
 */
export class KiwiPage {
  /**
   * The content on this specific page.
   */
  readonly content: object[];

  /**
   * The size limit of the pagination, for example each page can have up to 25 items. The last page will often
   * contain fewer items than this limit unless the total number of items is such that there is no remainder
   * when dividing the total by the page size. e.g. if the total number of items is 100 and the page size is 20,
   * then each of the 5 pages has exactly 20 items (the page size).
   */
  readonly size: number;

  /**
   * The number of this page, e.g. page X of Y.
   */
  readonly number: number;

  /**
   * The number of items/elements on this page. Only on the last page can this be different.
   */
  readonly numberOfElements: number;

  /**
   * The total number of pages, calculated from the page size and total number of elements.
   */
  readonly totalPages: number;

  /**
   * The total number of items/elements in the overall result list.
   */
  readonly totalElements: number;

  /**
   * Describes any sort that is active for the pagination. Default value is null.
   */
  sort: KiwiSort;

  /**
   * Allows adjustment for instance where pagination starts with one instead of zero.
   */
  pagingStartsWith: number = 0;

  /**
   * Optional extra supplementary data related to the page
   */
  supplementaryData: object = {};

  constructor(content: object[], size: number, number: number, numberOfElements: number, totalPages: number, totalElements: number, sort: KiwiSort) {
    this.content = content;
    this.size = size;
    this.number = number;
    this.numberOfElements = numberOfElements;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.sort = sort;
  }

  static of(pageNum: number, limit: number, total: number, contentList: object[]): KiwiPage {
    KiwiPreconditions.checkPositiveOrZero(pageNum);
    KiwiPreconditions.checkPositive(limit);
    KiwiPreconditions.checkPositiveOrZero(total);
    KiwiPreconditions.checkArgumentDefined(contentList);

    return new KiwiPage(contentList, limit, pageNum, contentList.length, Math.ceil(total / limit), total, undefined);
  }

  addKiwiSort(sort: KiwiSort): this {
    this.sort = sort;
    return this;
  }

  usingZeroAsFirstPage(): this {
    this.pagingStartsWith = 0;
    return this;
  }

  usingOneAsFirstPage(): this {
    this.pagingStartsWith = 1;
    return this;
  }

  isFirst(): boolean {
    return this.number === this.pagingStartsWith;
  }

  isLast(): boolean {
    const offset = 1 - this.pagingStartsWith;
    return this.number === (this.totalPages - offset);
  }

  isSorted(): boolean {
    return this.sort !== undefined && this.sort !== null;
  }

  addSupplementaryData(supplementaryData: object): this {
    this.supplementaryData = supplementaryData;
    return this;
  }
}
