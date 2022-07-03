import { Center, Container, Grid, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddQuestion from "../components/questions/AddQuestion";
import QuestionsList from "../components/questions/QuestionsList";
import { iContext, useAccount } from "../utils/useAccount";

export default function Questions() {
  const { sid }: iContext = useAccount();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_API + "/questions", {
        headers: {
          sid: sid || "",
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <Container maxW="1100px">
      <Center>{loading && <Spinner />}</Center>
      <Grid templateColumns={"5fr 7fr"} gap={"20px"}>
        <AddQuestion setQuestions={setQuestions} />
        <QuestionsList questions={questions} setQuestions={setQuestions} />
      </Grid>
    </Container>
  );
}
