import { IColumn } from "../interfaces/iTable";

export default class TableGenerator {
    constructor(tableName: string, autogenerateId: boolean, columns: IColumn[]) {
        this.tableName = tableName.toUpperCase();
        this.autogenerateId = autogenerateId;
        this.columns = columns;
    }

    private tableName;
    private autogenerateId;
    private columns;

    generate() {
        let ddl = this.generateTable();
        if (this.autogenerateId) {
            ddl += '\n\n' + this.generateSequence();
        }
        return ddl.replace(/\n/g, '\r\n');
    }

    private generateTable(): string {
        const primaryColumn = this.columns.find(column => column.primaryKey);

        return `CREATE TABLE ${this.tableName} (
    ${this.columns.map(column => this.generateColumn(column)).join(',\n    ')},
    ${this.columns.filter(column => column.foreignKey).map((column, index) => this.generateForeignKey(column, index))}
    CONSTRAINT PK_${this.tableName} PRIMARY KEY (${primaryColumn?.columnName.toUpperCase()})
);`
    }

    private generateColumn(column: IColumn) {
        return `${column.columnName.toUpperCase()} ${column.type.toUpperCase()} ${column.nullable ? '' : 'NOT NULL ENABLE'}`;
    }

    private generateForeignKey(column: IColumn, index: number) {
        return `CONSTRAINT FK${index}_${this.tableName} FOREIGN KEY (${column.columnName.toUpperCase()}) REFERENCES ${column.foreignTable.toUpperCase()} (${column.foreignColumn.toUpperCase()}) ON DELETE CASCADE ENABLE`;
    }

    private generateSequence(): string {
        const primaryColumn = this.columns.find(column => column.primaryKey);
        return `CREATE SEQUENCE SEQ_${primaryColumn?.columnName.toUpperCase()};
        
CREATE OR REPLACE TRIGGER ${this.tableName}_BEFORE_INSERT
    before insert on ${this.tableName}
    for each row
begin
    if :new.${primaryColumn?.columnName} is null then
        :new.${primaryColumn?.columnName} := seq_${primaryColumn?.columnName}.nextval;
    end if;
end;
/`
    }
}