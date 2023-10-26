"use client"; // This is a client component 👈🏽"
import React from 'react'
import { FormFeedback, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function InputField(props) {
  // Props
  const { placeholder, fieldName, inputType, rows, accept = [], formik, onKeyPress, value, passwordIcon, showPassword, required, dropdownChild, setShowPassword, disabled, passwordField } = props

  const commonProps = {
    id: fieldName,
    className: `custom-form-control ${passwordField ? 'password-field' : ''}`,
    type: inputType || "text",
    name: fieldName,
    ...(inputType !== 'file' && {
      value: formik?.values?.[fieldName] || value || ''
    }),
    onChange: (e) => {
      if (inputType === 'file' && e.currentTarget.files && e.currentTarget.files[0]) {
        formik?.setFieldValue(fieldName, e.currentTarget.files[0])
      } else formik?.handleChange(e)
    },
    ...(onKeyPress && {
      onKeyPress: onKeyPress
    }),
    disabled: disabled,
    ...(inputType === 'textarea' && {
      rows: rows || 1
    }),
    onBlur: formik?.handleBlur,
    invalid: !!formik?.touched?.[fieldName] && !!formik?.errors?.[fieldName],
    accept: accept.map(function (x) {
      return '.' + x;
    })
      .join(',')
  }

  return (
    <>
      <Label className={`inputfield ${required && 'required-field'}`}>
        {placeholder}
      </Label>
      <InputGroup className="input-group-alternative mb-3">
        {inputType === 'select' ? <Input
          {...commonProps}
        >
          {dropdownChild.map(data => {
            return <option value={data.value}>{data.name}</option>
          })}
        </Input> : <Input
          {...commonProps}
        />}
        {passwordIcon && <InputGroupText className='cursor-pointer show-hide-password'>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={() => setShowPassword(!showPassword)} />
        </InputGroupText>}
        {inputType === 'file' && typeof formik?.values?.[fieldName] === 'object' && !disabled && <InputGroupText className='cursor-pointer'>
          <FontAwesomeIcon icon={faXmark} onClick={() => {
            formik?.setFieldValue(fieldName, '')
            document.getElementById(fieldName).value = ''
          }} />
        </InputGroupText>}
        <FormFeedback>
          {formik?.errors?.[fieldName]}
        </FormFeedback>
      </InputGroup>
    </>
  )
}
