import { Avatar, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserItem({ user }: any) {
  const navigate = useNavigate();
  return (
    <HStack
      shadow="sm"
      p="2"
      borderRadius="lg"
      onClick={() => navigate("/users/" + user?._id)}
      cursor="pointer"
      bg="gray.50"
      borderWidth="1px"
      borderColor="gray.400"
      borderStyle="solid"
      _hover={{ bg: "pink.50", borderColor: "pink.600" }}
    >
      <Avatar size="sm" />
      <Stack spacing="0">
        <Text fontSize="xs">{user?.number?.replace("whatsapp:", "")}</Text>
        <Text size="xs" fontWeight="bold">
          {user?.name}
        </Text>
      </Stack>
    </HStack>
  );
}
