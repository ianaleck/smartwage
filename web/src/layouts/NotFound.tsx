import { Center, Heading, Icon, Stack } from "@chakra-ui/react";
import { TbError404 } from "react-icons/tb";
import React from "react";

export default function NotFound() {
  return (
    <Center p="10">
      <Stack spacing="0" align="center" mt="20">
        <Icon w={20} h={20} color="pink.500" as={TbError404} />
        <Heading size="sm">Page Not Found</Heading>
      </Stack>
    </Center>
  );
}
