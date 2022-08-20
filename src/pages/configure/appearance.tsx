import { Flex, Text, Input, Button, IconButton } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { AnimatedInput } from "../../components/AnimatedInput";
import { AnimatedTextarea } from "../../components/AnimatedTextarea";
import { Loader } from "../../components/Loader";
import { reloadSession } from "../../utils/reload-session";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import { GetServerSideProps, NextPage } from "next";
import { reloadIframe } from "../../utils/reload-iframe";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

const AppearancePage: NextPage = () => {
  const { data, status } = useSession();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  const userUpdateMutation = trpc.proxy.user.updateUser.useMutation();
  const userIconMutation = trpc.proxy.user.updateIcon.useMutation();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();

    for (const file of e.target.files as FileList) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "zqys6llm");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvez2ui2g/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) return;

    const data = await res.json();

    const user = await userIconMutation.mutateAsync({
      url: data.secure_url,
    });

    reloadSession();
    reloadIframe();
  }

  function handleSave() {
    const user = userUpdateMutation.mutateAsync(
      {
        bio: bio ? bio : (data?.user?.bio as string),
        name: name ? name : (data?.user?.name as string),
      },
      {
        onSuccess: () => {
          reloadSession();
          reloadIframe();
        },
      }
    );
  }

  return (
    <Flex w="100%" h="100%">
      <Flex w="740px" h="100%" px="40px" flexDir="column" pt="40px">
        <Flex w="100%" flexDir="column">
          <Text fontWeight="semibold" fontSize="1.3rem">
            Profile
          </Text>
          <Flex
            h="100%"
            w="100%"
            background="#292929"
            mt="20px"
            borderRadius="10px"
            p="24px"
            flexDir="column"
          >
            <Flex w="100%" align="center">
              <Flex width="96px" height="96px">
                {data?.user && (
                  <Image
                    width="96px"
                    height="96px"
                    style={{
                      borderRadius: "50%",
                    }}
                    layout="fixed"
                    quality={100}
                    src={data?.user?.image as string}
                    alt="profile image"
                  />
                )}
              </Flex>

              <Flex
                align="center"
                justify="center"
                pl="20px"
                gap="10px"
                w="100%"
              >
                <input
                  type="file"
                  style={{
                    display: "none",
                  }}
                  ref={fileRef}
                  onChange={handleChange}
                />
                <Button
                  w="400px"
                  color="white"
                  background="#7c41ff"
                  _hover={{
                    background: "#a071ff",
                  }}
                  onClick={() => {
                    fileRef.current?.click();
                  }}
                >
                  Pick an image
                </Button>
              </Flex>
            </Flex>
            <Flex w="100%" h="100%" flexDir="column" pt="24px" gap="15px">
              <AnimatedInput
                label="Profile Title"
                placeholder={data?.user?.name as string}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                hideWidth={400}
              />
              <AnimatedTextarea
                label="Bio"
                placeholder="Enter a bio description to appear on your Linktree"
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                value={bio}
              />
              <Flex w="100%" justify="flex-end">
                {userUpdateMutation.isLoading ? (
                  <IconButton
                    aria-label="loader"
                    w="100px"
                    background="#7c41ff"
                    icon={<Loader size="30px" />}
                  />
                ) : (
                  <Button
                    w="100px"
                    background="#7c41ff"
                    _hover={{
                      background: "#a071ff",
                    }}
                    onClick={() => {
                      handleSave();
                    }}
                    disabled={name || bio ? false : true}
                  >
                    Save
                  </Button>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
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

export default AppearancePage;
