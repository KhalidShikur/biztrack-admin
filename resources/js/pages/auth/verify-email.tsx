import { Form, Head } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthShell from '@/layouts/AuthShell';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import TextLink from '@/components/text-link';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Verify email" />

            <AuthShell
                title="Verify your email"
                subtitle="Check your inbox and click the link we sent you"
            >
                {status === 'verification-link-sent' && (
                    <div className="mb-4 rounded-md bg-green-500/10 px-3 py-2 text-center text-sm text-green-400">
                        A new verification link has been sent to your email.
                    </div>
                )}

                <Form {...send.form()}>
                    {({ processing }) => (
                        <div className="space-y-4 text-center">
                            <Button
                                type="submit"
                                className="w-full"
                                variant="secondary"
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Resend verification email
                            </Button>

                            <TextLink
                                href={logout()}
                                className="block text-sm text-neutral-400 underline hover:text-white"
                            >
                                Log out
                            </TextLink>
                        </div>
                    )}
                </Form>
            </AuthShell>
        </>
    );
}
