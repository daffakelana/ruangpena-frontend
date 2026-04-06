import Link from 'next/link'
import React from 'react'
import { BodyText } from '.'
import Image from 'next/image'

const ClickAbleBadge = ({ icon, children, classname, onClick, href }) => {
    const baseClass = `flex h-fit gap-1 items-center dm-sans text-stone-800 bg-stone-200 hover:bg-stone-300 border border-stone-300 px-2 py-1 rounded-sm ${classname}`

    if (href) {
        return (
            <Link href={href} className={baseClass}>
                <Image alt="icon" src={icon} />
                <BodyText variant="base">{children}</BodyText>
            </Link>
        )
    }

    return (
        <button type="button" onClick={onClick} className={baseClass}>
            <Image alt="icon" src={icon} />
            <BodyText variant="base">{children}</BodyText>
        </button>
    )
}

export default ClickAbleBadge