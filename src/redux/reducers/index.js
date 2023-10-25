export default function user(
  initialState = {
    loading: false,
    products: [],
    categories: [],
    selectedProducts: null,
    orders: []
  },
  action
) {
  switch (action.type) {
    case 'SET_USER_LOADING':
      return {
        ...initialState,
        loading: action.payload,
      };

    case 'SET_USER_PRODUCTS':
      return {
        ...initialState,
        products: action.payload,
      };

      case 'SET_USER_CATEGORIES':
        return {
          ...initialState,
          categories: action.payload,
        };

    case 'SET_USER_SELECTED_PRODUCT':
      return {
        ...initialState,
        selectedProducts: action.payload,
      };

    case 'SET_USER_ORDERS':
      return {
        ...initialState,
        orders: action.payload,
      };

    case 'USER_RESET':
      return {
        ...initialState,
        loading: false,
        products: [],
        categories: [],
        selectedProducts: null,
        orders: []
      };

    default:
      return initialState;
  }
}
