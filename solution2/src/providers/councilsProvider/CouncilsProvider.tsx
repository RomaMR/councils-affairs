import React, { createContext, useEffect, useMemo, useState } from 'react';
import { sortArray } from "../../helpers/sorting";
import { Councils, Sorting } from "../../types";
import axios from "axios";

export interface ICouncilsContext {
  councils: Councils[];
  filters: Councils | undefined,
  setFilters: (v: Councils) => void,
  sorting: Sorting | undefined,
  setSorting: (v: Sorting) => void,
}

export const CouncilsContext = createContext<ICouncilsContext>(null!);

interface CouncilsProviderProps {
  children: JSX.Element | JSX.Element[];
}

export default function CouncilsProvider({ children }: CouncilsProviderProps) {
  const [filters, setFilters] = useState<Councils>();
  const [sorting, setSorting] = useState<Sorting>();
  const [unprocessedCouncils, setUnprocessedCouncils] = useState<Councils[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/councillors?format=json");
      setUnprocessedCouncils(response.data);
    })();
  }, []);

  const filteredCouncils: Councils[] = useMemo(() => {
    return (filters && (filters.id || filters.firstName || filters.lastName)) ? (
      unprocessedCouncils.filter(({ id, firstName, lastName }) => (
        (filters.id && `${id}`.indexOf(`${filters.id}`) >= 0) ||
        (filters.firstName && firstName.indexOf(filters.firstName) >= 0) ||
        (filters.lastName && lastName.indexOf(filters.lastName)) >= 0
      ))
    ) : unprocessedCouncils
  }, [unprocessedCouncils, filters]);

  const councils: Councils[] = useMemo(() => {
    if (sorting && sorting.field && sorting.order) {
      sortArray(filteredCouncils, sorting.field, sorting.order);
    }
    return [...filteredCouncils];
  }, [filteredCouncils, sorting]);

  return (
    <CouncilsContext.Provider
      value={{
        councils,
        filters,
        setFilters,
        sorting,
        setSorting,
      }}
    >
      {children}
    </CouncilsContext.Provider>
  );
}
