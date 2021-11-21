import React, { useCallback } from 'react';
import useCouncilsContext from "../../hooks/useCouncilsContext/useCouncilsContext";
import { Councils } from "../../types";
import Page from "../../components/page/Page";
import { CouncilsFields, SortingFields } from "../../constants/fields";
import Form from "../../components/form/Form";
import styles from './CouncilsPage.module.scss';
import {Link} from "react-router-dom";
import ROUTES from "../../constants/routes";

function CouncilsPage() {
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
    <Page
      title='Councils'
      aside={[
        <Form
          header='Filters'
          fields={[
            {
              label: 'ID',
              field: CouncilsFields.Id
            },
            {
              label: 'Abbreviation',
              field: CouncilsFields.Abbreviation
            },
            {
              label: 'Code',
              field: CouncilsFields.Code
            },
            {
              label: 'Name',
              field: CouncilsFields.Name
            },
            {
              label: 'Type',
              field: CouncilsFields.Type
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
        <Link to={ROUTES.councillors}>
          <h3>Councillors</h3>
        </Link>
      )}
    >
      <div className={styles.list}>
        {councils.map((council: Councils) => (
          <div key={council.id} className={styles.listItem}>
            <div>{council.id}</div>
            <div>{council.abbreviation}</div>
            <div>{council.code}</div>
            <div>{council.name}</div>
            <div>{council.type}</div>
          </div>
        ))}
      </div>
    </Page>
  );
}

export default CouncilsPage;
