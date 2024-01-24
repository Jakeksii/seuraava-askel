import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CategoryIcon from '@mui/icons-material/Category';
import GroupsIcon from '@mui/icons-material/Groups';
import TranslateIcon from '@mui/icons-material/Translate';
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { ReactElement } from 'react';

export function MetaChip({ icon, text }: {icon:ReactElement, text?:string}) {
    if (!text) return
    return (
        <Chip
            color='info'
            icon={icon}
            label={
                <Typography fontWeight={'bold'}>
                    {text}
                </Typography>
            }
        />
    )
}

type Data = {
    denomination?: string
    language?: string
    types?: string[]
    size?: string
}

export function Chips({ data }: {data: Data}) {
    return (
        <>
            <MetaChip icon={<AccountBalanceIcon />} text={data.denomination} />
            <MetaChip icon={<TranslateIcon />} text={data.language} />
            <MetaChip icon={<GroupsIcon />} text={data.size} />
            {
                data.types && data.types.map((type: string, i: number) => <MetaChip icon={<CategoryIcon />} text={type} key={i}/>)
            }
        </>
    )
}