import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('../components/map'),
  { ssr: false }
)


const Home: NextPage = () => {
  return (<div className={styles.container}><Map/></div>)
}

export default Home
