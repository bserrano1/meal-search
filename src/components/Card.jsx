export const Card = ({children}) => {
  return (
    <div className="w-full max-w-xs flex flex-col justify-start mx-auto bg-[var(--color-surface)] rounded-xl shadow-lg overflow-hidden border border-[var(--color-surface)] p-6 mb-6 transition-transform duration-200 hover:shadow-2xl hover:-translate-y-1 text-[var(--color-text)] group">
      {children}
    </div>
  )
}
