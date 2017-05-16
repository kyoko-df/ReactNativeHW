import Api from './Api';

export const fetchLimitData = ({ pageNum, numPerPage, source }) => {
  return source
    .slice((pageNum - 1) * numPerPage, pageNum * numPerPage)
    .map(id => {
      return fetch(Api.HN_ITEM_ENDPOINT + id + '.json').then(response =>
        response.json()
      );
    });
};
