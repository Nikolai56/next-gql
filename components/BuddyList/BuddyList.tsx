import React, { FC, useState } from 'react'
import Buddy from '@/components/Buddy/Buddy'
import { IBuddy } from 'types'
import styles from './BuddyList.module.scss'

interface IProps {
  buddies: IBuddy[];
}

const BuddyList: FC<IProps> = (
  {
    buddies,
  }
) => {
  const [activeId, setActiveId] = useState('')
  console.log(activeId, typeof activeId)

  const onMouseEnter: React.MouseEventHandler<HTMLElement> = (e) => {
    console.log('enter', e.currentTarget.dataset)
    setActiveId(e.currentTarget.dataset.id || '')
  }

  const onMouseLeave: React.MouseEventHandler<HTMLElement> = (e) => {
    console.log('leave')
    setActiveId('')
  }

    return (
    <div className={styles.buddiesList}>
      {buddies.map(buddie => (
        <div
          data-id={buddie.id}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          key={buddie.id}
        >
          <Buddy
            id={buddie.id}
            image={buddie.image}
            name={buddie.name}
            isActive={activeId === buddie.id}
            isInactive={activeId !== '' && activeId !== buddie.id}
          />
        </div>
      ))}
    </div>
  )
}

export default BuddyList
