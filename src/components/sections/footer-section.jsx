import { ruang_pena } from '@/assets'
import Image from 'next/image'
import React from 'react'
import { BodyText, ClickAbleBadge } from '..'
import { socialMediaBadge } from '@/constant/mockdata'

const FooterSection = () => {
    return (
        <footer className='bg-white border-t mt-24 border-stone-300 py-5'>
            <div className='container flex justify-center lg:justify-between mx-auto max-w-[996px] items-center flex-wrap gap-9'>
                <div className='logo-copyright flex gap-4 flex-col w-fit items-center justify-center'>
                    <Image alt='logo ruang pena' src={ruang_pena}/>
                    <BodyText variant='base' classname={"text-stone-700"}>Copyright Daffa Putra © 2025</BodyText>
                </div>
                <div className='flex gap-4  flex-wrap justify-center'>
                    {socialMediaBadge.map((element) => (
                        <ClickAbleBadge key={element.id} href={element.href} icon={element.icon}>
                            {element.nama}
                        </ClickAbleBadge>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default FooterSection