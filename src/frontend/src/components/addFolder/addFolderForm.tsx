import React from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  DialogActions,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Form, FormikProps, Field } from 'formik'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}))

export type AddFolderFormValues = {
  folder: string
}

type AddFolderFormProps = FormikProps<AddFolderFormValues> & {
  closeModal: () => void
}

function addFolderForm({
  dirty,
  closeModal,
}: AddFolderFormProps): React.ReactElement {
  const disableSubmit = !dirty
  const classes = useStyles()

  return (
    <Form>
      <FormControl className={classes.formControl}>
        <InputLabel shrink>Name</InputLabel>
        <Field name="folder" as={Input} autoComplete="off" />
      </FormControl>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button type="submit" disabled={disableSubmit}>
          Add
        </Button>
      </DialogActions>
    </Form>
  )
}

export default addFolderForm
