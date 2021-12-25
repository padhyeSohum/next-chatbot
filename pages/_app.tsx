import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../src/createEmotionCache';
import Head from 'next/head';
import type { AppProps } from 'next/app'
import { EmotionCache } from '@emotion/utils';

import '@/styles/global.css'
import theme from '../src/theme';


interface MyAppProps extends AppProps {
  emotionCache: EmotionCache
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({ Component, emotionCache, pageProps }: MyAppProps) {
  emotionCache = clientSideEmotionCache;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}