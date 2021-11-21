import React from 'react';
import { Formik, FormikProps } from 'formik';
import Input from "../input/Input";
import styles from "./Form.module.scss";

interface FormProps {
  header: string;
  fields: { label: string, field: string }[];
  values: any;
  onSubmit: (data: any) => void;
}

function Form({ header, fields, values, onSubmit }: FormProps) {

  return (
    <Formik
      validateOnMount
      enableReinitialize
      initialValues={values}
      onSubmit={onSubmit}
    >
      {(form: FormikProps<any>) => (
        <fieldset className={styles.form}>
          <h3>{header}</h3>
          {fields.map((item) => (
            <Input
              key={item.field}
              label={item.label}
              form={form}
              name={item.field}
            />
          ))}
          <button
            className={styles.formApply}
            onClick={form.submitForm}
          >
            Apply
          </button>
        </fieldset>
      )}
    </Formik>
  );
}

export default Form;
