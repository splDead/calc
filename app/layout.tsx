import { Container } from '@mui/material';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <html lang='ru'>
            <body>
                <Container maxWidth='sm'>
                    {children}
                </Container>
            </body>
        </html>
    );
}
