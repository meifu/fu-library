'use client';

import NextLink from 'next/link';
import { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface PageType {
  label: string;
  href: string;
}

const pages: PageType[] = [
  {
    label: 'Artist',
    href: '/artist',
  },
  {
    label: 'Songs',
    href: '/',
  },
];

export default function Header() {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const anchorEl = useRef<null | HTMLElement>(null);

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   if (event.target) {
  //     console.log(event.target);
  //     setAnchorEl(event.target as any);
  //   }
  // };

  return (
    <AppBar position="static">
      <Toolbar>
        <LibraryMusicIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography>Library</Typography>

        {/* <Box
          sx={{
            flexGrow: 1,
            display: {
              xs: 'flex',
              md: 'none',
            },
          }}
        >
          <IconButton
            ref={anchorEl as any}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl.current}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            open
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {pages.map((p, i) => (
              <MenuItem key={p.label}>
                <NextLink href={p.href}>
                  <Typography textAlign="center">{p.label}</Typography>
                </NextLink>
              </MenuItem>
            ))}
          </Menu>
        </Box> */}

        <LibraryMusicIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            textDecoration: 'none',
            letterSpacing: '.3rem',
          }}
        >
          Library
        </Typography>
        <Box
          sx={{
            marginLeft: 'auto',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {pages.map((p, i) => (
            <Button key={p.label} sx={{ color: 'white' }} href={p.href}>
              {p.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
