/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ISBNMaskInput.tsx
import React from 'react';
import { IMaskInput } from 'react-imask';

interface ISBNMaskProps {
    name: string;
    onChange: (event: { target: { name: string; value: string } }) => void;
}

export const ISBNMaskInput = React.forwardRef<HTMLInputElement, ISBNMaskProps>(
    function ISBNMaskInput(props, ref) {
        const { onChange, name, ...other } = props;

        return (
            <IMaskInput
                {...other}
                mask="000-000-000-000-0"
                definitions={{
                    '0': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name, value } })}
                overwrite
            />
        );
    }
);
