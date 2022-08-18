import { Button, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { createRef, useEffect, useRef, useState } from "react";
import { CreateLink } from "../../components/CreateLink";
import { EditLink } from "../../components/EditLink";

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
          colorScheme="green"
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
              (
                document.getElementById("iframe-ref") as HTMLIFrameElement
              ).contentWindow?.location.reload();
            }}
          />
        )}
        {session?.user?.links?.map((link) => {
          return <EditLink key={link.id} link={link} />;
        })}
      </Flex>
    </Flex>
  );
};

export default ConfigurePage;
