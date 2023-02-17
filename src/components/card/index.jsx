import "./style.css"

function TableCard(object) {

    const {id, name, create_at} = object.object

    return (
        <tr className="itemTable">
            <td className="itemId">{id}</td>
            <td>{name}</td>
            <td className="itemCreated">{create_at}</td>
        </tr>
    )
}

export default TableCard