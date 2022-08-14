import React, { FC } from 'react'
import Link from 'next/link'
import cx from 'classnames'
import { IBuddy } from 'types'
import styles from './Buddy.module.scss'

interface IProps extends IBuddy {
  isActive: boolean;
  isInactive: boolean;
}

const Buddy: FC<IProps> = (
  {
    id,
    name,
    image,
    isActive,
    isInactive,
  }
) => {
  return (
    <Link
      data-test-id={`buddy-${id}`}
      href={`/details/${id}`}
    >
      <div className={cx(
        styles.container,
        {
          [styles.active]: isActive,
          [styles.inactive]: isInactive,
        },
      )}>
        <img
          alt={name}
          src={image}
          height={168}
          width={168}
        />
        <h3>{name}</h3>
      </div>
    </Link>
  )
}

export default Buddy
