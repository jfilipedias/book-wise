import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$full',
  background: '$gradient-vertical',

  variants: {
    size: {
      sm: { width: 32, height: 32 },
      md: { width: 42, height: 42 },
      lg: { width: 72, height: 72 },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export const AvatarRoot = styled(AvatarPrimitive.Root, {
  display: 'inline-block',
  borderRadius: '$full',
  overflow: 'hidden',

  variants: {
    size: {
      sm: { width: 30, height: 30 },
      md: { width: 40, height: 40 },
      lg: { width: 70, height: 70 },
    },
  },

  defaultVariants: {
    size: 'md',
  },
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
