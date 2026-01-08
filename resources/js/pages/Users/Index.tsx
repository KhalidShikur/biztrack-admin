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
        <div>
            <h1>Users</h1>
            <Link href="/users/create">Add User</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.is_active ? 'Active' : 'Inactive'}</td>
                            <td>
                                <Link href={`/users/${user.id}/edit`}>Edit</Link>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}