'use client';

import NextLink from 'next/link';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

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
import Link from '@mui/material/Link';

interface PageType {
  label: string;
  href?: string;
  onClick?: () => void;
}

const pages: PageType[] = [
  {
    label: 'Artist',
    href: '/artist',
  },
  {
    label: 'Song',
    href: '/song',
  },
];

const signInPage: PageType[] = [
  {
    label: 'Log In',
    href: '/login',
  },
];

const signOutPage: PageType[] = [
  {
    label: 'Log Out',
    onClick: () => {
      signOut();
    },
  },
];

interface HeaderProps {
  data?: {
    name: string;
    email: string;
  };
}

export default function Header({ data }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const displayedPages = data
    ? pages.concat(signOutPage)
    : pages.concat(signInPage);

  return (
    <AppBar position="static">
      <Toolbar>
        <Button href="/" sx={{ color: 'white' }} disableRipple>
          <LibraryMusicIcon sx={{ mr: 1 }} />
          <Typography>Library</Typography>
        </Button>

        <Box
          sx={{
            marginLeft: 'auto',
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
            onClick={handleClick}
            aria-controls={open ? 'library-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            open={open}
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'library-button',
            }}
          >
            {pages.map((p, i) => (
              <MenuItem key={p.label}>
                <Link
                  component={NextLink}
                  href={p.href || ''}
                  underline="none"
                  onClick={() => {
                    setAnchorEl(null);
                  }}
                >
                  {p.label}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box
          sx={{
            marginLeft: 'auto',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {displayedPages.map((p, i) => (
            <Button
              key={p.label}
              sx={{ color: 'white' }}
              href={p.href}
              onClick={p.onClick}
            >
              {p.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
