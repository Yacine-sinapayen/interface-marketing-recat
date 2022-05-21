import Navbar from './Components/Navbar/Navbar';
import Action from './Components/Action/Action';
import AddAction from './Components/AddAction/AddAction';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import { Routes, Route } from 'react-router-dom';

function App() {

  const [actions, setActions] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);


  // Récupéartion de toues les actions
  const getUsers = async () => {
    await fetch('https://squedio.com/marketing/api/v1/actions')
      .then((response) => response.json())
      .then((data) => setActions(data))
      .catch((err) => {
        console.log(err);
      })
  };
  console.log(actions)

  // Ajout d'une action
  const onAdd = async ( title, media,tags,target_url) => {
    await fetch('https://squedio.com/marketing/api/v1/actions', {
      method: 'POST',
      body: JSON.stringify({
        id: uuidv4(),
        title: title,
        media: media,
        tags: tags,
        target_url: target_url
      }),
      headers: {
        "Content-type": "application/json; charset=UTF+8",
      }
    })
      .then((res) => {
        if (res.status !== 201) {
          return
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setActions((actions) => [...actions, data]);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <>
      <Navbar />
      <AddAction actions={actions} setActions={setActions} onAdd={onAdd} />
      <Action actions={actions} setActions={setActions} />
    </>
  );
}

export default App;
