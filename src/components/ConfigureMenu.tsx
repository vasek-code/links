import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { Menu } from "./Menu";

export const ConfigureMenu: React.FC<{
  opened: boolean;
}> = ({ opened }) => {
  return (
    <Flex
      pos="absolute"
      bottom="30px"
      left="60px"
      width="min"
      height="min"
      zIndex="100000"
    >
      <Menu
        opened={opened}
        config={{
          from: { x: -1, y: -1, opacity: 0 },
          enter: { x: 0, y: 0, opacity: 1 },
          leave: { x: -1, y: -1, opacity: 0 },
          config: {
            duration: 100,
          },
        }}
      />
    </Flex>
  );
};
