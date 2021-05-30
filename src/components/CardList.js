import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image, Label } from 'semantic-ui-react'

export function CommunityCard({
    community: { _id, name, city, province, image, memberCount },
    guest
}) {
    return (
        <>
            {guest == 'true' ?
                (<Card as={Link} to={`/community-guest/${_id}`}
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                    <Image
                        src={image}
                        wrapped
                    />
                    <Card.Content textAlign='center'>
                        <Card.Header>{name}</Card.Header>
                        <Card.Description>
                            <Label size='small'>
                                <Icon name='map marker' />{city}
                            </Label>
                            <Label size='small'>
                                <Icon name='map pin' />{province}
                            </Label>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='user' />{memberCount} {memberCount <= 1 ? "member" : "members"}
                    </Card.Content>
                </Card>)
                :
                (<Card as={Link} to={`/community/${_id}`}
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                    <Image
                        src={image}
                        wrapped
                    />
                    <Card.Content textAlign='center'>
                        <Card.Header>{name}</Card.Header>
                        <Card.Description>
                            <Label size='small'>
                                <Icon name='map marker' />{city}
                            </Label>
                            <Label size='small'>
                                <Icon name='map pin' />{province}
                            </Label>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='user' />{memberCount} {memberCount <= 1 ? "member" : "members"}
                    </Card.Content>
                </Card>)
            }
        </>
    )
}

{/* <Card>
    <Image
        src={image}
        wrapped
    />
    <Card.Content textAlign='center'>
        <Card.Header>
            {guest == 'true' ?
                <Link to={`/community-guest/${_id}`}
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                    {name}
                </Link> :
                <Link to={`/community/${_id}`}
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                    {name}
                </Link>
            }
        </Card.Header>
        <Card.Description>
            <Label size='small'>
                <Icon name='map marker' />{city}
            </Label>
            <Label size='small'>
                <Icon name='map pin' />{province}
            </Label>
        </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Icon name='user' />{memberCount} {memberCount <= 1 ? "member" : "members"}
    </Card.Content>
</Card> */}