import { Paper, styled } from '@mui/material';
import { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './text-editor.css';

const Styled = styled('div')(({ theme }) => ({
    p: { ...theme.typography.body1 },
    h2: { ...theme.typography.h2 },
    h3: { ...theme.typography.h3 },
    '& ul, & ol': {
        listStyle: 'none', // Remove default list styles
        padding: 0, // Remove default padding
        '& li': {
            ...theme.typography.body1, // Apply list item styles
            marginBottom: theme.spacing(1), // Adjust margin as needed
        },
    },
}))

export default function TextEditor({ value, onChange }: { value: string, onChange: (value: string) => void }) {
    const ref = useRef<ReactQuill>(null)

    

    const modules = {
        toolbar: [
            [{ 'header': [2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ],
    }

    return (
        
        <Paper sx={{ backgroundColor: 'white', color: 'black', position: 'relative', zIndex: 10 }} elevation={2}>
            <Styled>
                <ReactQuill ref={ref} theme="snow" value={value} onChange={onChange} modules={modules} />
            </Styled>
        </Paper>
    )
}