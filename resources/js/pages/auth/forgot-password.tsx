import { login } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthShell from '@/layouts/AuthShell';
import TextLink from '@/components/text-link';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            <AuthShell
                title="Forgot your password?"
                subtitle="We’ll send you a reset link to your email"
            >
                {status && (
                    <div className="mb-4 rounded-md bg-green-500/10 px-3 py-2 text-center text-sm text-green-400">
                        {status}
                    </div>
                )}

                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <div className="space-y-4">
                            <div>
                                <Label>Email address</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    autoFocus
                                    placeholder="you@email.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                                data-test="email-password-reset-link-button"
                            >
                                {processing && <Spinner />}
                                Send reset link
                            </Button>
                        </div>
                    )}
                </Form>

                <p className="mt-4 text-center text-sm text-neutral-400">
                    Remember your password?{' '}
                    <TextLink href={login()} className="text-white underline">
                        Sign in
                    </TextLink>
                </p>
            </AuthShell>
        </>
    );
}
