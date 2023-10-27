export default function categories(
  initialState = {
    categories: [],
    page: 1,
    totalPage: 0,
    search: '',
    activeSort: '',
    sortOrder: '',
  },
  action
) {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...initialState,
        categories: action.payload,
      };

    case 'SET_CATEGORIES_PAGE':
      return {
        ...initialState,
        page: action.payload,
      };

    case 'SET_CATEGORIES_TOTAL_PAGE':
      return {
        ...initialState,
        totalPage: action.payload,
      };

    case 'SET_CATEGORIES_SEARCH':
      return {
        ...initialState,
        search: action.payload,
      };
    case 'SET_CATEGORIES_ACTIVE_SORT':
      return {
        ...initialState,
        activeSort: action.payload,
      };
    case 'SET_CATEGORIES_SORT_ORDER':
      return {
        ...initialState,
        sortOrder: action.payload,
      };

    case 'CATEGORIES_RESET':
      return {
        ...initialState,
        categories: [],
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
