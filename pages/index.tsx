import type { NextPage } from 'next'
import Image from 'next/image'
import { Container } from 'react-bootstrap'
// import styles from '../styles/Home.module.css'
import { gql } from '@apollo/client'
import client from '../apollo-client'
import Header from '@/components/Header/Header'
import BuddyList from '@/components/BuddyList/BuddyList'
import { IBuddy } from 'types'

interface IProps {
  buddies: IBuddy[];
}

const Home: NextPage<IProps> = ({ buddies }) => {
  return (
    <>
      <Header
        title="Crypto buddies | Home"
      />
      <main>
        <Container>
          <BuddyList buddies={buddies} />
        </Container>
      </main>
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
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
