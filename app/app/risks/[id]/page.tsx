"use client";

import {
  DynamicPage,
  DynamicPageTitle,
  Form,
  FormItem,
  Input,
  MessageStrip,
  MessageStripDesign,
  TextArea,
} from "@ui5/webcomponents-react";

import { useEffect, useState } from "react";

// eslint-disable-next-line @next/next/no-async-client-component
export default function RiskDetails({ params }: { params: { id: string } }) {
  const [riskDetails, setRiskDetails] = useState({});

  const getRiskDetails = async () => {
    const response = await fetch(
      `/odata/v4/service/risk/Risks(ID=${params.id},IsActiveEntity=true)`,
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
      const result = await getRiskDetails();
      // const riskDetails = result.value;
      console.log("riskDetails " + result);

      setRiskDetails(result);
    };

    fetchData();
  }, []);

  return (
    <>
      <DynamicPage
        showHideHeaderButton={false}
        headerTitle={<DynamicPageTitle header={riskDetails?.title} />}
      >
        <MessageStrip
          design={MessageStripDesign.Information}
          style={{ marginBottom: "2rem" }}
        >
          {`Since this is only a demo app, adjustments made here on this page won't be reflected in the todo list.`}
        </MessageStrip>
        <Form>
          <FormItem label={"Title"}>
            <Input value={riskDetails?.title} />
          </FormItem>
          <FormItem label={"Details"}>
            <TextArea value={riskDetails?.descr} growing growingMaxLines={10} />
          </FormItem>
          <FormItem label={"Title"}>
            <Input value={riskDetails?.prio} />
          </FormItem>
          <FormItem label={"Title"}>
            <Input value={riskDetails?.impact} />
          </FormItem>
        </Form>
      </DynamicPage>
    </>
  );
}
