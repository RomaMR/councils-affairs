export interface Councillors {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Councils {
  id: number;
  abbreviation: string;
  code: string;
  name: string;
  type: string;
}

export interface Sorting {
  field: string;
  order: 'asc' | 'desc';
}
