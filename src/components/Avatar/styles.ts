import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 42,
  height: 42,
  borderRadius: '$full',
  background: '$gradient-vertical',
})

export const AvatarRoot = styled(AvatarPrimitive.Root, {
  display: 'inline-block',
  width: 40,
  height: 40,
  borderRadius: '$full',
  overflow: 'hidden',
})

export const AvatarImage = styled(AvatarPrimitive.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
})

export const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '$gray600',

  svg: {
    width: 20,
    height: 20,
    color: '$gray400',
  },
})
