import { jest } from "@jest/globals";

export let res;
export let resSet;
export let resStatus;
export let resSendStatus;
export let resJson;

export const setupExpressMocks = () => {
  resJson = jest.fn();
  resStatus = jest.fn();
  resSendStatus = jest.fn();
  resSet = jest.fn();
  res = {
    set: resSet,
    status: resStatus,
    sendStatus: resSendStatus,
    json: resJson,
  };

  resJson.mockImplementation(() => res);
  resStatus.mockImplementation(() => res);
  resSendStatus.mockImplementation(() => res);
  resSet.mockImplementation(() => res);
};
