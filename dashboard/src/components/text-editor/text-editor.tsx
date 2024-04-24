import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './text-editor.css';
import { Paper } from '@mui/material';
import { useRef } from 'react';



export default function TextEditor({ value, onChange }: { value: string, onChange: (value: string) => void }) {
    const ref = useRef<HTMLDivElement>(null)
    return (
        <Paper ref={ref} sx={{ backgroundColor: 'white', color: 'black', position: 'relative', zIndex: 10 }} elevation={2}>
            <ReactQuill theme="snow" value={value} onChange={onChange} />
        </Paper>
    )
}