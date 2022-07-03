import { Center, Container, Grid, Spinner, Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Answers from "../components/questions/Answers";
import EditQuestion from "../components/questions/EditQuestion";
import { iContext, useAccount } from "../utils/useAccount";

export default function SingleQuestion() {
  const { sid }: iContext = useAccount();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<any>();
  const [answers, setAnswers] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/questions/" + id, {
        headers: { sid: sid || "" },
      })
      .then((res) => res.data)
      .then((data) => {
        setLoading(false);
        setQuestion(data?.question);
        setAnswers(data?.replies);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [id, sid]);
  return (
    <Container maxW="1100px">
      <Stack>
        <Center>{loading && <Spinner />}</Center>

        <Grid templateColumns={"5fr 7fr"} gap={"20px"}>
          {question && <EditQuestion question={question} />}
          {answers && <Answers answers={answers} />}
        </Grid>
      </Stack>
    </Container>
  );
}
