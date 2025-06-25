// components/hookform/DatePickerHook.tsx
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

type DatePickerHookProps = {
    name: string;
    label: string;
    disabled?: boolean;
};

export const DatePickerHook = ({
    name,
    label,
    disabled = false,
}: DatePickerHookProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <DatePicker
                    {...field}
                    label={label}
                    disabled={disabled}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date ? date.toISOString() : null)}
                    slotProps={{
                        textField: {
                            variant: "standard",
                            fullWidth: true,
                            error: !!errors[name],
                            helperText: errors[name]?.message as string,
                        }, popper: {
                            disablePortal: true
                        }
                    }}
                />
            )}
        />
    );
};
