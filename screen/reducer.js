
export const ACTION_TYPE = {
  CURRENT_INDEX: 'CURRENT_INDEX',
  SET_QUOTES: 'SET_QUOTES',
  RESET_INDEX: 'RESET_INDEX'
}

export const initialState = {
  currentIndex: 0,
  quotes: []
}


export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.CURRENT_INDEX:
      return { ...state, currentIndex: state.currentIndex + 1 }
    case ACTION_TYPE.RESET_INDEX:
      return { ...state, currentIndex: initialState.currentIndex }
    case ACTION_TYPE.SET_QUOTES:
      return { ...state, quotes: action.payload}
    default:
      return state;
  }
}