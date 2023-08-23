"use client";

import {
  DatePicker,
  DynamicPage,
  DynamicPageTitle,
  Form,
  FormItem,
  Input,
  MessageStrip,
  MessageStripDesign,
  Switch,
  TextArea,
} from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";

export default function TodoDetails({ params }: { params: { id: string } }) {
  const [todoDetails, setTodoDetails] = useState({});

  const getTodoDetails = async () => {
    const response = await fetch(
      `/odata/v4/service/todo/Todos(ID=${params.id},IsActiveEntity=true)`,
      {
        method: `GET`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  };

  useEffect(() => {
    // cannot have async calls in a useEffect but can in a function within the useEffect.
    const fetchData = async () => {
      const result = await getTodoDetails();
      setTodoDetails(result);
    };

    fetchData();
  }, []);

  return (
    <>
      <DynamicPage
        showHideHeaderButton={false}
        headerTitle={<DynamicPageTitle header={todoDetails?.title} />}
      >
        <MessageStrip design={MessageStripDesign.Information}>
          {`Since this is only a demo app, adjustments made here on this page won't be reflected in the todo list.`}
        </MessageStrip>
        <Form>
          <FormItem label={"Title"}>
            <Input value={todoDetails?.title} />
          </FormItem>
          <FormItem label={"Details"}>
            <TextArea
              value={todoDetails?.details}
              growing
              growingMaxLines={10}
            />
          </FormItem>

          <FormItem label={"Due Date"}>
            <DatePicker />
          </FormItem>
          <FormItem label={"Completed"}>
            <Switch checked={todoDetails?.completed} />
          </FormItem>
        </Form>
      </DynamicPage>
    </>
  );
}
