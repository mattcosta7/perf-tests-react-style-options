const params = new URLSearchParams(window.location.search);
export const rowsCount = parseInt(params.get('rows') ?? '72', 10)
export const columnsCount = parseInt(params.get('cols') ?? '100', 10)

