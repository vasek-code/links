import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { reloadIframe } from "../../utils/reload-iframe";
import { reloadSession } from "../../utils/reload-session";
import { trpc } from "../../utils/trpc";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

const SettingsPage: NextPage = () => {
  const router = useRouter();

  const deleteAccountMutation = trpc.proxy.user.deleteAccount.useMutation();

  const handleDelete = async () => {
    const response = await deleteAccountMutation.mutateAsync();

    reloadSession();
    router.push("/");
  };

  return (
    <Flex w="100%" h="100%" p="20px" flexDir="column" gap="10px">
      <Text fontSize={40} fontWeight="semibold">
        Account
      </Text>
      <Button w="300px" colorScheme="red" onClick={handleDelete}>
        Delete account
      </Button>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SettingsPage;
