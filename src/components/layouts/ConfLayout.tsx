/* eslint-disable @next/next/no-img-element */
import { Button, Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { Menu } from "../Menu";
import Image from "next/image";
import { ConfigureMenu } from "../ConfigureMenu";

export const ConfLayout: React.FC<{
  children: ReactElement<any, any>;
}> = ({ children }) => {
  const router = useRouter();

  const [opened, setOpened] = useState(false);

  const { data, status } = useSession();

  return (
    <>
      <ConfigureMenu opened={opened} />

      <Flex w="100%" h="100vh">
        <Flex
          w="63px"
          h="100vh"
          position="fixed"
          borderRight="1px solid gray"
          flexDir="column"
          align="center"
          py="10px"
          justify="space-between"
        >
          <Link href="/">
            <Image
              src="https://assets.production.linktr.ee/0e1bb8872bcd71a17b34ae20366d02bff4e9d933/images/logo_trees.svg"
              alt="Linktree Symbol"
              width="40px"
              height="40px"
              style={{
                cursor: "pointer",
              }}
              layout="fixed"
              quality={100}
            />
          </Link>
          <Flex>
            {data?.user && (
              <Image
                src={data?.user?.image as string}
                alt="Linktree Symbol"
                width="40px"
                height="40px"
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
                layout="fixed"
                quality={100}
                onClick={() => {
                  setOpened(!opened);
                }}
              />
            )}
          </Flex>
        </Flex>
        <Flex w="100%" h="100%" flexDir="column">
          <Flex
            w="100%"
            h="63px"
            align="center"
            borderBottom="1px solid gray"
            pos="fixed"
            ml="63px"
            pl="5px"
            background="#121212"
            zIndex="100000000"
          >
            <Link href="/configure">
              {router.pathname === "/configure" ? (
                <Button
                  variant="ghost"
                  size="lg"
                  color="#fff"
                  p="0px"
                  pr="15px"
                  pl="15px"
                  _after={{
                    content: `""`,
                    backgroundColor: "#fff",
                    height: "2px",
                    position: "absolute",
                    width: "60%",
                    marginTop: "61px",
                  }}
                >
                  Links
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="lg"
                  color="#d7d7d7"
                  p="0px"
                  pr="15px"
                  pl="15px"
                >
                  Links
                </Button>
              )}
            </Link>
            <Link href="/configure/appearance">
              {router.pathname === "/configure/appearance" ? (
                <Button
                  variant="ghost"
                  size="lg"
                  color="#fff"
                  p="0px"
                  pr="15px"
                  pl="15px"
                  _after={{
                    content: `""`,
                    backgroundColor: "#fff",
                    height: "2px",
                    position: "absolute",
                    width: "60%",
                    marginTop: "61px",
                  }}
                >
                  Appearance
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="lg"
                  color="#d7d7d7"
                  p="0px"
                  pr="15px"
                  pl="15px"
                >
                  Appearance
                </Button>
              )}
            </Link>
            <Link href="/configure/settings">
              {router.pathname === "/configure/settings" ? (
                <Button
                  variant="ghost"
                  size="lg"
                  color="#fff"
                  p="0px"
                  pr="15px"
                  pl="15px"
                  _after={{
                    content: `""`,
                    backgroundColor: "#fff",
                    height: "2px",
                    position: "absolute",
                    width: "60%",
                    marginTop: "61px",
                  }}
                >
                  Settings
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="lg"
                  color="#d7d7d7"
                  p="0px"
                  pr="15px"
                  pl="15px"
                >
                  Settings
                </Button>
              )}
            </Link>
          </Flex>
          <Flex h="100%" w="100%">
            <Flex h="100%" w="100%" pt="63px" pl="63px">
              {children}
            </Flex>
            <Flex
              w="100%"
              h="100%"
              align="center"
              justify="flex-end"
              pr="150px"
              pt="63px"
            >
              <iframe
                src={`http://localhost:3000/${data?.user?.name}`}
                frameBorder="0"
                style={{
                  width: "320px",
                  height: "692px",
                  border: "10px solid black",
                  borderRadius: "30px",
                }}
                id="iframe-ref"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
