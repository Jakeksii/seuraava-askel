import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import { BaseSyntheticEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from "../context/appContext";
import useDetailedOrganizations from "../hooks/api-hooks/useDetailedOrganisations";
import { useAddUpdateUser } from '../hooks/api-hooks/useOrganizationUsers';
import { Organization } from '../types';
import { ErrorNode } from './partials/Error';
import Loading from './partials/Loading';
import { getDateTimeFromUTC } from '../functions/formatDates';

type User = {
    user_id?: string
    user_name: string
    user_email: string
    role: "user" | "admin" | "owner"
    _id: string
}
type FormData = {
    email: string
    role: 'owner' | 'admin' | 'user'
}
type CurrentUser = {
    email: string
}

function User({ user, updateUser, imOwner }: { user: User, updateUser: (user: User) => void, imOwner: boolean }) {
    const [selectedRole, setSelectedRole] = useState<string>(user.role)
    const disabled = selectedRole === user.role

    function handleClick() {
        updateUser({
            ...user,
            role: selectedRole as "user" | "admin" | "owner"
        })
    }

    return <>
        <div className='flex flex-col grow'>
            <p><b>{user.user_name}</b></p>
            <p>{user.user_email}</p>
            <div>
                <select
                    required
                    onChange={(e) => setSelectedRole(e.target.value)}
                    value={selectedRole}
                    className='text-black rounded-sm mr-2'>
                    <option disabled={!imOwner} value={'owner'}>Owner</option>
                    <option value={'user'}>User</option>
                    <option value={'admin'}>Admin</option>
                </select>
                <Button
                    color='success'
                    size='small'
                    disabled={disabled}
                    aria-disabled={disabled}
                    onClick={handleClick}>
                    Tallenna
                </Button>
            </div>

        </div>
        <IconButton color='info' className='h-full'>
            <DeleteIcon />
        </IconButton>
    </>
}

function UserList({ data, updateUser, currentUser }: { data: Organization, updateUser: (user: User) => void, currentUser: CurrentUser }) {
    return (
        <ul className='text-white text-left'>
            {data.organization_users.map((user, index) => {
                const owner = user.role === 'owner'
                const me = user.user_email === currentUser.email
                const imOwner = owner && me

                if (!user.invitation) {
                    return (owner || me) ? (
                        <li key={index} className='mt-2 p-2 pl-4 bg-primary-main shadow-md rounded-md'>
                            <p><b>{user.user_name} {me ? '(minä)' : ''}</b></p>
                            <p>{user.user_email}</p>
                            <p><b>{user.role}</b></p>
                        </li>
                    ) : (
                        <li key={index} className='mt-2 p-2 pl-4 flex items-center bg-primary-main shadow-md rounded-md'>
                            <User user={user} updateUser={updateUser} imOwner={imOwner} />
                        </li>
                    )
                } else {
                    const date = new Date(user.created_at)
                    const dateTime = getDateTimeFromUTC(user.created_at)
                    const expires = getDateTimeFromUTC(new Date(date.setSeconds(date.getSeconds() + 604800)))
                    return (
                        <li key={index} className='mt-2 p-2 pl-4 bg-primary-dark shadow-md rounded-md flex items-center'>
                            <div className='grow'>
                                <p><b>Kutsu odottaa...</b></p>
                                <p>{user.user_email}</p>
                                <p><b>{user.role}</b></p>
                                <p><i>Lähetetty {dateTime.date}</i></p>
                                <p><i>Vanhenee {expires.date}</i></p>
                            </div>
                            <IconButton color='info' className='h-full'>
                                <DeleteIcon />
                            </IconButton>
                        </li>
                    )
                }
            })}
        </ul>
    )
}



export default function OrganizationUsers() {
    const { organization_id } = useParams() // We take org_id from URL so that you can always come back to organization with link
    const { user } = useAppContext()
    const { data, isLoading, isError, refetch } = useDetailedOrganizations({ organization_id: organization_id ?? "", token: user?.token ?? "" })
    const { mutate } = useAddUpdateUser()
    const [formData, setFormData] = useState<FormData>({
        email: '',
        role: 'user'
    })

    function mutateUser(user_email: string, role: "user" | "admin" | "owner"): void {
        mutate({
            organization_id: organization_id ?? "",
            token: user?.token ?? "",
            user_email: user_email,
            role: role
        }, {
            onSuccess() {
                // We have successfully
                refetch()
            },
        })
    }

    function updateUser(user: User) {
        if (user.role === 'owner') {
            // We ask for confirmation and after that update user data

        } else {
            // We update user data
            mutateUser(user.user_email, user.role)
        }
    }
    function addUser(e: BaseSyntheticEvent) {
        e.preventDefault()
        console.error('Need to implement confirmation')
        mutateUser(formData.email, formData.role)
    }
    function setFormValue(e: BaseSyntheticEvent) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <section className='m-auto max-w-xs bg-secondary-main p-2 rounded-lg'>
            <h3 className='pt-2 pb-2'>Käyttäjät</h3>
            <form onSubmit={addUser}>

                <input
                    required
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={setFormValue}
                    placeholder='käyttäjä@domain.fi'
                    className='w-full rounded-sm text-black p-1' />

                <div className='pt-2 flex gap-2'>

                    <select
                        required
                        id='role'
                        name='role'
                        value={formData.role}
                        onChange={setFormValue}
                        className='text-black rounded-sm p-1 grow'>
                        <option value={'user'}>User</option>
                        <option value={'admin'}>Admin</option>
                    </select>

                    <Button type='submit' variant='contained' color='success' disableElevation>
                        Lisää
                    </Button>

                </div>
            </form>
            {isError ? <ErrorNode /> : ((!isLoading && data) ? <UserList data={data} updateUser={updateUser} currentUser={{ email: user?.user.email ?? "" }} /> : <Loading />)}
        </section>
    )
}