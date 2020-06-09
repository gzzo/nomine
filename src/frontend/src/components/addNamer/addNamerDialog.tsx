import React from 'react'
import { Formik, FormikHelpers } from 'formik'
import { DialogTitle, DialogContent, Dialog } from '@material-ui/core'
import { gql, useMutation } from '@apollo/client'

import { ADD_NAMER_DIALOG } from 'consts/modals'
import { useModal } from 'components/modal'
import { GET_NAMERS } from 'pages/home'

import AddNamerForm, { AddNamerFormValues } from './addNamerForm'

const ADD_NAMER = gql`
  mutation InsertNamer($name: String!, $type: String!) {
    insert_namer_one(object: { name: $name, type: $type }) {
      id
      name
    }
  }
`

function AddNamerDialog(): React.ReactElement {
  const { isOpen, closeModal } = useModal(ADD_NAMER_DIALOG)
  const [addNamer] = useMutation(ADD_NAMER, {
    update(cache, { data: { insert_namer_one } }) {
      const { namer } = cache.readQuery({ query: GET_NAMERS })
      cache.writeQuery({
        query: GET_NAMERS,
        data: { namer: namer.concat([insert_namer_one]) },
      })
    },
  })

  function handleSubmit(
    values: AddNamerFormValues,
    actions: FormikHelpers<AddNamerFormValues>
  ) {
    addNamer({ variables: values })
    actions.setSubmitting(false)
    closeModal()
  }

  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Add Namer</DialogTitle>
      <DialogContent>
        <Formik initialValues={{ name: '', type: '' }} onSubmit={handleSubmit}>
          {formik => <AddNamerForm {...formik} closeModal={closeModal} />}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default AddNamerDialog
