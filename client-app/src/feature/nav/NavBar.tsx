import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import FabricStore from "../../app/stores/fabricStore";
import { observer } from 'mobx-react-lite';


const NavBar: React.FC = () => {
    const fabricStore = useContext(FabricStore)
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.jpg" alt="logo" style={{ marginRight: 10 }} />
                    Sakyi
                </Menu.Item>
                <Menu.Item name='Fabrics' />
                <Menu.Item name='messages'>
                    <Button onClick={fabricStore.openCreateForm} positive content='Create Fabric' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}


export default observer(NavBar);
