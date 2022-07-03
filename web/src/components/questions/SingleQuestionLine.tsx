import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SingleQuestionLine({ question }: any) {
  const navigate = useNavigate();
  return (
    <Stack
      spacing="0"
      p="2"
      borderRadius="md"
      shadow="md"
      borderWidth="1px"
      borderColor="gray.400"
      borderStyle="solid"
      _hover={{ cursor: "pointer", bg: "gray.100" }}
      onClick={() => navigate("/questions/" + question._id)}
    >
      <Text fontSize="xs">
        {question.createdAt.substring(0, 16).replace("T", " ")}
      </Text>
      <Text noOfLines={1} fontWeight="bold">
        {question.question}
      </Text>
    </Stack>
  );
}
