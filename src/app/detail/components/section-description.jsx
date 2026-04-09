import React from 'react'
import clsx from 'clsx'

const SectionDescription = ({ content }) => {
  return (
    <section>
      <div className="max-w-[996px] mx-auto  lg:pt-0 pb-4 px-4 lg:px-0">
        <div
          className={clsx(
            'max-w-[700px] 2xl:max-w-[900px] dm-sans text-stone-900 py-9',
            // Headings
            '[&_h1]:text-[2em] [&_h1]:font-bold [&_h1]:leading-[1.3] [&_h1]:mb-4 [&_h1]:mt-8',
            '[&_h2]:text-[1.5em] [&_h2]:font-bold [&_h2]:leading-[1.3] [&_h2]:mb-3 [&_h2]:mt-7',
            '[&_h3]:text-[1.25em] [&_h3]:font-semibold [&_h3]:leading-[1.3] [&_h3]:mb-3 [&_h3]:mt-6',
            // Paragraph — pakai variant lg dari BodyText
            '[&_p]:text-[18px] [&_p]:font-medium [&_p]:leading-[28px] [&_p]:tracking-[-0.04px] [&_p]:mb-4 [&_p]:text-stone-800',
            // Bold & Italic
            '[&_strong]:font-semibold',
            '[&_em]:italic',
            '[&_s]:line-through',
            // Link
            '[&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-blue-800',
            // List
            '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1',
            '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1',
            '[&_li]:text-[18px] [&_li]:font-medium [&_li]:leading-[28px] [&_li]:text-stone-800',
            // Blockquote
            '[&_blockquote]:border-l-[3px] [&_blockquote]:border-stone-300 [&_blockquote]:pl-4 [&_blockquote]:my-6 [&_blockquote]:text-stone-500 [&_blockquote]:italic',
            // Code
            '[&_code]:bg-red-50 [&_code]:text-red-600 [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px] [&_code]:font-mono',
            '[&_pre]:bg-red-50 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:my-4 [&_pre]:overflow-x-auto',
            '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  )
}

export default SectionDescription