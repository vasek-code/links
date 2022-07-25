/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { Container, Flex, Text } from "@chakra-ui/react";
import { prisma } from "../server/prisma/client";
import { Link, User } from "@prisma/client";
import { LinkComponent } from "../components/Link";

const UserPage: NextPage = () => {
  const router = useRouter();
  const username = router.query.username as string;
  const { data: user } = trpc.useQuery([
    "user.by-username",
    {
      username,
    },
  ]);

  return (
    <Flex w="100%" h="100vh" pt="24px" px="12px">
      <Container p="0px" maxW="680px" pb="80px">
        <Flex w="100%" flexDir="column" mt="12px" mb="32px" align="center">
          <Flex mb="16px">
            {user?.iconUrl ? (
              <img
                style={{
                  borderRadius: "50%",
                  width: "96px",
                  height: "96px",
                }}
                src="https://d1fdloi71mui9q.cloudfront.net/PFoeiiJSR4SLCYv9YeQ0_0TvRwQLjgQFl4Nks"
                alt={user?.username}
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
                  {user?.username[0]?.toLocaleUpperCase()}
                </Text>
              </Flex>
            )}
          </Flex>
          <Text fontWeight="500" fontSize="17px">
            @{user?.username}
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
            {user?.bio}
          </Text>
        </Flex>
        <Flex flexDir="column" w="100%">
          {user?.links?.map((link) => {
            return <LinkComponent link={link} key={link.id} />;
          })}
        </Flex>
      </Container>
    </Flex>
  );
};

export default UserPage;
