function Column({ children, className }) {
    return (
        <div className={"rounded-md bg-slate-300 p-4 flex basis-1/3 h-full " + className}>
            {children}
        </div> 
    )
}

export default Column