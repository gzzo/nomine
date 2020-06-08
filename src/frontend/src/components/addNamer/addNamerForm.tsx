import React from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  DialogActions,
  MenuItem,
  Select,
  Box,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Form, FormikProps, Field } from 'formik'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

export type AddNamerFormValues = {
  name: string
}

type AddNamerFormProps = FormikProps<AddNamerFormValues> & {
  closeModal: () => void
}

function addNamerForm({
  dirty,
  closeModal,
}: AddNamerFormProps): React.ReactElement {
  const disableSubmit = !dirty
  const classes = useStyles()

  return (
    <Form>
      <Box>
        <FormControl className={classes.formControl}>
          <InputLabel shrink>Name</InputLabel>
          <Field name="name" as={Input} />
        </FormControl>
      </Box>
      <Box>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="age-native-label-placeholder">
            Type
          </InputLabel>
          <Field name="type" as={Select}>
            <MenuItem value="movies">Movies</MenuItem>
            <MenuItem value="shows">Shows</MenuItem>
          </Field>
        </FormControl>
      </Box>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button type="submit" disabled={disableSubmit}>
          Subscribe
        </Button>
      </DialogActions>
    </Form>
  )
}

export default addNamerForm
