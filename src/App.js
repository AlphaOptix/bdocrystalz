import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  responsiveFontSizes
} from '@material-ui/core/styles'
import './App.css'
import React, { Suspense, lazy } from 'react'
import 'fontsource-roboto'
import { CircularProgress, Link } from '@material-ui/core'

const DataView = lazy(() => import('./components/DataView'))

let darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})
darkTheme = responsiveFontSizes(darkTheme)

function App () {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container style={{ paddingTop: 25, paddingBottom: 25 }}>
        <Container style={{ paddingBottom: 30 }} disableGutters>
          <Typography variant='h4' component='h1' gutterBottom>
            BDO Crystalz
          </Typography>
          <Typography variant='h6' component='h2' gutterBottom>
            Black Desert Online Crystal Reference <Typography style={{ color: "DarkRed" }}>(Note: Out of date)</Typography>
          </Typography>
          <Typography gutterBottom>
            Need to know if there is an AP crystal for your offhand weapon? Now
            you can find out!
          </Typography>
          <Typography gutterBottom>
            This is a reference for Black Desert Online items called crystals.
            Crystals are used to slot into specific gear pieces in order to give
            you some added effects. With this site, you can easily find which
            crystals suit your specific needs by filtering by the crystal's{' '}
            <em>grade</em>, <em>the effects it grants</em>,{' '}
            <em>which slot it goes in</em>, and{' '}
            <em>how often it is likely to break when you die.</em>
          </Typography>
          <Typography gutterBottom>
            See something that's wrong? Have a suggestion for new features?
            Create an <strong>issue</strong> or <strong>pull request</strong> on
            our{' '}
            <Link
              target='_blank'
              rel='noreferrer'
              href='https://github.com/AlphaOptix/bdocrystalz'
            >
              Github
            </Link>
            .
          </Typography>
        </Container>
        <Suspense
          fallback={
            <Container style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress disableShrink size={40} />
            </Container>
          }
        >
          <DataView />
        </Suspense>
        <Container
          style={{ marginTop: 25, display: 'flex', justifyContent: 'center' }}
        >
          <Typography variant='body2'>
            Copyright &copy; 2016-2021 AlphaOptix
          </Typography>
        </Container>
      </Container>
    </ThemeProvider>
  )
}

export default App
