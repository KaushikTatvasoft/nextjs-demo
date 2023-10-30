export default function orders(
  initialState = {
    orders: [],
    page: 1,
    totalPage: 0,
    search: '',
    activeSort: '',
    sortOrder: '',
  },
  action
) {
  switch (action.type) {
    case 'SET_ORDERS':
      return {
        ...initialState,
        orders: action.payload,
      };

    case 'SET_ORDERS_PAGE':
      return {
        ...initialState,
        page: action.payload,
      };

    case 'SET_ORDERS_TOTAL_PAGE':
      return {
        ...initialState,
        totalPage: action.payload,
      };

    case 'SET_ORDERS_SEARCH':
      return {
        ...initialState,
        search: action.payload,
      };
    case 'SET_ORDERS_ACTIVE_SORT':
      return {
        ...initialState,
        activeSort: action.payload,
      };
    case 'SET_ORDERS_SORT_ORDER':
      return {
        ...initialState,
        sortOrder: action.payload,
      };

    case 'ORDERS_RESET':
      return {
        ...initialState,
        orders: [],
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
