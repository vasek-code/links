import { Flex, Button, Text } from "@chakra-ui/react";
import { useTransition, animated } from "react-spring";
import { RiUser3Fill } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GoSettings } from "react-icons/go";
import { HiLogout } from "react-icons/hi";

export const Menu: React.FC<{
  opened: boolean;
  config: any;
}> = ({ opened, config }) => {
  const router = useRouter();
  const { data, status } = useSession();

  const transition = useTransition(opened, config);

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div
              style={{
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow:
                  "0 10px 15px -3px rgba(0,0,0,.3),0 4px 6px -4px rgba(0,0,0,.3)",
                ...style,
              }}
            >
              <Flex w="150px" h="100%" flexDir="column" background="#0b0b0b">
                <Button
                  w="100%"
                  borderRadius="0px"
                  onClick={() => {
                    router.push(`/${data?.user?.name}`);
                  }}
                >
                  <Flex
                    w="100%"
                    h="100%"
                    justify="flex-start"
                    align="center"
                    gap="8px"
                  >
                    <RiUser3Fill size="20px" />
                    <Text>Profile</Text>
                  </Flex>
                </Button>
                <Button
                  w="100%"
                  borderRadius="0px"
                  onClick={() => {
                    router.push("/configure");
                  }}
                >
                  <Flex
                    w="100%"
                    h="100%"
                    justify="flex-start"
                    align="center"
                    gap="8px"
                  >
                    <GoSettings size="20px" />
                    <Text>Configure</Text>
                  </Flex>
                </Button>
                <Button
                  w="100%"
                  borderRadius="0px"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <Flex
                    w="100%"
                    h="100%"
                    justify="flex-start"
                    align="center"
                    gap="8px"
                  >
                    <HiLogout size="20px" />
                    <Text>Log Out</Text>
                  </Flex>
                </Button>
              </Flex>
            </animated.div>
          )
      )}
    </>
  );
};
