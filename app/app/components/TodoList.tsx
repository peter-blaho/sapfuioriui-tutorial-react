"use client";

import {
  List,
  ListItemType,
  ListPropTypes,
  StandardListItem,
  ValueState,
} from "@ui5/webcomponents-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function TodoList() {
  const router = useRouter();
  const handleTodoClick: ListPropTypes["onItemClick"] = (event) => {
    router.push(`/todos/${event.detail.item.dataset.id}`);
  };

  const [todoList, setTodoList] = useState([]);

  const getTodoList = async () => {
    const response = await fetch("/odata/v4/service/todo/Todos", {
      method: `GET`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  useEffect(() => {
    // cannot have async calls in a useEffect but can in a function within the useEffect.
    const fetchData = async () => {
      const result = await getTodoList();
      setTodoList(result.value);
    };

    fetchData();
  }, []);

  return (
    <List onItemClick={handleTodoClick} style={{ marginBottom: "5rem" }}>
      {todoList.map((todo) => {
        return (
          <StandardListItem
            key={todo.ID}
            data-id={todo.ID}
            type={ListItemType.Navigation}
            additionalText={`${!todo.completed ? "Not " : ""}Completed`}
            additionalTextState={
              todo.completed ? ValueState.Success : ValueState.None
            }
          >
            {todo.title}
          </StandardListItem>
        );
      })}
    </List>
  );
}
