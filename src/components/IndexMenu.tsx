import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { Menu } from "./Menu";

export const IndexMenu: React.FC<{
  opened: boolean;
}> = ({ opened }) => {
  const windowSize = useWindowSize();
  const [menuRight, setMenuRight] = useState(20);

  console.log(windowSize);

  useEffect(() => {
    if (windowSize.width > 1400) {
      let x = (windowSize.width - 1400) / 2;

      if (x < 20) {
        setMenuRight(20);
      } else {
        setMenuRight(x);
      }
    } else {
      setMenuRight(20);
    }
  }, [windowSize]);

  return (
    <Flex
      pos="absolute"
      inset="0px 0px auto auto"
      transform={`translate(-${menuRight}px, 110px)`}
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
