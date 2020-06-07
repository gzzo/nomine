import {
  SetDrawerAction,
  PageActionTypes,
  PageState,
  SetDarkModeAction,
  SET_DRAWER,
  SET_DARK_MODE,
} from './types'

export const setDrawer = (isOpen: boolean): SetDrawerAction => {
  return {
    type: SET_DRAWER,
    isOpen,
  }
}

export const setDarkMode = (isDarkMode: boolean): SetDarkModeAction => {
  return {
    type: SET_DARK_MODE,
    isDarkMode,
  }
}

const initialState: PageState = {
  drawer: {
    isOpen: true,
  },
  isDarkMode: null,
}

export const reducer = (
  state: PageState = initialState,
  action: PageActionTypes
): PageState => {
  switch (action.type) {
    case SET_DRAWER: {
      return {
        ...state,
        drawer: {
          ...state.drawer,
          isOpen: action.isOpen,
        },
      }
    }

    case SET_DARK_MODE: {
      return {
        ...state,
        isDarkMode: action.isDarkMode,
      }
    }

    default:
      return state
  }
}
