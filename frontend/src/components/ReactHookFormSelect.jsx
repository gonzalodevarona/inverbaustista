import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Typography } from "@mui/material";
import { Controller } from "react-hook-form";

const ReactHookFormSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  errors,
  errorText,
  ...props
}) => {

  const labelId = `${name}-label`;

  
  return (


    <Controller
      name={name}
      control={control}
      rules={{ required: `Es requerido seleccionar ${errorText}` }}
      defaultValue={defaultValue}
      required
      render={({ field }) =>
        <FormControl {...props} styles={{margin: 0,
          fullWidth: true,
          backgroundColor: "#9ee",
          display: "flex",
          wrap: "nowrap"}}  variant="outlined" >

          <InputLabel  style={{ color: errors[name]? 'red' : 'black', fontSize: '1.6rem' }} id={labelId}>{label}</InputLabel>

          <Select fullWidth {...field}  labelId={labelId} label={label} error={!!errors[name]} style={{ fontSize: '1.6rem' }}>
            {children}
          </Select>

          <Typography sx={{textAlign:'start',color:'red'}}>{errors[name]? errors[name].message : ''}</Typography>

        </FormControl>
      }
    />


  );
};
export default ReactHookFormSelect;