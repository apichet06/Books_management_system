/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { TextField } from "@mui/material";
import React from "react";

interface ISBNMaskProps {
    name: string;
    label: string;
    disabled?: boolean;
}

interface CustomIMaskProps {
    name: string;
    onChange: (event: { target: { name: string; value: string } }) => void;
    inputRef: React.Ref<any>;
}

const ISBNMaskInput = React.forwardRef<HTMLInputElement, CustomIMaskProps>(
    function ISBNMaskInput(props, ref) {
        const { onChange, name, ...rest } = props;

        return (
            <IMaskInput
                {...rest}
                mask="000-000-00-0000-0"
                definitions={{ '0': /[0-9]/ }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name, value } })}
                overwrite
                lazy={false}             // << สำคัญมาก!
                placeholderChar="_"      // << แสดง "_" ในช่องว่าง
            />

        );
    }
);

export const ISBNFieldHook = ({ name, label, disabled }: ISBNMaskProps) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    variant="standard"
                    fullWidth
                    disabled={disabled}
                    error={!!errors[name]}
                    helperText={errors[name]?.message as string}
                    slotProps={{
                        input: {
                            inputComponent: ISBNMaskInput as any,

                        },
                    }}
                />
            )}
        />
    );
};
