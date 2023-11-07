import { ReactNode } from "react"

export function Tag({ icon, text }: { icon: ReactNode, text: string }) {
    return <div className="grow flex items-center justify-center rounded-lg text-black bg-info-main p-0 sm:p-1">
        {icon}
        <h6 className="text-black p-1">{text}</h6>
    </div>
}

export function MetaTag({ icon, text }: { icon: ReactNode, text: string }) {
    return <div className="flex items-center justify-center rounded-lg bg-info-dark pr-1 pl-1 text-primary-main">
        {icon}
        <h6 className="p-1 text-primary-main">{text}</h6>
    </div>
}