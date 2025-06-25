import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Option = {
    label: string;
    value: number;
};

type AutocompleteHookProps = {
    name: string;
    label: string;
    options: Option[];
    disabled?: boolean;
    defaultValue?: Option | null;
};

export const AutocompleteHook = ({
    name,
    label,
    options,
    disabled = false,
    defaultValue = null,
}: AutocompleteHookProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue?.value ?? null} // 👈 set default เป็น value
            render={({ field: { onChange, value, ref } }) => {
                // หา option ที่ตรงกับ value เพื่อให้แสดงผลได้ถูกต้อง
                const selectedOption = options.find((opt) => opt.value === value) ?? null;

                return (
                    <Autocomplete
                        disablePortal
                        options={options}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, val) => option.value === val?.value}
                        onChange={(_, selected) => onChange(selected?.value)} // 👈 เก็บแค่ value
                        value={selectedOption}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                inputRef={ref}
                                label={label}
                                variant="standard"
                                disabled={disabled}
                                error={!!errors[name]}
                                helperText={errors[name]?.message as string}
                            />
                        )}
                    />
                );
            }}
        />
    );
};
