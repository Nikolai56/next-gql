import React from 'react'
import Image from 'next/image'
import { NextPage } from 'next'
import { gql } from '@apollo/client'
import { Container, Row, Col } from 'react-bootstrap'
import client from '../../apollo-client'
import Header from '@/components/Header/Header'
import { IBuddy } from 'types'
import styles from '../../styles/Details.module.scss'

interface IProps {
  buddy: IBuddy;
}

const Details: NextPage<IProps> = ({ buddy }) => {
  const {
    image,
    name,
  } = buddy
  const [first, last] = name.split(' ')

  return (
    <>
      <Header
        title={`Crypto buddies | ${name}`}
      />
      <main className={styles.container}>
        <Container>
          <Row>
            <Col sm={4} md={3} lg={2}>
              <Image
                alt={name}
                src={image}
                height={168}
                width={168}
              />
            </Col>
            <Col sm={8} md={9} lg={10}>
              <h1 className={styles.heading}>
                {first}
                <br/>
                {last}
              </h1>
              <button className={styles.button}>Add Buddy</button>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export async function getServerSideProps(props: { params: { id: string } }) {
  const { data } = await client.query({
    query: gql`
      query Buddy($where: BuddyWhereUniqueInput!) {
        buddy(where: $where) {
          id
          image
          name
        }
      }
    `,
    variables: { where: { id: props.params.id } },
  })

  return {
    props: {
      buddy: data.buddy,
    },
  }
}

export default Details
