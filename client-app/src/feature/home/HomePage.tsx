import React from 'react'
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.jpg' alt='logo' style={{ marginBottom: 12 }} />
                    Sakyi
                </Header>
                <Header as='h2' inverted content='Welcome to Sakyi' />
                <Button as={Link} to='/fabrics' size='huge' inverted>
                    Take me to see some fabrics!
                </Button>
            </Container>
        </Segment>
    );
};

export default HomePage
