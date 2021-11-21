function sortArray(array, field, order) {
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

async function loadCouncils(filters, sorting) {
    const response = await fetch('http://ws-old.parlament.ch/councillors?format=json');
    const data = await response.json();
    const filteredData = (filters && (filters.id || filters.firstName || filters.lastName)) ? (
        data.filter(({ id, firstName, lastName }) => (
            (filters.id && `${id}`.indexOf(filters.id) >= 0) ||
            (filters.firstName && firstName.indexOf(filters.firstName) >= 0) ||
            (filters.lastName && lastName.indexOf(filters.lastName)) >= 0
        ))
    ) : data;
    if (sorting && sorting.field && sorting.order) {
        sortArray(filteredData, sorting.field, sorting.order);
    }
    return filteredData;
}

await loadCouncils({ firstName: 'Jakob' });