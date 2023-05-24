import {jest} from "@jest/globals";

export let res;
export let resSet;
export let resStatus;
export let resJson;

export const setupExpressMocks = () => {
  resJson = jest.fn();
  resStatus = jest.fn();
  resSet = jest.fn();
  res = {
    set: resSet,
    status: resStatus,
    json: resJson,
  };

  resJson.mockImplementation(() => res);
  resStatus.mockImplementation(() => res);
  resSet.mockImplementation(() => res);
};
