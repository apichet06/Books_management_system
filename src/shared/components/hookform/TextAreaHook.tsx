// components/hookform/TextAreaHook.tsx
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TextAreaHookProps = {
    name: string;
    label: string;
    rows?: number;
    disabled?: boolean;
};

export const TextAreaHook = ({
    name,
    label,
    rows = 4,
    disabled = false,
}: TextAreaHookProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    multiline
                    rows={rows}
                    fullWidth
                    disabled={disabled}
                    variant="standard"
                    error={!!errors[name]}
                    helperText={errors[name]?.message as string}
                />
            )}
        />
    );
};
