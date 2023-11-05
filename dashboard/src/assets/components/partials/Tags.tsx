import { ReactNode } from "react"

export function Tag({ icon, text }: { icon: ReactNode, text: string }) {
    return <div className="grow flex items-center justify-center rounded-full bg-primary-main text-white p-0 sm:p-1">
        {icon}
        <h6 className="text-white p-1">{text}</h6>
    </div>
}

export function MetaTag({ icon, text }: { icon: ReactNode, text: string }) {
    return <div className="flex items-center justify-center rounded-full bg-secondary-light pr-1 pl-1 text-slate-900">
        {icon}
        <h6 className="p-1 text-slate-900">{text}</h6>
    </div>
}