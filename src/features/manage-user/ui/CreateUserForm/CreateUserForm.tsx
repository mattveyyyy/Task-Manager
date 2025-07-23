import { Formik, Form } from 'formik';
import { z } from 'zod';
import {createUser} from '@shared/api/user';
import {
    TextField,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    FormControl,
    Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './CreateUserForm.module.css';
import { useNavigate } from 'react-router-dom';

const userSchema = z.object({
  name: z.string().min(1, 'Required').max(64),
  surName: z.string().min(1, 'Required').max(64),
  password: z.string().min(1, 'Required'),
  fullName: z.string().min(1, 'Required').max(130),
  email: z.string().email('Invalid email'),
  birthDate: z
    .union([z.date(), z.null()])
    .optional(),
  telephone: z
    .string()
    .transform((val) => val.trim())
    .refine(
      (val) => val === '' || /^\+?\d{10,15}$/.test(val),
      { message: 'Invalid phone number' }
    ),
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

export function CreateUserForm() {
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const prepared = {
        ...values,
        birthDate: values.birthDate
          ? new Date(values.birthDate).toISOString()
          : null,
      };

      await createUser(prepared);
        navigate('/');
      } catch (err: any) {
        console.error(err);
        alert('Ошибка при создании пользователя: ' + err.message);
      }
  };
  
  return (
    <div className={styles.container}>
      <h5>Create New User</h5>
      <Formik
        initialValues={{
          name: '',
          surName: '',
          password: '',
          fullName: '',
          email: '',
          birthDate: null,
          telephone: '',
          employment: '',
          userAgreement: false,
        }}
        validate={validateWithZod}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => (
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
                helperText={touched.name && errors.name}
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
                helperText={touched.surName && errors.surName}
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
                helperText={touched.password && errors.password}
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
                helperText={touched.fullName && errors.fullName}
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
                helperText={touched.email && errors.email}
                fullWidth
                variant="standard"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Birth Date</label>
              <DatePicker
                value={values.birthDate}
                onChange={(newValue) => setFieldValue('birthDate', newValue)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Telephone</label>
              <TextField
                name="telephone"
                value={values.telephone}
                onChange={handleChange}
                error={!!touched.telephone && !!errors.telephone}
                helperText={touched.telephone && errors.telephone}
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
                <p style={{ color: 'red', fontSize: 12 }}>{errors.userAgreement}</p>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
              <Button type="reset" variant="outlined">
                Reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
