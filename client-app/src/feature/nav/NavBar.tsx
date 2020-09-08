import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';


const NavBar: React.FC = () => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src="/assets/logo.jpg" alt="logo" style={{ marginRight: 10 }} />
                    Sakyi
                </Menu.Item>
                <Menu.Item name='Fabrics' as={NavLink} to='/fabrics' />
                <Menu.Item >
                    <Button as={NavLink} to='/createFabrics' positive content='Create Fabric' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}


export default observer(NavBar);
