import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthShell from '@/layouts/AuthShell';
import { store } from '@/routes/password/confirm';
import { Form, Head } from '@inertiajs/react';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />

            <AuthShell
                title="Confirm your password"
                subtitle="Please verify your password to continue"
            >
                <Form {...store.form()} resetOnSuccess={['password']}>
                    {({ processing, errors }) => (
                        <div className="space-y-4">
                            <div>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    autoFocus
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                                data-test="confirm-password-button"
                            >
                                {processing && <Spinner />}
                                Confirm
                            </Button>
                        </div>
                    )}
                </Form>
            </AuthShell>
        </>
    );
}
