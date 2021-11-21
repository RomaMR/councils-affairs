import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import {Councillors, Councils} from "../../types";
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
          <Button color='primary' size='large' endIcon={(<SendOutlined />)}>
            Councils
          </Button>
        </Link>
      )}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>firstName</TableCell>
              <TableCell>lastName</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {councillors.map((council: Councillors) => (
              <TableRow key={council.id}>
                <TableCell>{council.id}</TableCell>
                <TableCell>{council.firstName}</TableCell>
                <TableCell>{council.lastName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
}

export default CouncillorsPage;
