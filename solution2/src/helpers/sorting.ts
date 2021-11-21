export function sortArray(array: any[], field: string, order: 'asc' | 'desc') {
  array.sort((a, b) => {
      let comparison = 0;
      if (a[field] > b[field]) {
        comparison = order === 'asc' ? 1 : -1;
      } else if (a[field] < b[field]) {
        comparison = order === 'asc' ? -1 : 1;
      }
      return comparison;
    }
  )
}
