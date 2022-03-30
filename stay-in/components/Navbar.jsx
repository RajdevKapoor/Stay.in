import Link from 'next/link';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer, Stack, Button } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';

const Navbar = () => (
  <Flex p='2'  bgColor='#024' width='full'>
    <Box fontSize='3xl' color='white' fontWeight='bold'>
      <Link href='/' paddingLeft='2'>Stay.in</Link>
    </Box>
    <Spacer />

    <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
           
    <Box>
      <Menu>
        <MenuButton as={IconButton} icon={<FcMenu />} bgColor='#023' color='red.400' />
        <MenuList color={'black'} >
        <Link href='Stay.in\stay-in\pages\propertUpload.html' passHref>
            <MenuItem icon={<FcHome />}>List Your Property</MenuItem>
          </Link>
          <Link href='/' passHref>
            <MenuItem icon={<FcHome />}>Home</MenuItem>
          </Link>
          <Link href='/search' passHref>
            <MenuItem icon={<BsSearch />}>Search</MenuItem>
          </Link>
          <Link href='/search?purpose=for-sale' passHref>
            <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
          </Link>
          <Link href='/search?purpose=for-rent' passHref>
            <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
    
    <Link href='/signin' passHref>
            
          <Button
            as={'a'}
            color={'white'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}>
            Sign In
          </Button></Link>
          <Link href='/signup' passHref>
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
          </Button></Link>
          <Link href='/form' passHref>
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
            List a Property!
          </Button></Link>
        </Stack>
  </Flex>
);

export default Navbar;