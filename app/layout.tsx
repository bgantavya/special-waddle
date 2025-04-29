import React from 'react'
import { UserProvider } from '@context/UserContext'

export const metadata = {
    title: "deal-er | best property deals"
}

export default function RootLayout({children} : {children : React.ReactNode}) {
    return(
        <html lang='en'>
            <head>
                {/* favicon */}
                <link rel='icon' sizes='16x16' href='/favicon/favicon-16x16.png' />
                <link rel='icon' sizes='32x32' href='/favicon/favicon-32x32.png' />
                <link rel='icon' sizes='64x64' href='/favicon/favicon-64x64.png' />

            </head>
            <body>
                <UserProvider>
                    {
                        children
                    }
                </UserProvider>
            </body>
        </html>
    )
}