import { React } from 'react'

const SectionDescription = ({ content }) => {
  return (
    <section>
      <div className="max-w-[996px] mx-auto pt-14 pb-4 px-4 lg:px-0">
        <div
          className="max-w-[700px] prose prose-stone prose-lg"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  )
}

export default SectionDescription