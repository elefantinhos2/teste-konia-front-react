import { useEffect, useState } from "react";
import './App.css';
import ItemList from "./components/itemList";
import api from "./services/api";

function App() {

    
  const [listItem, setListItem] = useState([])


  function loadItem() {
    api.get("item/")
    .then((response) => setListItem(response.data))
    .catch((err) =>  console.log(err));
  }

  useEffect(() => {
      loadItem();
  },[])

  return (
    <div className="App">
      <ItemList listItem={listItem} setListItem={setListItem}/>
    </div>
  ); 

}

export default App;

