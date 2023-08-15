const checkPositiveOrZero = (value: number, errorMessage: string = 'value must be positive or zero') => {
  checkState(value >= 0, errorMessage);
}

const checkState = (expression: boolean, errorMessage: string = undefined) => {
  if (!expression) {
    const fullErrorMessage:string = errorMessage === undefined ? 'IllegalStateException' : `IllegalStateException: ${errorMessage}`;
    throw new Error(fullErrorMessage);
  }
}

const checkPositive = (value: number, errorMessage: string = 'value must be a positive number') => {
  checkState(value > 0, errorMessage);
}

const checkArgumentDefined = (reference: unknown, errorMessage: string = undefined) => {
  checkArgument(reference !== undefined && reference !== null, errorMessage);
}

const checkArgument = (expression: boolean, errorMessage: string = undefined) => {
  if (!expression) {
    const fullErrorMessage:string = errorMessage === undefined ? 'IllegalArgumentException' : `IllegalArgumentException: ${errorMessage}`;
    throw new Error(fullErrorMessage);
  }
}

const checkArgumentNotBlank = (str: string, errorMessage: string = undefined) => {
  checkArgumentDefined(str, errorMessage)
  checkArgument(str !== '', errorMessage);
}

export const KiwiPreconditions = {
  checkArgument,
  checkArgumentDefined,
  checkArgumentNotBlank,
  checkState,
  checkPositive,
  checkPositiveOrZero,
};
