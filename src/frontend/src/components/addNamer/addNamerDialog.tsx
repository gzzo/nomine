import React from 'react'
import { Formik, FormikHelpers } from 'formik'
import {
  DialogTitle,
  DialogContent,
  Typography,
  Dialog,
} from '@material-ui/core'

import { ADD_NAMER_DIALOG } from 'consts/modals'
import { useModal } from 'components/modal'

import AddNamerForm, { AddNamerFormValues } from './addNamerForm'

function handleSubmit(
  values: AddNamerFormValues,
  actions: FormikHelpers<AddNamerFormValues>
) {
  console.log(values, actions)
}

function AddNamerDialog(): React.ReactElement {
  const { isOpen, closeModal } = useModal(ADD_NAMER_DIALOG)

  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Add Namer</DialogTitle>
      <DialogContent>
        <Typography>word</Typography>
        <Formik initialValues={{ name: '', type: '' }} onSubmit={handleSubmit}>
          {formik => <AddNamerForm {...formik} closeModal={closeModal} />}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default AddNamerDialog
