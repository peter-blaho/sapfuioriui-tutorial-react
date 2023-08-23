"use client";

import {
  TableRowPropTypes,
  Table,
  TableColumn,
  Label,
  TableRow,
  TableCell,
} from "@ui5/webcomponents-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function RiskList() {
  const router = useRouter();

  const [riskList, setRiskList] = useState([]);

  const handleRiskClick: TableRowPropTypes["onClick"] = (event) => {
    router.push(`/risks/${event.currentTarget.dataset.id}`);
  };

  const getRiskList = async () => {
    const response = await fetch("/odata/v4/service/risk/Risks", {
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
      const result = await getRiskList();
      const riskList = result.value;

      setRiskList(riskList);
    };

    fetchData();
  }, []);

  return (
    <>
      <Table
        columns={
          <>
            <TableColumn>
              <Label>Title</Label>
            </TableColumn>
            <TableColumn demandPopin minWidth={600} popinText="Description">
              <Label>Description</Label>
            </TableColumn>
            <TableColumn demandPopin minWidth={600} popinText="Priority">
              <Label>Priority</Label>
            </TableColumn>
            <TableColumn>
              <Label>Impact</Label>
            </TableColumn>
          </>
        }
        onLoadMore={function ka() {}}
        onPopinChange={function ka() {}}
        onRowClick={function ka() {
          console.log("change");
        }}
        onSelectionChange={function ka() {
          console.log("change");
        }}
        mode="SingleSelect"
        stickyColumnHeader
        style={{
          marginBottom: "5rem",
          marginTop: "5rem",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {riskList.map((risk) => {
          return (
            <TableRow
              key={risk.ID}
              data-id={risk.ID}
              onClick={handleRiskClick}
              type="Active"
            >
              <TableCell>
                <Label>{risk.title}</Label>
              </TableCell>
              <TableCell>
                <Label>{risk.descr}</Label>
              </TableCell>
              <TableCell>
                <Label>{risk.prio}</Label>
              </TableCell>
              <TableCell>
                <Label>{risk.impact}</Label>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </>
  );
}
