import React from 'react'
import { Formik, FormikHelpers } from 'formik'
import { DialogTitle, DialogContent, Typography } from '@material-ui/core'

import { ADD_NAMER_DIALOG } from 'consts/modals'
import { Modal } from 'components/modal'

import { AddNamerFormValues } from './types'
import AddNamerForm from './addNamerForm'

function handleSubmit(
  values: AddNamerFormValues,
  actions: FormikHelpers<AddNamerFormValues>
) {
  console.log(values, actions)
}

function AddNamerDialog(): React.ReactElement {
  return (
    <Modal modalId={ADD_NAMER_DIALOG} fullWidth maxWidth="sm">
      <DialogTitle>Add Namer</DialogTitle>
      <DialogContent>
        <Typography>word</Typography>
        <Formik initialValues={{ name: '' }} onSubmit={handleSubmit}>
          {formik => <AddNamerForm {...formik} />}
        </Formik>
      </DialogContent>
    </Modal>
  )
}

export default AddNamerDialog
