import { getSession } from 'next-auth/client';
import styles from '../styles/Home.module.css';
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
	useColorModeValue,
	Link
} from '@chakra-ui/react';

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function Homescreen({ user }) {
	return (
		<Flex
			borderRadius="xl"
			borderWidth={3}
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('blue.500', 'white')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} textAlign={'center'}>
						Property Upload Form
					</Heading>
					<Text fontSize={'lg'} color={'whiteAplha.900'} />
				</Stack>
				<Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} color={'black'} p={8}>
					<form>
						{' '}
						<Stack spacing={4}>
							<HStack>
								<Box>
									<FormControl id="propertyName" isRequired>
										<FormLabel>Property Name</FormLabel>
										<Input type="text" />
									</FormControl>
								</Box>
							</HStack>
							<FormControl id="price" isRequired>
								<FormLabel>Price</FormLabel>
								<Input type="text" />
							</FormControl>
							<FormControl id="description" isRequired>
								<FormLabel>Description</FormLabel>
								<Input type="text" />
							</FormControl>
							<FormControl id="floorPlan" isRequired>
								<FormLabel>Floor Plan</FormLabel>
								<Input type="text" />
							</FormControl>
							<FormControl id="area" isRequired>
								<FormLabel>Area</FormLabel>
								<Input type="text" />
							</FormControl>
							<FormControl id="location" isRequired>
								<FormLabel>Location</FormLabel>
								<Input type="text" />
							</FormControl>

							<Stack spacing={10} pt={2}>
								<Button
									type="Submit"
									loadingText="Submitting"
									size="lg"
									bg={'blue'}
									color={'white'}
									_hover={{
										bg: 'blue.500'
									}}
								>
									Submit
								</Button>
							</Stack>
							<Stack pt={6} />
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (!session) {
		context.res.writeHead(302, { Location: '/' });
		context.res.end();
		return {};
	}
	return {
		props: {
			user: session.user
		}
	};
}
