import React from "react";
import { List, Button, Grid } from "semantic-ui-react";

export default function VmList({ items, onExecute, onClone }) {
  function renderItems() {
    return items.map(function (item) {
      return (
        <List.Item
            key={item.key}
          style={{
            width: 400,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <List.Content style={{ marginRight: "auto" }}>{item.name}</List.Content>
          <List.Content>
            <Button onClick={(e) => onExecute(item.name)} size="small" primary>
              Rodar
            </Button>
            <Button onClick={(e) => onClone(item.name)} size="small" secondary>
              Clonar
            </Button>
          </List.Content>
        </List.Item>
      );
    });
  }
  return (
    <List
        items={renderItems()}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        celled
        verticalAlign="middle"
        
    />

  );
}
