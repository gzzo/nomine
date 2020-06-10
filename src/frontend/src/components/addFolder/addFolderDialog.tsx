import React from 'react'
import { Formik, FormikHelpers } from 'formik'
import { DialogTitle, DialogContent, Dialog } from '@material-ui/core'
import { gql, useMutation } from '@apollo/client'

import { ADD_FOLDER_DIALOG } from 'consts/modals'
import { useModal } from 'components/modal'
import { GET_NAMER } from 'pages/namer'

import AddFolderForm, { AddFolderFormValues } from './addFolderForm'

const ADD_FOLDER = gql`
  mutation InsertFolder($namer_id: Int!, $folder: String!) {
    insert_namer_watch_folder_one(
      object: { folder: $folder, namer_id: $namer_id }
    ) {
      id
      folder
    }
  }
`

function AddFolderDialog(): React.ReactElement {
  const { isOpen, closeModal } = useModal(ADD_FOLDER_DIALOG)
  const [addFolder] = useMutation(ADD_FOLDER, {
    update(cache, { data: { insert_namer_watch_folder_one } }) {
      const { namer_by_pk } = cache.readQuery({
        query: GET_NAMER,
        variables: { id: 1 },
      })
      cache.writeQuery({
        query: GET_NAMER,
        variables: { id: 1 },
        data: {
          namer_by_pk: {
            ...namer_by_pk,
            folders: namer_by_pk.folders.concat([
              insert_namer_watch_folder_one,
            ]),
          },
        },
      })
    },
  })

  function handleSubmit(
    values: AddFolderFormValues,
    actions: FormikHelpers<AddFolderFormValues>
  ) {
    addFolder({ variables: { ...values, namer_id: 1 } })
    actions.setSubmitting(false)
    closeModal()
  }

  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Add Folder</DialogTitle>
      <DialogContent>
        <Formik initialValues={{ folder: '' }} onSubmit={handleSubmit}>
          {formik => <AddFolderForm {...formik} closeModal={closeModal} />}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default AddFolderDialog
