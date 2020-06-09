import { useMemo } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'reducers'
import { setModal } from 'reducers/modal'
import { createSelector } from 'reselect'

type UseModalType = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const makeModalSelector = () =>
  createSelector(
    (state: RootState) => state.modal.modals,
    (_state: RootState, modalId: string) => modalId,
    (modals, modalId) => _.get(modals[modalId], 'isOpen', false)
  )

export default function useModal(modalId: string): UseModalType {
  const selectModal = useMemo(makeModalSelector, [])
  const isOpen = useSelector((state: RootState) => selectModal(state, modalId))
  const dispatch = useDispatch()
  const openModal = () => dispatch(setModal({ modalId, isOpen: true }))
  const closeModal = () => dispatch(setModal({ modalId, isOpen: false }))

  return { isOpen, openModal, closeModal }
}
