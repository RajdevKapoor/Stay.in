import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    React,
  } from "@chakra-ui/react";
  
  export default function SimpleCard() {
    const signInUser = async (event) => {
      event.preventDefault();
      // const res = await fetch('/api/register', {
      //   body: JSON.stringify({
      //     name: event.target.name.value
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   method: 'POST'
      // })
  
      // const result = await res.json()
  
      console.log(event.target.email.value + " "+event.target.pass.value);
  
      //TODO: Pass above values in API 
  
      // result.user => 'Ada Lovelace'
    };
  
    return (
      <Flex
        borderRadius="xl"
        borderWidth={3}
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("blue.500", "white")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"whiteAlpha.900"}>
              to enjoy all of our cool{" "}
              <Link color={"whiteAlpha.900"}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            color={"black"}
            p={8}
          >
            <Stack spacing={4}>
            
              <form onSubmit={signInUser}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" id="email" />
  
                <FormLabel>Password</FormLabel>
                <Input type="password"  id="pass"/>
  
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={"blue.400"}>Forgot password?</Link>
                  </Stack>
                  <Button
                  type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
              <Stack pt={6}>
                <Text align={'center'}>
                  New user? <Link color={'blue.400'} href="/signup">Sign Up</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  