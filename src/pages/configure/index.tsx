import { Button, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { createRef, useEffect, useRef, useState } from "react";
import { CreateLink } from "../../components/CreateLink";
import { EditLink } from "../../components/EditLink";
import { reloadIframe } from "../../utils/reload-iframe";

const ConfigurePage: NextPage = () => {
  const { data: session, status } = useSession();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [createLink, setCreateLink] = useState(false);

  console.log(session);

  return (
    <Flex w="100%" h="100%" justify="space-between">
      <Flex flexDirection="column" p="20px" gap="10px" h="max">
        <Button
          w="600px"
          size="lg"
          background="#7c41ff"
          _hover={{
            background: "#a071ff",
          }}
          onClick={() => {
            setCreateLink(!createLink);
          }}
        >
          Create link
        </Button>
        {createLink && (
          <CreateLink
            close={() => {
              setCreateLink(false);
            }}
            onSuccess={() => {
              reloadIframe();
            }}
          />
        )}
        {session?.user?.links
          ?.slice()
          .reverse()
          .map((link) => {
            return <EditLink key={link.id} link={link} />;
          })}
      </Flex>
    </Flex>
  );
};

export default ConfigurePage;
