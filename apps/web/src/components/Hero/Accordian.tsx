import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Heading,
  Text,Button
} from "@chakra-ui/react";
type Props = {};

const Accordian = (props: Props) => {
  return (
    <Box w={{ base: "100%", md: "60%" }} m="auto" bg="white" pb="50px" pt="50px">
      <Heading>Frequently asked questions</Heading>
      <Accordion mt="35px">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Text as="b" fontSize="xl">
                  What is a URL shortener?
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} textAlign="left">
            <Text fontWeight="500">
              {" "}
              A URL shortener, also known as a link shortener, seems like a
              simple tool, but it is a service that can have a dramatic impact
              on your marketing efforts.
            </Text>

            <br />
            <Text fontWeight="500">
              Link shorteners work by transforming any long URL into a shorter,
              more readable link. When a user clicks the shortened version,
              they’re automatically forwarded to the destination URL.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Text as="b" fontSize="xl">
                  {" "}
                  Benefits of a short URL
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} textAlign="left">
            <Text fontWeight="500">
              How many people can even remember a long web address, especially
              if it has tons of characters and symbols? A short URL can make
              your link more memorable. Not only does it allow people to easily
              recall and share your link with others, it can also dramatically
              improve traffic to your content..
            </Text>

            <br />
            <Text fontWeight="500">
              On a more practical side, a short URL is also easier to
              incorporate into your collateral – whether you’re looking to
              engage with your customers offline or online.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Text as="b" fontSize="xl">
                  What is a custom URL shortener?
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} textAlign="left">
            <Text fontWeight="500">
              A custom URL shortener is a service that allows users to
              personalize shortened links into branded links. Instead of a
              randomly generated alphanumeric code, users can specify a word or
              phrase to be included in the URL.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Text as="b" fontSize="xl">
                  Why choose Swiftlik?
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} textAlign="left">
            <Text fontWeight="500">
              Whether you’re sharing one link or scan or millions, our platform
              was built to help you make every point of connection between your
              content and your audience ignite action.
            </Text>
            <Text fontWeight="500">
             Start your jurney with us now for free.
            </Text>
            <Button mt="15" variant="outline" colorScheme="blue" >Get Started  </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default Accordian;
