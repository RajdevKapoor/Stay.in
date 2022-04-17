import Link from 'next/link';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer, Stack, Button } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';

const Navbar = () => (
	<Flex p="2" bgColor="#024" width="full">
		<Box fontSize="3xl" color="white" fontWeight="bold">
			<Link href="/" paddingLeft="2">
				Stay.in
			</Link>
		</Box>
		<Spacer />

		<Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
			<Link href="/search?purpose=for-sale" passHref>
				<Button
					icon={<FcAbout />}
					as={'a'}
					color={'white'}
					fontSize={'sm'}
					fontWeight={400}
					variant={'link'}
					href={'#'}
				>
					Buy Property
				</Button>
			</Link>

			<Link href="/search?purpose=for-rent" passHref>
				<Button
					icon={<FiKey />}
					as={'a'}
					color={'white'}
					fontSize={'sm'}
					fontWeight={400}
					variant={'link'}
					href={'#'}
				>
					Rent Property
				</Button>
			</Link>

			<Link href="/search" passHref>
				<Button
					icon={<BsSearch />}
					as={'a'}
					color={'white'}
					fontSize={'sm'}
					fontWeight={400}
					variant={'link'}
					href={'#'}
				>
					Search
				</Button>
			</Link>

			<Link href="/signin" passHref>
				<Button as={'a'} color={'white'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}>
					Sign In
				</Button>
			</Link>

			<Link href="/auth" passHref>
				<Button as={'a'} color={'white'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}>
					Google+
				</Button>
			</Link>
			{/* <Link href='/signup' passHref>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.500'}
            href={'#'}
            _hover={{
              bg: 'blue.900',
            }}>
            Sign Up
          </Button></Link> */}
			<Link href="/propertyform" passHref>
				<Button
					display={{ base: 'none', md: 'inline-flex' }}
					fontSize={'sm'}
					fontWeight={600}
					color={'white'}
					bg={'blue.500'}
					href={'#'}
					_hover={{
						bg: 'blue.900'
					}}
				>
					List a Property!
				</Button>
			</Link>
		</Stack>
	</Flex>
);

export default Navbar;
