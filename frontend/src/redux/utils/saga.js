export const createSagaActions = (type) => ({
  REQUEST: `${type}.REQUEST`,
  SUCCESS: `${type}.SUCCESS`,
  FAILURE: `${type}.FAILURE`,
});

export default {
  createSagaActions,
};
