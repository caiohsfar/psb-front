import React, { useEffect,useState } from "react";
import { Container, Menu,Grid } from "semantic-ui-react";


export default function Bar({ active }) {
  const [items, setItems] = useState([
    { key: 'app', active: true, name: 'VM App'},
  ])

  useEffect(() => {
  const newItems = items.map(item => {
    if (item.key === active) {
      item.active = true
    }
    return item;
  }) 

  setItems(newItems);
    
  }, []);

  

  return (
    <Grid>
      <Grid.Column width={4}>
      <Menu fluid vertical tabular items={items}>
    </Menu>
      </Grid.Column>
    </Grid>
   
  );
}
