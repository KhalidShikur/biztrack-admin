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
        <div className="rounded-xl border p-4 bg-white dark:bg-[#0a0a0a]">
            <h1 className="mb-1 font-medium">Edit User</h1>
            <form onSubmit={handleSubmit} className="grid gap-3 max-w-md">
                <label className="block">
                    <span className="text-sm text-neutral-400">Name</span>
                    <input type="text" name="name" value={data.name as string} onChange={handleChange} required className="w-full rounded border px-3 py-2 text-sm bg-white dark:bg-[#0a0a0a]" />
                </label>

                <label className="block">
                    <span className="text-sm text-neutral-400">Email</span>
                    <input type="email" name="email" value={data.email as string} onChange={handleChange} required className="w-full rounded border px-3 py-2 text-sm bg-white dark:bg-[#0a0a0a]" />
                </label>

                <label className="block">
                    <span className="text-sm text-neutral-400">Role</span>
                    <select name="role" value={data.role} onChange={handleChange} className="w-full rounded border px-3 py-2 text-sm bg-white dark:bg-[#0a0a0a]">
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                    </select>
                </label>

                <div>
                    <button type="submit" className="inline-block rounded-sm border border-black bg-[#1b1b18] px-4 py-1.5 text-sm text-white">Update</button>
                </div>
            </form>
        </div>
    );
}