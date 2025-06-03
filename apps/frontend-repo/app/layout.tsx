import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme';
import {Providers} from "@/app/providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <body>
    <ThemeProvider theme={theme}>
      <Providers>
        {children}
      </Providers>
    </ThemeProvider>
    </body>
    </html>
  );
}
