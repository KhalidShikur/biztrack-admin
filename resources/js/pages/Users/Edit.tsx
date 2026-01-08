import { type ChangeEvent, type FormEvent } from 'react';
import { usePage, useForm } from '@inertiajs/react';

type Role = 'admin' | 'staff';

type FormValue = string | number | boolean | Blob | File | null;

interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}

interface PageProps {
    user: User;
    [key: string]: unknown;
}

interface UserForm {
    name: string;
    email: string;
    role: Role;
    [key: string]: FormValue;
}

export default function Edit() {
    const { user } = usePage<PageProps>().props;

    const { data, setData, put } = useForm<UserForm>({
        name: user.name,
        email: user.email,
        role: user.role
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setData(name, name === 'role' ? (value as Role) : value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={data.name} onChange={handleChange} required />
                <input type="email" name="email" value={data.email} onChange={handleChange} required />
                <select name="role" value={data.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                </select>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}