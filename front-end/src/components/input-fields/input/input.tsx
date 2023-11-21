import { useState } from "react";
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Box,
  InputAdornment,
  Popper,
} from "@mui/material";
import Cancel from "@mui/icons-material/Cancel";
import { Controller, UseControllerProps } from "react-hook-form";
import S from "./input.styled";

interface InputProps extends UseControllerProps {
  type:
    | "text"
    | "email"
    | "number"
    | "date"
    | "datetime"
    | "select"
    | "multiselect"
    | "file"
    | "radio"
    | "autocomplete"
    | "autocomplete-with-imagelist";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: {
    [key: string]: any;
  };
  ref?: any;
  helperText?: string;
}

function Input({ type, name, rules = {}, control, defaultValue, shouldUnregister = false, onChange, options = {}, ref, helperText }: InputProps) {
  const [autocomplete, setAutocomplete] = useState<string | null>(null);
  const [multiSelect, setMultiselect] = useState<string[]>(type === "multiselect" ? defaultValue : []);
  const [image, setImage] = useState<string>("");

  //functions
  const PopperWidth = function (props: any) {
    return (
      <Popper
        {...props}
        style={{
          popper: {
            width: "fit-content",
          },
        }}
        placement="bottom-end"
      />
    );
  };

  switch (type) {
    case "text":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => (
            <S.TextInput
              helperText={errors[name]?.message as string}
              type="text"
              multiline={options?.multiline}
              maxRows={options?.maxRows}
              {...options}
              name={field.name}
              value={field.value}
              ref={field.ref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value);
                onChange && onChange(e);
              }}
              onBlur={field.onBlur}
            />
          )}
        />
      );

    case "email":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => (
            <S.TextInput
              helperText={errors[name]?.message as string}
              type="email"
              multiline={options?.multiline}
              maxRows={options?.maxRows}
              {...options}
              name={field.name}
              value={field.value}
              ref={field.ref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value);
                onChange && onChange(e);
              }}
              onBlur={field.onBlur}
            />
          )}
        />
      );

    case "number":
      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue || ""}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => (
            <S.NumberInput
              helperText={helperText ? helperText : (errors[name]?.message as string)}
              type="number"
              {...options}
              name={field.name}
              value={field.value}
              ref={field.ref}
              InputProps={{
                ...options.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <p>{options?.unit}</p>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <p>{options?.unitstart}</p>
                  </InputAdornment>
                ),
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value);
                onChange && onChange(e);
              }}
              onBlur={field.onBlur}
            />
          )}
        />
      );

    case "date":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => (
            <S.DateInput
              helperText={errors[name]?.message as string}
              type="date"
              {...options}
              name={field.name}
              value={field.value}
              ref={field.ref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value);
                onChange && onChange(e);
              }}
              onBlur={field.onBlur}
            />
          )}
        />
      );

    case "datetime":
      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue || ""}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => (
            <S.DateInput
              helperText={errors[name]?.message as string}
              type="datetime-local"
              {...options}
              name={field.name}
              value={field.value}
              ref={field.ref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value);
                onChange && onChange(e);
              }}
              onBlur={field.onBlur}
            />
          )}
        />
      );

    case "select":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={options.initialvalue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => {
            return (
              <S.SelectInput
                iscolor={field.value ? 1 : 0}
                select
                disabled={options.disable ? true : false}
                helperText={helperText ? helperText : (errors[name]?.message as string)}
                {...options}
                name={field.name}
                value={field.value ? field.value : options.placeholder || ""}
                // defaultValue={options?.initialvalue}
                ref={field.ref}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e.target.value);
                  onChange && onChange(e);
                }}
                onBlur={field.onBlur}
              >
                <MenuItem value={options.placeholder ? options.placeholder : ""} style={{ display: "none" }}>
                  {options.placeholder}
                </MenuItem>

                {options?.selectOptions?.map(([actualValue, displayValue]: [string, string]) => (
                  <MenuItem
                    key={actualValue}
                    value={actualValue}
                    disabled={
                      (options?.availablelist && !options?.availablelist.includes(actualValue)) ||
                      (options?.initialvalue && actualValue !== options?.initialvalue)
                    }
                  >
                    {displayValue}
                    {!options?.disable && options?.availablelist && !options?.availablelist.includes(actualValue)
                      ? "  (This variant already exists)"
                      : ""}
                  </MenuItem>
                ))}

                {/* special options are something that user cannot select, but you can set explicitly (programatically) ex: ~All Groups~ */}
                {/* inorder to set a select field value, it must be in the menu items, we here we're adding it without showing to user */}
                {options?.specialOptions?.map((value: string) => (
                  <MenuItem key={value} value={value} style={{ display: "none" }}></MenuItem>
                ))}
              </S.SelectInput>
            );
          }}
        />
      );

    case "multiselect":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => {
            return (
              <S.MultiSelectInput {...(options?.gridArea ? { gridArea: options.gridArea } : {})}>
                <InputLabel shrink id="demo-multiple-chip-label">
                  {options?.label}
                </InputLabel>
                <Select
                  multiple
                  maxRows={4}
                  input={<OutlinedInput />}
                  value={multiSelect || []}
                  ref={field.ref}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={({ target: { value } }) => {
                    field.onChange(value);
                    setMultiselect(value as string[]);
                  }}
                  renderValue={(selected) => (
                    <S.MultiSelectChipContainer>
                      {selected.map((value: string) => (
                        <S.MultiSelectChip
                          clickable
                          deleteIcon={<Cancel onMouseDown={(event: React.MouseEvent<SVGSVGElement>) => event.stopPropagation()} />}
                          key={value}
                          label={value}
                          onDelete={() => {
                            field.onChange(selected.filter((val) => val !== value));
                            setMultiselect((selected) => selected.filter((val) => val !== value));
                          }}
                        />
                      ))}
                    </S.MultiSelectChipContainer>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 50,
                      },
                    },
                  }}
                >
                  {options.selectOptions
                    ?.filter((val: string) => !multiSelect.includes(val))
                    ?.map((val: any) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errors[name]?.message as string}</FormHelperText>
              </S.MultiSelectInput>
            );
          }}
        />
      );

    // Note: we cannot change the 'value' of file input programmatically due to security reasons.
    case "file":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => {
            return (
              <S.FileInput
                helperText={errors[name]?.message as string}
                type="file"
                {...options}
                name={field.name}
                value={field.value}
                ref={field.ref}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange && onChange(e);
                  field.onChange(e.target.value);
                }}
                onBlur={field.onBlur}
              />
            );
          }}
        />
      );

    case "radio":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => {
            return (
              <S.RadioInput {...(options?.gridArea ? { gridArea: options.gridArea } : {})}>
                <S.RadioInputLabel>{options.label}</S.RadioInputLabel>
                <RadioGroup row defaultValue={options.defaultValue || ""} {...field}>
                  {options.radioOptions?.map(([value, label]: string[]) => (
                    <S.RadipInputControlLabel key={value} value={value} label={label} control={<Radio />} />
                  ))}
                </RadioGroup>
                <FormHelperText>{errors[name]?.message as string}</FormHelperText>
              </S.RadioInput>
            );
          }}
        />
      );

    case "autocomplete":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => {
            return (
              <S.StyledAutocomplete
                options={options.selectoptions}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    placeholder={options.placeholder}
                    helperText={errors[name]?.message as string}
                    label={options.label}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
                value={field.value ? field.value : autocomplete}
                ref={field.ref}
                onChange={(event: any, newValue: any) => {
                  setAutocomplete(newValue);
                  onChange && onChange(event);
                  field.onChange(newValue);
                }}
              />
            );
          }}
        />
      );

    case "autocomplete-with-imagelist":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => {
            return (
              <S.StyledAutocomplete
                options={options.selectoptions}
                PopperComponent={PopperWidth}
                fullWidth={true}
                disabled={options.disable ? true : false}
                getOptionLabel={(option: any) => option?.name || field.value || ""}
                isOptionEqualToValue={(option: any) => option.name === field.value}
                renderOption={(props, option: any) => {
                  return (
                    <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props} key={option?.id}>
                      <img loading="lazy" width="40" src={option?.image} srcSet={`${option?.image} 2x`} alt="" />
                      {option?.name} ({option?.tamilName})
                    </Box>
                  );
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    placeholder={options.placeholder}
                    helperText={errors[name]?.message as string}
                    label={options.label}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <img
                            loading="lazy"
                            width="30"
                            src={options?.productimage ? options?.productimage : image}
                            srcSet={`${options?.productimage ? options?.productimage : image} 2x`}
                            alt=""
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                value={field.value ? field.value : autocomplete}
                ref={field.ref}
                onChange={(event: any, newValue: any) => {
                  setAutocomplete(newValue.name);
                  onChange && onChange(event);
                  field.onChange(newValue.name);
                  options.setproductname(newValue.name);
                  options.setproductid(newValue.id);
                  setImage(newValue ? newValue.image : "");
                }}
              />
            );
          }}
        />
      );

    default:
      throw new Error("Wrong Input Type");
  }
}

export default Input;
