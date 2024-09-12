import { IColumn, ITable } from "./iTable";

export default interface ITableStore extends ITable {
    setTableName(tableName: string): void,
    setAutogenerateId(autogenerateId: boolean): void,
    addColumn(): void,
    removeColumn(id: IColumn['id']): void,
    updateColumn<K extends keyof IColumn>(id: number, prop: K, value: IColumn[K]): void
}