import { makeAutoObservable } from "mobx";
import { IColumn } from "../interfaces/iTable";
import ITableStore from "../interfaces/iTableStore";

class TableStore implements ITableStore {
    constructor() {
        makeAutoObservable(this);
    }

    tableName = '';
    autogenerateId = false;
    columns: IColumn[] = [];
    id = 0;

    setTableName = (tableName: string) => {
        this.tableName = tableName;
    }

    setAutogenerateId = (autogenerateId: boolean) => {
        this.autogenerateId = autogenerateId;
    }

    addColumn = () => {
        this.columns.push({
            id: this.id++,
            primaryKey: !this.columns.length,
            foreignKey: false,
            nullable: false,
            type: '',
            columnName: '',
            foreignColumn: '',
            foreignTable: ''
        });
    }

    removeColumn = (id: number) => {
        this.columns = this.columns.filter(column => column.id !== id);
    }

    updateColumn = <K extends keyof IColumn>(id: number, prop: K, value: IColumn[K]) => {
        const column = this.columns.find(column => column.id === id);
        if (column) {
            if (prop === 'primaryKey') {
                this.columns.forEach(column => column.primaryKey = false);
            }
            column[prop] = value;
        }
    }

    get isDataPersist() {
        return this.tableName.length > 0
            && this.columns.length > 0
            && this.columns.every(column => column.columnName.length > 0 && column.type.length > 0);
    }

    get isForegnKeyEnabled() {
        return this.columns.some(column => column.foreignKey);
    }
}

const tableStore = new TableStore();

export default tableStore; 