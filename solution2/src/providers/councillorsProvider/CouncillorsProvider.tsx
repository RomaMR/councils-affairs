import React, { createContext, useEffect, useMemo, useState } from 'react';
import { sortArray } from "../../helpers/sorting";
import { Councillors, Sorting } from "../../types";
import axios from "axios";

export interface ICouncillorsContext {
  councillors: Councillors[];
  filters: Councillors | undefined,
  setFilters: (v: Councillors) => void,
  sorting: Sorting | undefined,
  setSorting: (v: Sorting) => void,
}

export const CouncillorsContext = createContext<ICouncillorsContext>(null!);

interface CouncillorsProviderProps {
  children: JSX.Element | JSX.Element[];
}

export default function CouncillorsProvider({ children }: CouncillorsProviderProps) {
  const [filters, setFilters] = useState<Councillors>();
  const [sorting, setSorting] = useState<Sorting>();
  const [unprocessedCouncillors, setUnprocessedCouncillors] = useState<Councillors[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/councillors?format=json");
      setUnprocessedCouncillors(response.data);
    })();
  }, []);

  const filteredCouncillors: Councillors[] = useMemo(() => {
    return (filters && (filters.id || filters.firstName || filters.lastName)) ? (
      unprocessedCouncillors.filter(({ id, firstName, lastName }) => (
        (filters.id && `${id}`.indexOf(`${filters.id}`) >= 0) ||
        (filters.firstName && firstName.indexOf(filters.firstName) >= 0) ||
        (filters.lastName && lastName.indexOf(filters.lastName)) >= 0
      ))
    ) : unprocessedCouncillors
  }, [unprocessedCouncillors, filters]);

  const councillors: Councillors[] = useMemo(() => {
    if (sorting && sorting.field && sorting.order) {
      sortArray(filteredCouncillors, sorting.field, sorting.order);
    }
    return [...filteredCouncillors];
  }, [filteredCouncillors, sorting]);

  return (
    <CouncillorsContext.Provider
      value={{
        councillors,
        filters,
        setFilters,
        sorting,
        setSorting,
      }}
    >
      {children}
    </CouncillorsContext.Provider>
  );
}
