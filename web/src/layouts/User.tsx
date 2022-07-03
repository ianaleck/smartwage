import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
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
import { useParams } from "react-router-dom";
import { iContext, useAccount } from "../utils/useAccount";

export default function User() {
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState<any>();
  const [questions, setQuestions] = useState<any>([]);
  const { id } = useParams();
  const { sid }: iContext = useAccount();

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_API + "/users/" + id, {
        headers: { sid: sid || "" },
      })
      .then((res) => res.data)
      .then((data) => {
        setLoading(false);
        console.log(data);
        setuser(data.user);
        setQuestions(data.questions);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [id]);
  return (
    <Container>
      <Stack>
        <HStack>{loading && <Spinner color="pink.500" />}</HStack>
        {user && (
          <HStack>
            <Avatar name={user.name} />
            <Stack spacing="0">
              <Text fontSize="xs">
                Last Updated:{" "}
                {user.updatedAt.substring(0, 16).replace("T", " ")}
              </Text>
              <HStack>
                <Text>{user.name}</Text>
                <Badge colorScheme="pink">{user.number}</Badge>
              </HStack>
            </Stack>
          </HStack>
        )}

        <Divider />

        <Accordion>
          {questions.map((question: any, i: number) => (
            <AccordionItem key={i} bg="gray.50" mb="5">
              <h2>
                <AccordionButton bg="white" shadow="md" borderRadius="md">
                  <Box flex="1" textAlign="left">
                    {question.qxn.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Stack>
                  <Text fontSize="xs">Answer</Text>
                  <Text>{question?.answer?.body || "No Answer"}</Text>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Container>
  );
}
