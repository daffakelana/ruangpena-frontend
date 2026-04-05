import React from 'react'
import clsx from 'clsx'

const variants = {
    sm: 'text-sm font-semibold leading-[20px] tracking-[0px]',
    baseRegular: 'text-base font-normal leading-[24px] tracking-[0px]',
    base: 'text-base font-medium leading-[24px] tracking-[0px]',
    baseBold: 'text-[16px] font-semibold leading-[24px] tracking-[0px]',
    lg: 'text-[18px] font-medium leading-[28px] tracking-[-0.04px]',
    lgSemibold: 'text-[18px] font-semibold leading-[28px] tracking-[-0.04px]',
}

const BodyText = ({ children, variant = 'base', classname }) => {
    return (
        <p className={clsx(`dm-sans ${classname} `, variants[variant])}>
            {children}
        </p>
    )
}

export default BodyText
