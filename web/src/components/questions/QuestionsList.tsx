import { Stack } from "@chakra-ui/react";
import React from "react";
import SingleQuestionLine from "./SingleQuestionLine";

export default function QuestionsList({
  questions,
  setQuestions,
}: {
  questions: any[];
  setQuestions?: (questions: any[]) => void;
}) {
  return (
    <Stack>
      {questions.map((question: any, i) => (
        <SingleQuestionLine question={question} />
      ))}
    </Stack>
  );
}
