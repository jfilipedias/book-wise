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
  borderRadius: '$md',

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

export const Login = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})
