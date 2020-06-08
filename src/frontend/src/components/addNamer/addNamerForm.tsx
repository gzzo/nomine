import React from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  DialogActions,
} from '@material-ui/core'
import { Form, FormikProps } from 'formik'

import { AddNamerFormValues } from './types'

function addNamerForm({
  dirty,
}: FormikProps<AddNamerFormValues>): React.ReactElement {
  const disableSubmit = !dirty

  return (
    <Form>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input />
      </FormControl>
      <DialogActions>
        <Button>Cancel</Button>
        <Button type="submit" disabled={disableSubmit}>
          Subscribe
        </Button>
      </DialogActions>
    </Form>
  )
}

export default addNamerForm
