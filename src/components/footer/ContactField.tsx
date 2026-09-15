import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

type ContactFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  type?: 'text' | 'email';
  multiline?: boolean;
  minRows?: number;
  error?: boolean;
  /** Always rendered (a space when there is no error) so the layout does not jump. */
  helperText?: string;
};

/**
 * The outlined-input half of MUI's `TextField`, assembled by hand.
 *
 * `TextField` statically imports `Select` (and with it Menu/Popover/roving-tab-index, ~57 kB
 * of code this form never runs), so the primitives it would render are composed directly.
 */
function ContactField({
  label,
  name,
  value,
  onChange,
  autoComplete,
  type = 'text',
  multiline = false,
  minRows,
  error = false,
  helperText = ' ',
}: ContactFieldProps) {
  const id = `contact-${name}`;
  const helperId = `${id}-helper`;

  return (
    <FormControl required error={error} variant="outlined" fullWidth>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        label={label}
        type={type}
        autoComplete={autoComplete}
        multiline={multiline}
        minRows={minRows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={helperId}
      />
      <FormHelperText id={helperId}>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default ContactField;
