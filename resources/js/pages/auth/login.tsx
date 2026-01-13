import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthShell from '@/layouts/AuthShell';

import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <>
            <Head title="Login" />

            <AuthShell
                title="Welcome back"
                subtitle="Sign in to access your dashboard"
            >
                {status && (
                    <div className="mb-4 rounded-md bg-green-500/10 px-3 py-2 text-center text-sm text-green-400">
                        {status}
                    </div>
                )}

                <Form {...store.form()} resetOnSuccess={['password']}>
                    {({ processing, errors }) => (
                        <div className="space-y-4">
                            <div>
                                <Label>Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@email.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <div className="mb-1 flex items-center justify-between">
                                    <Label>Password</Label>

                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs text-neutral-400 underline hover:text-white"
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>

                                <Input
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" name="remember" />
                                <Label htmlFor="remember" className="text-sm">
                                    Remember me
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Sign in
                            </Button>

                            {canRegister && (
                                <p className="text-center text-sm text-neutral-400">
                                    Don’t have an account?{' '}
                                    <TextLink
                                        href={register()}
                                        className="text-white underline"
                                    >
                                        Create one
                                    </TextLink>
                                </p>
                            )}
                        </div>
                    )}
                </Form>
            </AuthShell>
        </>
    );
}
