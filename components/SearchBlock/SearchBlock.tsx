import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
import cx from 'classnames'
import Image from 'next/image'
import BuddyList from '@/components/BuddyList/BuddyList'
import { IBuddy } from 'types'
import styles from './SearchBlock.module.scss'

interface IProps {
  buddies: IBuddy[];
  inputText: string;
  setInputText: (value: string) => void;
}

const SearchBlock: FC<IProps> = (
  {
    buddies,
    inputText,
    setInputText,
  }
) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [inputRef])

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const newValue = e.target.value.replace(/\s/g, '\n')

    if (/^[a-z\n]*/ig.test(newValue)) {
      setInputText(newValue)
    }
  }

  const handleClear = () => {
    setInputText('')
    inputRef?.current?.focus()
  }

  const getFiltered = () => {
    const [inputFirst, inputLast] = inputText.split('\n')

    return buddies.filter((buddy) => {
      const [first, last] = buddy.name.split(' ')

      const doesIncludesFirst = first?.toLowerCase()
        .includes(inputFirst?.toLowerCase())
      const doesIncludesLast = last?.toLowerCase()
        .includes(inputLast?.toLowerCase())

      if (inputLast) {
        return doesIncludesFirst && doesIncludesLast
      }
      return doesIncludesFirst
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <div className={styles.iconSearch}>
          <Image src="/search.svg" alt="search" width={40} height={40} />
        </div>
        <textarea
          ref={inputRef}
          value={inputText}
          className={styles.textarea}
          placeholder={'Crypto\nbuddies'}
          onInput={handleInputChange}
        />
        {inputText && (
          <div className={styles.iconClear} onClick={handleClear}>
            <Image
              src="/close.svg"
              alt="clear"
              width={24}
              height={24}
            />
          </div>
        )}
      </div>
      <div className={cx(styles.list, {[styles.transition]: inputText})}>
        {inputText && (
          <BuddyList
            buddies={getFiltered()}
          />
        )}
      </div>
    </div>
  )
}

export default SearchBlock
