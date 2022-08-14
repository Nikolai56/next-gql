import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { gql } from '@apollo/client'
import cx from 'classnames'
import client from '../../apollo-client'
import Image from 'next/image'
import { Container } from 'react-bootstrap'
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
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const [first, last] = name.split(' ')

  return (
    <>
      <Header
        title={`Crypto buddies | ${name}`}
      />
      <main className={styles.container}>
        <Container>
          <div className={styles.row}>
            <div className={cx(
              styles.image,
              'text-center',
              {
                [styles.active]: isLoaded,
              },
            )}
            >
              <img
                alt={name}
                src={image}
                height={168}
                width={168}
                // onLoad={() => setIsLoaded(true)}
              />
            </div>
            <div
              className={cx(
                styles.content,
                'text-center',
                'text-sm-start',
                {
                  [styles.active]: isLoaded,
                },
              )}
            >
              <h1 className={styles.heading}>
                {first}
                <br/>
                {last}
              </h1>
              <button className={styles.button}>Add Buddy</button>
            </div>
          </div>
        </Container>
      </main>
      <footer>
        <Image src="/made-with-heart.svg" alt="heart" width={77} height={11} />
      </footer>
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
