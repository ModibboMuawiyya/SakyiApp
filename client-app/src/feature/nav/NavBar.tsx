import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface IProps{
    openCreateForm: ()=> void;
}

const NavBar: React.FC<IProps> = ({openCreateForm}) => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.jpg" alt="logo" style={{marginRight: 10}}/>
                    Sakyi
                </Menu.Item>
                <Menu.Item name='Fabrics'/>
                <Menu.Item name='messages'>
                    <Button onClick={openCreateForm} positive content='Create Fabric'/>
                </Menu.Item>
            </Container>           
        </Menu>
    )
}


export default NavBar
