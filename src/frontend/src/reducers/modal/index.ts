import {
  ModalActionTypes,
  ModalState,
  SET_MODAL,
  SetModalAction,
  SetModalParams,
} from './types'

export const setModal = ({
  modalId,
  isOpen,
}: SetModalParams): SetModalAction => {
  return {
    type: SET_MODAL,
    modalId,
    isOpen,
  }
}

const initialState: ModalState = {
  modals: {},
}

export const reducer = (
  state = initialState,
  action: ModalActionTypes
): ModalState => {
  switch (action.type) {
    case SET_MODAL: {
      return {
        modals: {
          ...state.modals,
          [action.modalId]: {
            ...state.modals[action.modalId],
            isOpen: action.isOpen,
          },
        },
      }
    }

    default:
      return state
  }
}
