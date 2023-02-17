import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import api from "../../services/api";
import TableCard from "../card";
import "./style.css";
function ItemList({listItem, setListItem}) {
    console.log(listItem)

    const [modal, setModal] = useState("containerModal hidden");
    const [inOn, setInOn] = useState(false);

    const schema = yup.object().shape({
        name: yup
        .string()
        .required("required field!")
    });

    const {register, handleSubmit, resetField,formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onRegister = ({name}) => {


 
        api.post("item/",
            {
                name: name
            }
        )
        .then((response) => {
            console.log(response)
            loadItem()
            setInOn(false);
            return setModal("containerModal hidden")
        })
        .catch((err) =>  console.log(err));
        resetField("name");
    }


    const showModal = () => {

        if( inOn === false ) {
            setInOn(true);
            return setModal("containerModal")
        } else {
            setInOn(false);
            return setModal("containerModal hidden")
        }
    }

    const removeModal = () => {
        setInOn(false);
        return setModal("containerModal hidden")
    }

    function loadItem() {
        api.get("item/")
        .then((response) => setListItem(response.data))
        .catch((err) =>  console.log(err));
      }
    
      useEffect(() => {
          loadItem();
      },[])

    return (
        <div className="container">
            <h2>Itens Do Inventário</h2>
            <div className="containerButton">
                <button onClick={() => showModal()}><span>+</span> Novo Item</button>
            </div>
            <section className={modal}>
                <div className="modal">
                    <div className="modalHeader">
                        <h1>Cadastrar Novo Item</h1>
                        <button className="removedModal" onClick={() => removeModal()}>x</button>
                    </div>
                    <form className="modalForm" onSubmit={handleSubmit(onRegister)}>
                        <label>Nome do Item</label>
                        <input type="text"  placeholder="Informe um novo item"  {...register("name")}></input>
                        <button type="submit">Adicionar Item</button>
                    </form>
                </div>
            </section>
            <table>
                <thead>
                    <tr>
                        <th className="columnId">ID</th>
                        <th className="columnName">Nome Do Item</th>
                        <th className="columnCreated">Data De Criação</th>
                    </tr>
                </thead>
                <tbody>
                    {listItem.map((object, index) => {
                        return <TableCard key={index} object={object}/>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ItemList