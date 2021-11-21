import React, { useCallback, ChangeEvent } from 'react';
import { FormikProps } from 'formik';

interface InputsProps {
  form: FormikProps<any>;
  name: string;
  label?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
}

function Input({ form, name, label, type = 'text', className, disabled }: InputsProps) {

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(name, event.target.value)
  }, [form, name]);

  return (
    <div className={className}>
      <strong>{label}</strong>
      <input
        type={type}
        onChange={onChange}
        value={form.values[name]}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
