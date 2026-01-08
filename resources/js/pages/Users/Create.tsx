import { type ChangeEvent, type FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

type Role = 'admin' | 'staff';

type FormValue = string | number | boolean | Blob | File | null;

interface UserForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: Role;
    [key: string]: FormValue;
}

const initialData: UserForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'staff'
};

export default function Create() {
    const { data, setData, post } = useForm<UserForm>(initialData);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setData(name, name === 'role' ? (value as Role) : value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/users');
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                />
                <select name="role" value={data.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                </select>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}