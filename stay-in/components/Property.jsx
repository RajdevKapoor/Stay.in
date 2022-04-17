import Link from 'next/link';
import Image from 'next/image';
import { Badge, Stack } from '@chakra-ui/react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import DefaultImage from '../assets/images/house.jpg';

const Property = ({
	property: { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID, purpose }
}) => (
	<Link href={`/property/${externalID}`} passHref>
		<Flex flexWrap="wrap" w="420px" p="5" paddingTop="0px" justifyContent="flex-start" cursor="pointer">
			<Box maxW="sm" s borderRadius="xl" overflow="hidden" color="white" bgColor="blue.500" boxShadow="lg">
				<Image src={coverPhoto ? coverPhoto.url : DefaultImage} width={400} height={260} />

				<Box p="6">
					<Box display="flex" alignItems="baseline">
						<Badge borderRadius="full" px="0" colorScheme="teal">
							{isVerified && <GoVerified />}
						</Badge>
						<Box
							color="white"
							fontWeight="semibold"
							letterSpacing="wide"
							fontSize="xs"
							textTransform="uppercase"
							ml="2"
						>
							{rooms} beds &bull; {baths} baths &bull; {millify(area)} sqft
						</Box>
					</Box>

					<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
						{title}
					</Box>

					<Box>
						USD {price}
						{rentFrequency && `/${rentFrequency}`}
					</Box>
					<Box color="blue.500">{purpose}</Box>
				</Box>
			</Box>
		</Flex>
	</Link>
);

export default Property;
