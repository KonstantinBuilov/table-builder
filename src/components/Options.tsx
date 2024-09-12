import { observer } from "mobx-react-lite";
import tableStore from "../stores/tableStore";

const Options = observer(() => {
    return (
        <section className="options section">
            <label className="lbl_control">
                Table Name
                <input
                    type="text"
                    className="control"
                    value={tableStore.tableName}
                    onChange={e => tableStore.setTableName(e.target.value)}
                />
            </label>
            <label className="lbl_control">
                Autogenerate Id
                <input
                    type="checkbox"
                    className="control"
                    checked={tableStore.autogenerateId}
                    onChange={e => tableStore.setAutogenerateId(e.target.checked)}
                />
            </label>
        </section>
    )
});

export default Options;