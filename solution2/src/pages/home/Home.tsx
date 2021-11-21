import React, {useCallback} from 'react';
import { Formik, FormikProps } from 'formik';
import useCouncilsContext from "../../hooks/useCouncilsContext/useCouncilsContext";
import { Councils } from "../../types";
import Page from "../../components/page/Page";
import Input from "../../components/input/Input";
import {CouncilsFields, SortingFields} from "../../constants/fields";
import styles from './Home.module.scss';

function Home() {
  const {
    councils,
    filters,
    setFilters,
    sorting,
    setSorting,
  } = useCouncilsContext();

  const onFilter = useCallback((data: any) => {
    setFilters(data);
  }, [setFilters]);

  const onSort = useCallback((data: any) => {
    setSorting(data);
  }, [setSorting]);

  return (
    <Page title='Councils'>
      <div className={styles.home}>
        <div className={styles.homeFilters}>
          <Formik
            validateOnMount
            enableReinitialize
            initialValues={filters || {}}
            onSubmit={onFilter}
          >
            {(form: FormikProps<any>) => (
              <fieldset className={styles.questionAsk}>
                <h3>Filters</h3>
                <Input
                  label='ID'
                  form={form}
                  name={CouncilsFields.Id}
                />
                <Input
                  label='First Name'
                  form={form}
                  name={CouncilsFields.FirstName}
                />
                <Input
                  label='Last Name'
                  form={form}
                  name={CouncilsFields.LastName}
                />
                <button
                  className={styles.homeFiltersApply}
                  onClick={form.submitForm}
                >
                  Apply
                </button>
              </fieldset>
            )}
          </Formik>
          <Formik
            validateOnMount
            enableReinitialize
            initialValues={sorting || {}}
            onSubmit={onSort}
          >
            {(form: FormikProps<any>) => (
              <fieldset className={styles.questionAsk}>
                <h3>Sorting</h3>
                <Input
                  label='Field'
                  form={form}
                  name={SortingFields.Field}
                />
                <Input
                  label='Order'
                  form={form}
                  name={SortingFields.Order}
                />
                <button
                  className={styles.homeFiltersApply}
                  onClick={form.submitForm}
                >
                  Apply
                </button>
              </fieldset>
            )}
          </Formik>
        </div>
        <div className={styles.homeCouncils}>
          {councils.map((council: Councils) => (
            <div key={council.id} className={styles.homeCouncilsItem}>
              <div>{council.id}</div>
              <div>{council.firstName}</div>
              <div>{council.lastName}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

export default Home;
