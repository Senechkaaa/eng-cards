import { FC, ReactNode } from 'react'
import cl from './Divider.module.scss'

interface DividerProps {
    children: ReactNode
}

export const Divider:FC<DividerProps> = (props) => {
    
    const {children} = props

    return (
        <div className={cl.divider}>
            <span className={cl.divider_title}>{children}</span>
        </div>
    )
}
