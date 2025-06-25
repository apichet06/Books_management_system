import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TextFieldHookProps = {
    name: string;
    label: string;
    disabled?: boolean;
    defaultValue?: string;
    type?: string;
};


export const TextFieldHook = ({ name, label, disabled, defaultValue, type }: TextFieldHookProps) => {
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
                    value={defaultValue}
                    variant="standard"
                    type={type}
                    fullWidth
                    disabled={disabled}
                    error={!!errors[name]}
                    helperText={errors[name]?.message as string}
                />
            )}
        />
    );
};
