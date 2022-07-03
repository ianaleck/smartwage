import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { iContext, useAccount } from "../../utils/useAccount";

export default function AddQuestion({ setQuestions }: any) {
  const { sid }: iContext = useAccount();
  const [answers, setAnswers] = useState<string[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const AddAnswer = () => {
    setAnswers((oldAnswers) => [...oldAnswers, ""]);
  };

  const RemoveAnswer = (pos: number) => {
    let newAnswers = [...answers];
    newAnswers.splice(pos, 1);
    setAnswers(newAnswers);
  };

  const saveQuestion = () => {
    //validate
    if (!question) {
      toast({
        description: "Question is required",
        status: "error",
      });
      return;
    }

    if (answers.length > 0) {
      for (let i = 0; i < answers.length; i++) {
        if (!answers[i]) {
          toast({
            description: "One or more possible answers text missing",
            status: "error",
          });
          return;
        }
      }
    }

    axios
      .post(
        process.env.REACT_APP_API + "/questions",
        { question, answers },
        { headers: { sid: sid || "" } }
      )
      .then((res) => res.data)
      .then((data) => {
        window.location.reload();
      })
      .catch((err) => {});
  };
  return (
    <Stack>
      <Heading size="md">Add New Question</Heading>
      <FormControl>
        <FormLabel>Question</FormLabel>
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </FormControl>
      <HStack justify="space-between">
        <Heading size="sm">Possible Answers</Heading>
        <Button
          size="sm"
          disabled={loading}
          colorScheme="pink"
          onClick={AddAnswer}
        >
          Add
        </Button>
      </HStack>
      {answers.map((answer: string, i) => (
        <HStack>
          <Text>{i + 1}</Text>
          <FormControl key={i}>
            <Input
              value={answer}
              onChange={(e) =>
                setAnswers((oldAnswers) => {
                  let newAnswers = [...oldAnswers];
                  newAnswers[i] = e.target.value;
                  return newAnswers;
                })
              }
            />
          </FormControl>
          <Button
            colorScheme="red"
            disabled={loading}
            size="xs"
            onClick={() => RemoveAnswer(i)}
          >
            -
          </Button>
        </HStack>
      ))}
      <Box>
        <Button color="pink.500" onClick={saveQuestion} isLoading={loading}>
          Save
        </Button>
      </Box>
    </Stack>
  );
}
