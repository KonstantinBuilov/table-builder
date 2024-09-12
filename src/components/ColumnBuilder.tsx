import { observer } from "mobx-react-lite";
import tableStore from "../stores/tableStore";
import Column from "./Column";
import { transformHeaderName } from "../utils/stringUtils";
import { IColumn } from "../interfaces/iTable";
import { getClassAttribute } from "../utils/componentUtils";

const ColumnBuilder = observer(() => {
    return (
        <section className="section">
            <button className="btn" onClick={tableStore.addColumn}>Add Column</button>
            {tableStore.columns.length > 0 && <table className="column_table">
                <thead>
                    <tr>
                        <th></th>
                        {(Object.keys(tableStore.columns[0]) as Array<keyof IColumn>).map((key, index) => {
                            return key !== 'id' &&
                                <th key={index} {...getClassAttribute(key, tableStore.isForegnKeyEnabled)}>
                                    {transformHeaderName(key)}
                                </th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableStore.columns.map(column => {
                        return <Column key={column.id} column={column} />
                    })}
                </tbody>
            </table>}
        </section>
    );
});

export default ColumnBuilder;