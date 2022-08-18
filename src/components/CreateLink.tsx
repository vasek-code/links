import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { reloadSession } from "../utils/reload-session";
import { trpc } from "../utils/trpc";
import { AnimatedInput } from "./AnimatedInput";

export const CreateLink: React.FC<{
  close: Function;
  onSuccess: Function;
}> = ({ close, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [error, setError] = useState("");

  const createLink = trpc.proxy.link.createLink.useMutation({
    onSuccess: () => {
      reloadSession();

      onSuccess();
      close();
    },
    onError: ({ message }) => {
      setError(message);
    },
  });

  async function handleCreate() {
    const link = await createLink.mutateAsync({
      linkUrl: url,
      text: title,
    });
  }

  return (
    <>
      {error ? (
        <Flex w="100%" justify="center" py="5px">
          <Text
            fontWeight="semibold"
            p="10px"
            w="100%"
            textAlign="center"
            borderRadius="10px"
            backgroundColor="#dc2626"
          >
            Make sure url is correctly formatted
          </Text>{" "}
        </Flex>
      ) : (
        <></>
      )}
      <Flex
        w="600px"
        py="20px"
        background="#202020"
        borderRadius="20px"
        boxShadow="rgb(0 0 0 / 30%) 0px 10px 15px -3px, rgb(0 0 0 / 30%) 0px 4px 6px -4px"
        justify="center"
        align="center"
        pl="20px"
        h="max"
      >
        <Flex flexDir={"column"} w="100%" gap="5px">
          <AnimatedInput
            label="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Select title"
            value={title}
            hideWidth={200}
          />
          <AnimatedInput
            label="Url"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder="Select url"
            value={url}
            hideWidth={200}
          />
        </Flex>
        <Flex w="100%" align="center" justify="center" p="20px">
          <Button colorScheme="green" w="100%" onClick={handleCreate}>
            Create
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
