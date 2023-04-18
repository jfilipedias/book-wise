import { globalCss } from './stitches.config'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },

  body: {
    backgroundColor: '$gray800',
    color: '$gray100',
    '--webkit-font-smoothing': 'antialiased',
  },

  a: {
    textDecoration: 'none',
    color: '$gray200',
  },
})
