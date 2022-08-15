import React, { useState } from 'react'
import type { NextPage } from 'next'
import cx from 'classnames'
import Image from 'next/image'
import { Container } from 'react-bootstrap'
import { gql } from '@apollo/client'
import client from '../apollo-client'
import Header from '@/components/Header/Header'
import BuddyList from '@/components/BuddyList/BuddyList'
import SearchBlock from '@/components/SearchBlock/SearchBlock'
import { IBuddy } from 'types'
import styles from '../styles/Home.module.scss'


interface IProps {
  buddies: IBuddy[];
}

const Home: NextPage<IProps> = ({ buddies }) => {
  const [inputText, setInputText] = useState<string>('')

  return (
    <>
      <Header
        title="Crypto buddies | Home"
      />
      <main>
        <Container>
          <SearchBlock
            inputText={inputText}
            setInputText={setInputText}
            buddies={buddies}
          />
          <div className={cx({[styles.halfVis]: !!inputText})}>
            <h1 className={styles.header}>
              Fresh cryptobuddies
            </h1>
            <BuddyList
              buddies={buddies}
            />
          </div>
        </Container>
      </main>
      <footer>
        <Image src="/made-with-heart.svg" alt="heart" width={77} height={11} />
      </footer>
    </>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Buddies {
        buddies(first: 10) {
          id
          image
          name
        }
      }
    `,
  })

  return {
    props: {
      buddies: data.buddies,
    },
  }
}

export default Home
