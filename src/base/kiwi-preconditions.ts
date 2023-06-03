const checkPositiveOrZero = (value: number, errorMessage: string = 'value must be positive or zero') => {
  checkState(value >= 0, errorMessage);
}

const checkState = (expression: boolean, errorMessage: string) => {
  if (!expression) {
    throw new Error(`IllegalStateException: ${errorMessage}`);
  }
}

const checkPositive = (value: number, errorMessage: string = 'value must be a positive number') => {
  checkState(value > 0, errorMessage);
}

const checkArgumentDefined = (reference: any) => {
  checkArgument(reference !== undefined && reference !== null);
}

const checkArgument = (expression: boolean) => {
  if (!expression) {
    throw new Error('IllegalArgumentException');
  }
}

export const KiwiPreconditions = {
  checkArgument,
  checkArgumentDefined,
  checkState,
  checkPositive,
  checkPositiveOrZero,
};
