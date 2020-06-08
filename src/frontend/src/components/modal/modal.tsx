import React from 'react'
import _ from 'lodash'
import { connect, ConnectedProps } from 'react-redux'
import { Dialog, DialogProps } from '@material-ui/core'

import { RootState } from 'reducers'
import { setModal } from 'reducers/modal'
import { Dispatch } from 'redux'

type ModalProps = Omit<DialogProps, 'open'> & {
  modalId: string
}

function Modal({
  isOpen,
  children,
  closeModal,
  modalId,
  ...restProps
}: ModalProps & ReduxProps) {
  return (
    <Dialog open={isOpen} onClose={closeModal} {...restProps}>
      {children}
    </Dialog>
  )
}

const mapStateToProps = (state: RootState, ownProps: ModalProps) => {
  return {
    isOpen: _.get(state.modal.modals[ownProps.modalId], 'isOpen', false),
  }
}

const mapDispatchProps = (dispatch: Dispatch) => {
  return {
    closeModal: (modalId: string) => () =>
      dispatch(setModal({ modalId, isOpen: false })),
  }
}

const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchProps>,
  ownProps: ModalProps
) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    closeModal: dispatchProps.closeModal(ownProps.modalId),
  }
}

const connector = connect(mapStateToProps, mapDispatchProps, mergeProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Modal)
