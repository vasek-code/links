import { Button, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { Link } from "@prisma/client";
import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { reloadIframe } from "../utils/reload-iframe";
import { reloadSession } from "../utils/reload-session";
import { trpc } from "../utils/trpc";

export const EditLink: React.FC<{
  link: Link;
}> = ({ link }) => {
  const updateLink = trpc.proxy.link.updateLink.useMutation({
    onSuccess: () => {
      reloadSession();
    },
  });
  const deleteLink = trpc.proxy.link.deleteLink.useMutation({
    onSuccess: () => {
      reloadIframe();
      reloadSession();
    },
  });

  const [titleEditing, setTitleEditing] = useState(false);
  const [urlEditing, setUrlEditing] = useState(false);

  const [title, setTitle] = useState(link.text);
  const [url, setUrl] = useState(link.linkUrl);

  async function handleSave() {
    updateLink.mutateAsync({
      id: link.id,
      linkUrl: url,
      text: title,
    });
  }

  async function handleDelete() {
    deleteLink.mutateAsync({
      id: link.id,
    });
  }

  return (
    <Flex
      w="600px"
      h="120px"
      background="#202020"
      borderRadius="20px"
      pl="20px"
      boxShadow="rgb(0 0 0 / 30%) 0px 10px 15px -3px, rgb(0 0 0 / 30%) 0px 4px 6px -4px"
    >
      <Flex flexDir="column" w="100%" h="100%" justify="center" gap="10px">
        <Flex align="center" gap="7px" w="max">
          {titleEditing ? (
            <Input
              variant="unstyled"
              fontWeight="semibold"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          ) : (
            <Text fontWeight="semibold">{title}</Text>
          )}

          <BsFillPencilFill
            color="#bec1c3"
            size="15px"
            onClick={() => {
              setTitleEditing(!titleEditing);
            }}
            style={{
              cursor: "pointer",
            }}
          />
        </Flex>
        <Flex align="center" gap="7px" w="max">
          {urlEditing ? (
            <Input
              variant="unstyled"
              fontWeight="semibold"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          ) : (
            <Text fontWeight="semibold">{url}</Text>
          )}

          <BsFillPencilFill
            color="#bec1c3"
            size="15px"
            onClick={() => {
              setUrlEditing(!urlEditing);
            }}
            style={{
              cursor: "pointer",
            }}
          />
        </Flex>
      </Flex>
      <Flex flexDir="column" h="100%" w="100%" p="20px" gap="10px">
        <Button
          background="#7c41ff"
          _hover={{
            background: "#a071ff",
          }}
          onClick={handleSave}
          disabled={title === link.text && url === link.linkUrl ? true : false}
        >
          Save
        </Button>
        <IconButton
          icon={<IoTrashOutline />}
          aria-label="delete link"
          onClick={handleDelete}
        />
      </Flex>
    </Flex>
  );
};
