import Link from 'next/link'
import React from 'react'
import { BodyText } from '.'
import Image from 'next/image'
import { github_icon } from '@/assets'

const ClickAbleBadge = ({ icon, children, classname }) => {
    return (
        <Link href="https://github.com" className={`flex h-fit gap-1 items-center dm-sans text-stone-800 bg-stone-200 hover:bg-stone-300 border border-stone-300 px-2 py-1 rounded-sm ${classname}`}>
            <Image alt='icon' src={icon}/>
            <BodyText variant="base" >{children}</BodyText>
        </Link>
    )
}

export default ClickAbleBadge