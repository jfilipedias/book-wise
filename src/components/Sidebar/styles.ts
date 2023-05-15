import Link from 'next/link'
import SidebarBackgroundImage from '@/assets/sidebar-background.png'
import { styled } from '@/styles/stitches.config'

export const Container = styled('aside', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'fixed',
  width: 232,
  height: '100%',
  maxHeight: 'calc(100vh - $space$10)',
  margin: '$5',
  padding: '$10',
  background: `url(${SidebarBackgroundImage.src}) no-repeat`,
  backgroundSize: 'cover',
  borderRadius: '$lg',

  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 64,
  },
})

export const Navbar = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  minWidth: 100,
})

export const LoginLink = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const ProfileContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  width: '100%',
})

export const ProfileLink = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  gap: '$3',
})

export const LogoutButton = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  padding: '$2',
  borderRadius: '$sm',
  background: 'transparent',
  cursor: 'pointer',

  '&:hover': {
    background: '$gray600',
  },

  svg: {
    color: '$red',
    width: 20,
    height: 20,
  },
})
