import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthShell from '@/layouts/AuthShell';
import TextLink from '@/components/text-link';

export default function Register() {
    return (
        <>
            <Head title="Register" />

            <AuthShell
                title="Create account"
                subtitle="Start managing your business in minutes"
            >
                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                >
                    {({ processing, errors }) => (
                        <div className="space-y-4">
                            <div>
                                <Label>Name</Label>
                                <Input name="name" placeholder="John Doe" />
                                <InputError message={errors.name} />
                            </div>

                            <div>
                                <Label>Email</Label>
                                <Input name="email" placeholder="you@email.com" />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div>
                                <Label>Confirm password</Label>
                                <Input
                                    type="password"
                                    name="password_confirmation"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Create account
                            </Button>

                            <p className="text-center text-sm text-neutral-400">
                                Already have an account?{' '}
                                <TextLink
                                    href={login()}
                                    className="text-white underline"
                                >
                                    Login
                                </TextLink>
                            </p>
                        </div>
                    )}
                </Form>
            </AuthShell>
        </>
    );
}
