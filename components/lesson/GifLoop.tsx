// GIFs loop natively — no JS needed. This component adds the cultural frame
// and explanatory text alongside the pattern.

interface Props {
  gifUrl: string
  title: string
  description: string
}

export default function GifLoop({ gifUrl, title, description }: Props) {
  return (
    <div className="card-kirar p-5 flex flex-col sm:flex-row gap-5 items-start">
      {/* GIF frame */}
      <div className="gif-frame w-full sm:w-56 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gifUrl}
          alt={title}
          className="w-full h-auto object-cover"
          loading="lazy"
          // GIFs loop by default — no autoPlay or JS needed
        />
      </div>

      {/* Explanation */}
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-1">{title}</p>
          <p className="text-[#F5EDD6]/70 text-sm leading-relaxed">{description}</p>
        </div>

        {/* String legend */}
        <div className="mt-1">
          <p className="text-[#F5EDD6]/40 text-xs uppercase tracking-wider mb-2">Strings (low → high)</p>
          <div className="flex gap-2 flex-wrap">
            {['D', 'G', 'A', 'D', 'E', 'A'].map((note, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded border border-[rgba(201,168,76,0.25)] text-[#F5EDD6]/60"
              >
                {i + 1}. {note}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
