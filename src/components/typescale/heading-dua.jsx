import React from 'react'

const HeadingDua = ({ classname, children }) => {
  return (
    <h1 className={`pt-serif text-[40px] tracking-[-2px] font-normal leading-[48px] md:text-[64px] md:leading-[70px] md:tracking-[-1.5px] ${classname}`}>{children}</h1>
  )
}

export default HeadingDua