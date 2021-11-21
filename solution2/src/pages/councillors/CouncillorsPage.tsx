import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Councillors } from "../../types";
import Page from "../../components/page/Page";
import useCouncillorsContext from "../../hooks/useCouncillorsContext/useCouncillorsContext";
import { CouncillorsFields, SortingFields } from "../../constants/fields";
import Form from "../../components/form/Form";
import ROUTES from "../../constants/routes";
import styles from './CouncillorsPage.module.scss';

function CouncillorsPage() {
  const {
    councillors,
    filters,
    setFilters,
    sorting,
    setSorting,
  } = useCouncillorsContext();

  const onFilter = useCallback((data: any) => {
    setFilters(data);
  }, [setFilters]);

  const onSort = useCallback((data: any) => {
    setSorting(data);
  }, [setSorting]);

  return (
    <Page
      title='Councillors'
      aside={[
        <Form
          header='Filters'
          fields={[
            {
              label: 'ID',
              field: CouncillorsFields.Id
            },
            {
              label: 'First Name',
              field: CouncillorsFields.FirstName
            },
            {
              label: 'Last Name',
              field: CouncillorsFields.LastName
            },
          ]}
          values={filters || {}}
          onSubmit={onFilter}
        />,
        <Form
          header='Sorting'
          fields={[
            {
              label: 'Field',
              field: SortingFields.Field
            },
            {
              label: 'Order',
              field: SortingFields.Order
            },
          ]}
          values={sorting || {}}
          onSubmit={onSort}
        />
      ]}
      actions={(
        <Link to={ROUTES.councils}>
          <h3>Councils</h3>
        </Link>
      )}
    >
      <div className={styles.list}>
        {councillors.map((council: Councillors) => (
          <div key={council.id} className={styles.listItem}>
            <div>{council.id}</div>
            <div>{council.firstName}</div>
            <div>{council.lastName}</div>
          </div>
        ))}
      </div>
    </Page>
  );
}

export default CouncillorsPage;
