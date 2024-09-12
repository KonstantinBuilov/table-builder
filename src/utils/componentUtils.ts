import { IColumn } from "../interfaces/iTable";

export function getClassAttribute(key: keyof IColumn, isForegnKeyEnabled: boolean) {
    const isHidden = ['foreignColumn', 'foreignTable'].includes(key) && !isForegnKeyEnabled;
    return isHidden && { className: 'hidden' };
}

export function getTypeAttribute(key: keyof IColumn, column: IColumn) {
    if (key === 'primaryKey') {
        return { type: 'radio' };
    } else if (typeof column[key] === 'boolean') {
        return { type: 'checkbox' };
    } else if (typeof column[key] === 'string') {
        return { type: 'text' };
    } else {
        return '';
    }
}

export function getValueAttribute(key: keyof IColumn, column: IColumn) {
    if ( typeof column[key] === 'boolean') {
        return { checked: column[key] as boolean }
    } else if (typeof column[key] === 'string') {
        return { value: column[key] as string }
    } else {
        return '';
    }
}