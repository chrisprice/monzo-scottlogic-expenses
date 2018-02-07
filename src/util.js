export const ERROR = 'ERROR';

export const promiseWrapper = (asyncFn) =>
(dispatch, getState) => {
  asyncFn(dispatch, getState)
    .then((...args) => {
      if (args.legnth > 0) {
        throw new Error('Promise resolved with unexpected value');
      }
    })
    .catch(error => dispatch({
      type: ERROR,
      error
    }));
};

export const startOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth() - 1, 0);
