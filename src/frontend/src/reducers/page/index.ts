import {
  CloseDrawerAction,
  OpenDrawerAction,
  PageActionTypes,
  PageState,
} from './types'

export const CLOSE_DRAWER = 'page/CLOSE_DRAWER'
export const OPEN_DRAWER = 'page/OPEN_DRAWER'

export const closeDrawer = (): CloseDrawerAction => {
  return {
    type: CLOSE_DRAWER,
  }
}

export const openDrawer = (): OpenDrawerAction => {
  return {
    type: OPEN_DRAWER,
  }
}

const initialState: PageState = {
  drawer: {
    isOpen: true,
  },
}

export const reducer = (
  state: PageState = initialState,
  action: PageActionTypes
): PageState => {
  switch (action.type) {
    case OPEN_DRAWER: {
      return {
        ...state,
        drawer: {
          ...state.drawer,
          isOpen: true,
        },
      }
    }

    case CLOSE_DRAWER: {
      return {
        ...state,
        drawer: {
          ...state.drawer,
          isOpen: false,
        },
      }
    }

    default:
      return state
  }
}
