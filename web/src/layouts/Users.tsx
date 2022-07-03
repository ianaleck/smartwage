import {
  Container,
  Divider,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UsersList from "../components/users/UsersList";
import { iContext, useAccount } from "../utils/useAccount";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { sid }: iContext = useAccount();

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_API + "/users", {
        headers: {
          sid: sid || "",
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setLoading(false);
        if (Array.isArray(data)) {
          setUsers(data);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Stack>
        <HStack>
          <Heading size="md">Users</Heading>
          {loading && <Spinner color="pink.500" />}
        </HStack>
        <Divider />
        <UsersList users={users} />
      </Stack>
    </Container>
  );
}
