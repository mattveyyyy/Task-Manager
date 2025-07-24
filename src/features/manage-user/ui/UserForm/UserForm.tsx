import { Formik, Form } from 'formik';
import { z } from 'zod';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  Button,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import styles from './UserForm.module.css';

const userSchema = z.object({
  name: z.string().min(1, 'Required').max(64),
  surName: z.string().min(1, 'Required').max(64),
  password: z.string().min(1, 'Required'),
  fullName: z.string().min(1, 'Required').max(130),
  email: z.string().email('Invalid email'),
  birthDate: z.union([z.date(), z.null()]).optional(),
  telephone: z
    .string()
    .regex(/^\+?\d{10,15}$/, 'Invalid phone number')
    .optional(),
  employment: z.string().optional(),
  userAgreement: z.literal(true, { message: 'You must agree' }),
});

const validateWithZod = (values: any) => {
  const parsed = userSchema.safeParse(values);
  if (parsed.success) return;
  const errors: Record<string, string> = {};
  parsed.error.issues.forEach((err) => {
    const field = err.path[0] as string;
    errors[field] = err.message;
  });
  return errors;
};

interface UserFormProps {
  initialData?: any;
  onSubmit: (userData: any) => void;
  onCancel: () => void;
}

export const UserForm = ({ initialData, onSubmit, onCancel }: UserFormProps) => {
  return (
    <div className={styles.container}>
      <Typography variant="h5">
        {initialData ? 'Edit User' : 'Create New User'}
      </Typography>
      <Formik
        initialValues={{
          name: initialData?.name ?? '',
          surName: initialData?.surName ?? '',
          password: initialData?.password ?? '',
          fullName: initialData?.fullName ?? '',
          email: initialData?.email ?? '',
          birthDate: initialData?.birthDate ? new Date(initialData.birthDate) : null,
          telephone: initialData?.telephone ?? '',
          employment: initialData?.employment ?? '',
          userAgreement: initialData?.userAgreement ?? false,
        }}
        validate={validateWithZod}
        onSubmit={(values) => {
          const prepared = {
            ...values,
            birthDate: values.birthDate ? new Date(values.birthDate).toISOString() : null,
          };
          onSubmit(prepared);
        }}
      >
        {({ values, handleChange, setFieldValue, touched, errors }) => (
          <Form>
            <div className={styles.formGroup}>
              <label>Name *</label>
              <TextField
                name="name"
                value={values.name}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue('fullName', `${e.target.value} ${values.surName}`);
                }}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name as string}
                fullWidth
                variant="standard"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Surname *</label>
              <TextField
                name="surName"
                value={values.surName}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue('fullName', `${values.name} ${e.target.value}`);
                }}
                error={!!touched.surName && !!errors.surName}
                helperText={touched.surName && errors.surName as string}
                fullWidth
                variant="standard"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Password *</label>
              <TextField
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password as string}
                fullWidth
                variant="standard"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Full Name *</label>
              <TextField
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName as string}
                fullWidth
                variant="standard"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Email *</label>
              <TextField
                name="email"
                value={values.email}
                onChange={handleChange}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email as string}
                fullWidth
                variant="standard"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Birth Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={values.birthDate ? dayjs(values.birthDate) : null}
                  onChange={(newValue) =>
                    setFieldValue('birthDate', newValue ? newValue.toDate() : null)
                  }
                />
              </LocalizationProvider>
            </div>

            <div className={styles.formGroup}>
              <label>Telephone</label>
              <TextField
                name="telephone"
                value={values.telephone}
                onChange={handleChange}
                error={!!touched.telephone && !!errors.telephone}
                helperText={touched.telephone && errors.telephone as string}
                fullWidth
                variant="standard"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Employment</label>
              <FormControl fullWidth variant="standard">
                <Select
                  name="employment"
                  value={values.employment}
                  onChange={handleChange}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="frontend">Frontend</MenuItem>
                  <MenuItem value="backend">Backend</MenuItem>
                  <MenuItem value="fullstack">Fullstack</MenuItem>
                  <MenuItem value="DevOps">Devops</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={styles.formGroup}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="userAgreement"
                    checked={values.userAgreement}
                    onChange={handleChange}
                  />
                }
                label="I agree with the terms *"
              />
              {touched.userAgreement && errors.userAgreement && (
                <p style={{ color: 'red', fontSize: 12 }}>{errors.userAgreement as string}</p>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
              <Button type="button" variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
