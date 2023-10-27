export default function carts(
  initialState = {
    carts: [],
    page: 1,
    totalPage: 0,
    search: '',
    activeSort: '',
    sortOrder: '',
  },
  action
) {
  switch (action.type) {
    case 'SET_CARTS':
      return {
        ...initialState,
        carts: action.payload,
      };

    case 'SET_CARTS_PAGE':
      return {
        ...initialState,
        page: action.payload,
      };

    case 'SET_CARTS_TOTAL_PAGE':
      return {
        ...initialState,
        totalPage: action.payload,
      };

    case 'SET_CARTS_SEARCH':
      return {
        ...initialState,
        search: action.payload,
      };
    case 'SET_CARTS_ACTIVE_SORT':
      return {
        ...initialState,
        activeSort: action.payload,
      };
    case 'SET_CARTS_SORT_ORDER':
      return {
        ...initialState,
        sortOrder: action.payload,
      };

    case 'CARTS_RESET':
      return {
        ...initialState,
        carts: [],
        page: 1,
        totalPage: 0,
        search: '',
        activeSort: '',
        sortOrder: '',
      };

    default:
      return initialState;
  }
}
