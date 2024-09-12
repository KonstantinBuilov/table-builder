import { IColumn } from "../interfaces/iTable";
import { observer } from "mobx-react-lite";
import { getClassAttribute, getTypeAttribute, getValueAttribute } from "../utils/componentUtils";
import tableStore from "../stores/tableStore";

const Column = observer(({ column }: { column: IColumn }) => {
    function getInputAttribs(key: keyof IColumn) {
        return {
            ...getTypeAttribute(key, column),
            ...getValueAttribute(key, column),
            ...getClassAttribute(key, column.foreignKey),
            onChange(e: React.ChangeEvent<HTMLInputElement>) {
                const value = typeof column[key] === 'boolean' ? e.target.checked : e.target.value;
                tableStore.updateColumn(column.id, key, value);
            }
        }
    }

    return (
        <tr>
            <td>
                <button className="btn" onClick={() => tableStore.removeColumn(column.id)}>Remove</button>
            </td>
            {(Object.keys(column) as Array<keyof IColumn>).map((key, index) => {
                return key !== 'id' &&
                    <td key={index}>
                        <input className="control" {...getInputAttribs(key)} />
                    </td>
            })}
        </tr>
    );
});

export default Column;