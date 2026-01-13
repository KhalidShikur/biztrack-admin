import { ReactNode } from 'react';

interface Props {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

export default function AuthShell({ title, subtitle, children }: Props) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
            <div className="w-full max-w-md rounded-2xl bg-neutral-900 p-8 shadow-lg">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    {subtitle && (
                        <p className="mt-2 text-sm text-neutral-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                {children}
            </div>
        </div>
    );
}
