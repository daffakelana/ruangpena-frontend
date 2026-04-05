import React from 'react'

const HeadingSatoe = ({classname, children}) => {
  return (
    <h1 className={`pt-serif text-5xl text-stone-900 tracking-[-2px] font-normal leading-[53px] md:text-7xl md:leading-[78px] md:tracking-[-3.5px] ${classname}`}>{children}</h1>
  )
}

export default HeadingSatoe