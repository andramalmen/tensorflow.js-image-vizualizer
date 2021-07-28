import * as React from 'react';
import Nav from './Nav';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Nav />
            <main>{children}</main>
        </>
    );
};

export default Layout;
