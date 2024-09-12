export interface IColumn {
    id: number,
    primaryKey: boolean,
    foreignKey: boolean,
    nullable: boolean,
    type: string,
    columnName: string,
    foreignTable: string,
    foreignColumn: string
}

export interface ITable {
    tableName: string,
    autogenerateId: boolean,
    columns: IColumn[]
}