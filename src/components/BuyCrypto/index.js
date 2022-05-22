import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function BuyCrypto() {
  const TextTitleColor = useColorModeValue("white", "white");

  return (
    <Box my="5">
      <Text
        color={TextTitleColor}
        mb={5}
        letterSpacing={1}
        fontSize="xl"
        fontWeight="semibold"
        decoration="lightblue"
        textTransform="uppercase"
      >
        Buy Cryptocurrencies
      </Text>
      <Box alignItems="center">
        <Box
          as="iframe"
          height="652"
          width="100%"
          src="https://staging-global.transak.com?apiKey=12901332-7253-4676-b3d0-c02d5b92366e"
        />
      </Box>
    </Box>
  );
}
