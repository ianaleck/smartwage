import { Heading, Stack } from "@chakra-ui/react";
import React from "react";
import Answer from "./Answer";

export default function Answers({ answers }: any) {
  return (
    <Stack>
      <Heading size="md">Responses</Heading>
      {answers.map((answer: any, i: number) => (
        <Answer key={i} answer={answer} />
      ))}
    </Stack>
  );
}
