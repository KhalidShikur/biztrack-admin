import { update } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthShell from '@/layouts/AuthShell';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <>
            <Head title="Reset password" />

            <AuthShell
                title="Reset your password"
                subtitle="Choose a new password to secure your account"
            >
                <Form
                    {...update.form()}
                    transform={(data) => ({ ...data, token, email })}
                    resetOnSuccess={['password', 'password_confirmation']}
                >
                    {({ processing, errors }) => (
                        <div className="space-y-4">
                            <div>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={email}
                                    readOnly
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <Label>New password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    autoFocus
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div>
                                <Label>Confirm password</Label>
                                <Input
                                    type="password"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                                data-test="reset-password-button"
                            >
                                {processing && <Spinner />}
                                Reset password
                            </Button>
                        </div>
                    )}
                </Form>
            </AuthShell>
        </>
    );
}
