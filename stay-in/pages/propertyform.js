import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Textarea,
  useColorModeValue,
  Link,
  toast,
  useToast,
  Spinner,
} from "@chakra-ui/react";

//import firebase from "../firebase/clientApp";
import { useState } from "react";

import "../components/propertyForm/fileUpload";

import { useRouter } from "next/router";
import ImagePicker from "../components/propertyForm/imagePicker";
import firebase from "./clientApp";

// export default function PropertyForm() {
export default function PropertyForm() {
  //const [showPassword, setShowPassword] = useState(false);

  const [longitude, setLongitude] = useState(0.0);
  const [latitude, setLatitude] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const getUserLocation = () => {
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(function async(position) {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);

      setIsLoading(false);

      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });

    // setTimeout(()=>{}, 3000);
  };

  const submitForm = async (event) => {
    // Initialise Firebase Db
    // const db = firebase.firestore();

    // Write to DB - WIP
    // await db.collection("Property Reviews").add({
    //   firstName: event.target.firstName.value,
    //   lastName: event.target.lastName.value,
    //   email: event.target.email.value,
    //   propertyName: event.target.propertyName.value,
    //   description: event.target.description.value,
    //   monthlyRent: event.target.monthlyRent.value,
    //   bedNumber: event.target.bed.value,
    //   bathNumber: event.target.bath.value,
    //   latitude: event.target.latitude.value,
    //   longitude: event.target.longitude.value,
    //   img: localStorage.getItem("recentImage"),
    // });
    event.preventDefault();
    // const res = await fetch("/api/addProperty", {
    //   body: JSON.stringify({
    //     firstName: event.target.firstName.value,
    //     lastName: event.target.lastName.value,
    //     email: event.target.email.value,
    //     propertyName: event.target.propertyName.value,
    //     description: event.target.description.value,
    //     monthlyRent: event.target.monthlyRent.value,
    //     bedNumber: event.target.bed.value,
    //     bathNumber: event.target.bath.value,
    //     latitude: event.target.latitude.value,
    //     longitude: event.target.longitude.value,
    //     img: localStorage.getItem("recentImage"),
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // });

    // const result = await res.json();

    // console.log(
    //   event.target.firstName.value +
    //     " " +
    //     event.target.lastName.value +
    //     " " +
    //     event.target.email.value +
    //     " " +
    //     event.target.propertyName.value +
    //     " " +
    //     event.target.description.value +
    //     " " +
    //     event.target.monthlyRent.value +
    //     " " +
    //     event.target.bed.value +
    //     " " +
    //     event.target.bath.value +
    //     " " +
    //     event.target.lat.value +
    //     " " +
    //     event.target.long.value
    // );
    // console.log(res);

    router.replace("/").then(() => {
      toast({
        title: `Form Submitted for Review!`,
        status: "success",
        isClosable: true,
      });
    });
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
          <Heading fontSize={"4xl"} textAlign={"center"} className="main-text">
            List Your Property!
          </Heading>
          {/* <Button onClick={getUserLocation}>Location</Button> */}
          <Text fontSize={"lg"} color={"whiteAplha.900"} className="sub-text">
            Fill these details to add your property
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          color={"black"}
          p={8}
        >
          <form onSubmit={submitForm}>
            {" "}
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>

              <FormControl id="propertyName" isRequired>
                <FormLabel>Property Name</FormLabel>
                <InputGroup>
                  <Input type="text" />
                </InputGroup>
              </FormControl>

              <HStack>
                <Box>
                  <FormControl id="monthlyRent" isRequired>
                    <FormLabel>Monthly Rent</FormLabel>
                    <Input type="number" />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="bed" isRequired>
                    <FormLabel>Bed</FormLabel>
                    <Input type="number" />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="bath" isRequired>
                    <FormLabel>Bath</FormLabel>
                    <Input type="number" />
                  </FormControl>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  <FormControl id="latitude" isRequired>
                    <FormLabel>Latitude</FormLabel>
                    <Input type="number" value={latitude} />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="longitude" isRequired>
                    <FormLabel>Longitude</FormLabel>
                    <Input type="number" value={longitude} />
                  </FormControl>
                </Box>

                <Box>
                  <Button
                    className="location-button"
                    onClick={getUserLocation}
                    style={{ marginTop: "25%" }}
                  >
                    Get Location
                  </Button>
                </Box>
              </HStack>

              <HStack>{isLoading && <Spinner />}</HStack>

              <FormControl id="description" isRequired>
                <FormLabel>Property Description</FormLabel>

                <InputGroup>
                  <Input type="text" css={{ height: 100 }} />
                </InputGroup>
              </FormControl>

              <Box>
                <ImagePicker />
              </Box>

              <Stack spacing={10} pt={2}>
                <Button
                  type="Submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
