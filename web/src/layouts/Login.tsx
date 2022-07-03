import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { iContext, useAccount } from "../utils/useAccount";
type Errors = {
  sid: string;
  token: string;
  whatsapp: string;
};
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [sid, setSid] = useState("");
  const [token, setToken] = useState("");
  const [whatsapp, setWhatsApp] = useState("");
  const [errors, setErrors] = useState<Errors>({
    sid: "",
    token: "",
    whatsapp: "",
  });

  const { updateSid }: iContext = useAccount();

  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (handleErrors()) {
      return;
    }

    setLoading(true);
    axios
      .post(
        process.env.REACT_APP_API + "/connect",
        {
          sid: sid,
          from: whatsapp,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => res.data)
      .then((data) => {
        console.log("Data", data);
        if (data?.account && updateSid) {
          updateSid(data?.account?.sid);
          toast({
            description: "Welcome",
            status: "success",
          });
          navigate("/");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error", err);
        //check if errr has response.data
        toast({
          description: err?.response?.data?.message || err.message,
          status: "error",
        });
        setLoading(false);
      });
  };

  const handleErrors = () => {
    let newErrors: Errors = {
      sid: !sid ? "SID Required" : "",
      token: !token ? "Token Required" : "",
      whatsapp: !whatsapp ? "WhatsApp Number Required" : "",
    };
    setErrors(newErrors);

    return newErrors.sid || newErrors.token || newErrors.whatsapp;
  };

  return (
    <Center>
      <Container mt="5" mb="5" maxW="sm">
        <Stack p="4" shadow="md" borderRadius="md" spacing="20px">
          <Heading size="md" textAlign="center" color="pink.500">
            Login
          </Heading>
          <FormControl isInvalid={errors.sid.length > 0}>
            <FormLabel>Twilio SID</FormLabel>
            <Input
              bg="gray.50"
              placeholder="AC***********"
              value={sid}
              onChange={(e) => setSid(e.target.value)}
            />
            <FormErrorMessage>{errors.sid}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.token.length > 0}>
            <FormLabel>Twilio Token</FormLabel>
            <Input
              bg="gray.50"
              placeholder="Account Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <FormErrorMessage>{errors.token}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.whatsapp.length > 0}>
            <FormLabel>Twilio WhatsApp Number</FormLabel>
            <Input
              bg="gray.50"
              placeholder="whatsapp:+1*******"
              value={whatsapp}
              onChange={(e) => setWhatsApp(e.target.value)}
            />
            <FormErrorMessage>{errors.whatsapp}</FormErrorMessage>
          </FormControl>
          <Button
            // disabled={!sid || !token || !whatsapp || loading}
            isLoading={loading}
            color="pink.500"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
      </Container>
    </Center>
  );
}
