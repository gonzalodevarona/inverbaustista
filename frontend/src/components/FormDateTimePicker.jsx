import { useState, useEffect } from 'react'
import React from 'react'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useForm, Controller } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Typography, Box, Stack, InputLabel, Input, FormHelperText, Button } from "@mui/material";

function FormDateTimePicker({
    name,
    label,
    control,
    defaultValue,
    disabled,
    disablePast,
    minDate
  }) {
    return (
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue ?? null}
        render={({ field: { onChange, value, ref }, fieldState }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              onChange={onChange}
              value={value}
              label={label}
              ref={ref}
              disablePast={disablePast}
              minDate={minDate}
              disabled={disabled}
              renderInput={(params) => (
                <TextField
                  sx={{ width: '100%' }}
                  {...params}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState?.error?.message}
                />
              )}
            />
          </LocalizationProvider>
        )}
      />
    );
  }

  export default FormDateTimePicker