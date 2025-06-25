/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, MenuItem } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const SelectFieldHook = ({ name, label, options = [], disabled }: any) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <TextField
                    {...field}
                    select
                    label={label}
                    variant="standard"
                    fullWidth
                    disabled={disabled}
                    error={!!errors[name]}
                    helperText={errors[name]?.message as string}
                >
                    {options.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    );
};
