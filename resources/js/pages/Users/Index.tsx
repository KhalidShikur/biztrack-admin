import { usePage, Link, router } from '@inertiajs/react';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';

type Role = 'admin' | 'staff';

interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    is_active: boolean;
}

interface PageProps extends InertiaPageProps {
    users: User[];
}

export default function Index() {
    const { users } = usePage<PageProps>().props;

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            router.delete(`/users/${id}`);
        }
    };

    return (
        <div className="rounded-xl border p-4 bg-white dark:bg-[#0a0a0a]">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="mb-1 font-medium">Users</h1>
                <Link href="/users/create" className="inline-block rounded-sm border border-[#19140035] px-4 py-1.5 text-sm leading-normal hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC]">Add User</Link>
            </div>

            <table className="w-full table-fixed text-sm">
                <thead>
                    <tr>
                        <th className="text-left text-sm text-neutral-400 pb-2">Name</th>
                        <th className="text-left text-sm text-neutral-400 pb-2">Email</th>
                        <th className="text-left text-sm text-neutral-400 pb-2">Role</th>
                        <th className="text-left text-sm text-neutral-400 pb-2">Status</th>
                        <th className="text-left text-sm text-neutral-400 pb-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-t">
                            <td className="py-2">{user.name}</td>
                            <td className="py-2">{user.email}</td>
                            <td className="py-2">{user.role}</td>
                            <td className="py-2">{user.is_active ? 'Active' : 'Inactive'}</td>
                            <td className="py-2">
                                <Link href={`/users/${user.id}/edit`} className="text-sm underline mr-2">Edit</Link>
                                <button onClick={() => handleDelete(user.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}