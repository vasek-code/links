/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Flex, Text } from "@chakra-ui/react";
import { Link, User } from "@prisma/client";
import { LinkComponent } from "../components/Link";
import { trpc } from "../utils/trpc";
import Image from "next/image";

const UserPage: NextPage = () => {
  const router = useRouter();
  const name = router.query.name as string;

  const userQuery = trpc.proxy.user.getByName.useQuery({
    name,
  });

  if (userQuery.isLoading) return null;

  if (userQuery.isError) return <>error</>;

  if (!userQuery.data) return <>user doesn&apos;t exist</>;

  return (
    <Flex w="100%" h="100vh" pt="24px" px="12px">
      <Container p="0px" maxW="680px" pb="80px">
        <Flex w="100%" flexDir="column" mt="12px" mb="32px" align="center">
          <Flex mb="16px">
            {userQuery.data?.image ? (
              <Image
                style={{
                  borderRadius: "50%",
                }}
                width="96px"
                height="96px"
                src={userQuery.data?.image}
                alt={userQuery.data?.image}
                layout="fixed"
                draggable={false}
                quality="100"
              />
            ) : (
              <Flex
                __css={{
                  backgroundColor: "rgb(245, 246, 248)",
                  color: "rgb(0, 0, 0)",
                  borderRadius: "100%",
                  display: "flex",
                  WebkitBoxPack: "center",
                  justifyContent: "center",
                  WebkitBoxAlign: "center",
                  alignItems: "center",
                  width: "96px",
                  height: "96px",
                }}
              >
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: "32px",
                  }}
                >
                  {userQuery.data?.name?.at(0)?.toLocaleUpperCase()}
                </Text>
              </Flex>
            )}
          </Flex>
          <Text fontWeight="500" fontSize="17px">
            @{userQuery?.data?.name}
          </Text>
          <Text
            style={{
              lineHeight: 1.5,
              fontSize: "15px",
              color: "rgba(255, 255, 255, 0.6)",
              fontWeight: 500,
              minHeight: "21px",
            }}
          >
            {userQuery?.data?.bio}
          </Text>
        </Flex>
        <Flex flexDir="column" w="100%">
          {userQuery?.data?.links?.map((link) => {
            return <LinkComponent link={link} key={link.id} />;
          })}
        </Flex>
      </Container>
    </Flex>
  );
};

export default UserPage;
