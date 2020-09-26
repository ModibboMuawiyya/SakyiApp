import React, { Fragment, useContext } from 'react'
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const HomePage = () => {
    const rootStore = useContext(RootStoreContext)
    const { isLoggedIn, user } = rootStore.userStore
    const { openModal } = rootStore.modalStore;
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.jpg' alt='logo' style={{ marginBottom: 12 }} />
                    Sakyi
                </Header>
                {isLoggedIn && user ? (
                    <Fragment>
                        <Header as='h2' inverted content={`Welcome ${user.displayName}`} />
                        <Button as={Link} to='/fabrics' size='huge' inverted>
                            Go to Fabrics
                        </Button>
                    </Fragment>
                ) : (
                        <Fragment>
                            <Header as='h2' inverted content='Welcome to Sakyi' />
                            <Button onClick={() => openModal(<LoginForm />)} to='/login' size='huge' inverted>
                                Login
                        </Button>
                            <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
                                Register
                        </Button>
                        </Fragment>

                    )}
            </Container>
        </Segment>
    );
};

export default HomePage
