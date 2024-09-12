import { observer } from "mobx-react-lite";
import tableStore from "../stores/tableStore";
import TableGenerator from "../utils/tableGenerator";
import { useState } from "react";
import { saveFile } from "../utils/fileUtils";

const Menu = observer(() => {
    const [ddl, setDdl] = useState('');
    const [isPreview, setIsPreview] = useState(false);

    function showPreview() {
        const { tableName, autogenerateId, columns } = tableStore;
        const generator = new TableGenerator(tableName, autogenerateId, columns);
        setDdl(generator.generate());
        setIsPreview(true);
    }

    function save() {
        saveFile(`${tableStore.tableName}.sql`, new Blob([ddl]));
    }

    return (
        <>
            <header className="header section">
                {!isPreview && <button className="btn" onClick={showPreview} disabled={!tableStore.isDataPersist}>Show Preview</button>}
                {isPreview && <button className="btn" onClick={() => setIsPreview(false)}>Hide Preview</button>}
                {isPreview && <button className="btn" onClick={save}>Save</button>}
            </header>
            {isPreview && <textarea className="preview control" value={ddl} onChange={e => setDdl(e.target.value)} />}
        </>
    );
});

export default Menu;