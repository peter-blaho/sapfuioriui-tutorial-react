import { TodoList } from "@/app/components/TodoList";
import { Todo, todos } from "@/app/mockData/todos";
import { Bar, Page, Title } from "@ui5/webcomponents-react";
import { RiskList } from "./components/RiskList";

export default async function Home() {
  // this is a very simple mock which mimics data fetching
  const todoList = await new Promise<Todo[]>((resolve) => {
    setTimeout(() => {
      resolve(todos);
    }, 1500);
  });

  return (
    <>
      <Page header={<Bar startContent={<Title>My Risks</Title>} />}>
        <RiskList />
        <TodoList />
      </Page>
    </>
  );
}
