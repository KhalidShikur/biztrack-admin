import { useMemo, useState } from 'react';
import { Form, Head } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import AuthShell from '@/layouts/AuthShell';
import { store } from '@/routes/two-factor/login';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState(false);
    const [code, setCode] = useState('');

    const authConfigContent = useMemo(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery code',
                description:
                    'Enter one of your emergency recovery codes to continue.',
                toggleText: 'use an authentication code',
            };
        }

        return {
            title: 'Authentication code',
            description:
                'Enter the code from your authenticator application.',
            toggleText: 'use a recovery code',
        };
    }, [showRecoveryInput]);

    const toggleRecoveryMode = (clearErrors: () => void) => {
        setShowRecoveryInput((prev) => !prev);
        clearErrors();
        setCode('');
    };

    return (
        <>
            <Head title="Two-factor authentication" />

            <AuthShell
                title={authConfigContent.title}
                subtitle={authConfigContent.description}
            >
                <Form
                    {...store.form()}
                    resetOnError
                    resetOnSuccess={!showRecoveryInput}
                >
                    {({ errors, processing, clearErrors }) => (
                        <div className="space-y-5">
                            {showRecoveryInput ? (
                                <div>
                                    <Input
                                        name="recovery_code"
                                        type="text"
                                        placeholder="Enter recovery code"
                                        autoFocus
                                    />
                                    <InputError
                                        message={errors.recovery_code}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center space-y-3">
                                    <InputOTP
                                        name="code"
                                        maxLength={OTP_MAX_LENGTH}
                                        value={code}
                                        onChange={setCode}
                                        disabled={processing}
                                        pattern={REGEXP_ONLY_DIGITS}
                                    >
                                        <InputOTPGroup>
                                            {Array.from(
                                                { length: OTP_MAX_LENGTH },
                                                (_, index) => (
                                                    <InputOTPSlot
                                                        key={index}
                                                        index={index}
                                                    />
                                                ),
                                            )}
                                        </InputOTPGroup>
                                    </InputOTP>

                                    <InputError message={errors.code} />
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Continue
                            </Button>

                            <p className="text-center text-sm text-neutral-400">
                                Or{' '}
                                <button
                                    type="button"
                                    onClick={() =>
                                        toggleRecoveryMode(clearErrors)
                                    }
                                    className="text-white underline"
                                >
                                    {authConfigContent.toggleText}
                                </button>
                            </p>
                        </div>
                    )}
                </Form>
            </AuthShell>
        </>
    );
}
