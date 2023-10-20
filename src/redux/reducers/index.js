export default function user(
  initialState = {
    activeTab: 0,
  },
  action
) {
  switch (action.type) {
    case 'SET_USER_ACTIVE_TAB':
      return {
        ...initialState,
        activeTab: action.payload,
      };

    case 'USER_RESET':
      return {
        ...initialState,
        activeTab: 0,
      };

    default:
      return initialState;
  }
}
