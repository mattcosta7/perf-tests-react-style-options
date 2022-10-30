const params = new URLSearchParams(window.location.search);
const MODES = new Set<Modes>(['update', 'mount']);
export type Modes = 'update' | 'mount';

export const rowsCount = getNumberFromParam(params, 'rows', 10)
export const columnsCount = getNumberFromParam(params, 'cols', 10)
export const iterations = getNumberFromParam(params, 'iterations', 1000)
export const mode = getModeFromParam(params, 'update');


function assertMode(s: string): s is Modes {
    return MODES.has(s as Modes)
}

function getModeFromParam(p: URLSearchParams, defaultMode: 'update' | 'mount'): Modes {
    const paramName = 'mode'
    const mode = p.get(paramName);
    if (mode === null) {
        return defaultMode;
    }
    const lowerMode = mode.toLowerCase();
    if (assertMode(lowerMode) && mode !== defaultMode) {
        return lowerMode;
    }
    removeUrlParams('mode')
    return defaultMode;
}

function removeUrlParams(item: 'rows' | 'cols' | 'iterations' | 'mode') {
    params.delete(item)
    window.history.replaceState({}, '', `?${params.toString()}`);
}

function getNumberFromParam(p: URLSearchParams, name: 'rows' | 'iterations' | 'cols', defaultValue: number): number {
    const value = p.get(name);
    if (value === null) {
        return defaultValue;
    }
    const int = parseInt(value, 10);
    if (Number.isNaN(int) || int === defaultValue) {
        removeUrlParams(name)
        return defaultValue
    }

    return int;

}

