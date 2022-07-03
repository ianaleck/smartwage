import { Badge, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function Answer({ answer }: any) {
  return (
    <Stack
      spacing="0"
      p="2"
      bg="gray.50"
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.100"
      borderStyle="solid"
      _hover={{ cursor: "pointer" }}
    >
      <HStack justify="space-between">
        <Text fontSize="xs">
          {answer.createdAt.substring(0, 16).replace("T", " ")}
        </Text>
        <Badge colorScheme="pink">{answer.from.replace("whatsapp:", "")}</Badge>
      </HStack>
      <Text fontSize="xs" pt="5">
        Response
      </Text>
      <Text bg="gray.100" p="2" borderRadius="md">
        {answer.body}
      </Text>
    </Stack>
  );
}
