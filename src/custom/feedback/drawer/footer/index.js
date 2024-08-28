import React from 'react';
import Footer_Submit from "./components/Submit";
import Footer_Cancel from "./components/Cancel";
import {Row} from "antd";

const Drawer_Footer = props => {
    return (
        <>
            <Row gutter={12} align="bottom"
                 style={{
                     background: 'var(--primary-color-menu)',
                     margin: '0-16px',
                     bottom: '0px',
                     position: 'fixed',
                     width: '100%',
                     height: '48px',
                     alignItems: 'center',
                     padding: '0 10px'

                 }}
            >
                <Footer_Submit/>
                <Footer_Cancel/>
            </Row>
        </>
    );
};

Drawer_Footer.propTypes = {};

export default Drawer_Footer;
