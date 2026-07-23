function Stack({ stack }: { stack: string[] }) {
  return (
    <div className="tags" aria-label="사용 기술">
      {stack.map((item) => (
        <code key={item}>{item}</code>
      ))}
    </div>
  )
}

export default Stack
