export const SET_MODAL = 'modal/SET_MODAL'

export type SetModalParams = {
  modalId: string
  isOpen: boolean
}

export type SetModalAction = SetModalParams & {
  type: typeof SET_MODAL
}

export type ModalActionTypes = SetModalAction

export type ModalState = {
  modals: {
    [name: string]: {
      isOpen: boolean
    }
  }
}
