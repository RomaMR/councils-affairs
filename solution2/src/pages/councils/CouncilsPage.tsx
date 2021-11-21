import React, { useCallback } from 'react';
import useCouncilsContext from "../../hooks/useCouncilsContext/useCouncilsContext";
import { Councils } from "../../types";
import Page from "../../components/page/Page";
import { CouncilsFields, SortingFields } from "../../constants/fields";
import Form from "../../components/form/Form";
import styles from './CouncilsPage.module.scss';
import {Link} from "react-router-dom";
import ROUTES from "../../constants/routes";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {SendOutlined} from "@material-ui/icons";

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
          <Button color='primary' size='large' endIcon={(<SendOutlined />)}>
            Councillors
          </Button>
        </Link>
      )}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>abbreviation</TableCell>
              <TableCell>code</TableCell>
              <TableCell>name</TableCell>
              <TableCell>type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {councils.map((council: Councils) => (
              <TableRow key={council.id}>
                <TableCell>{council.id}</TableCell>
                <TableCell>{council.abbreviation}</TableCell>
                <TableCell>{council.code}</TableCell>
                <TableCell>{council.name}</TableCell>
                <TableCell>{council.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
}

export default CouncilsPage;
