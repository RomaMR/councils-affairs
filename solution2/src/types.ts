export interface Councils {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Sorting {
  field: string;
  order: 'asc' | 'desc';
}
