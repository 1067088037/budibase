// TODO: Convert to yup based validators

export function emailValidator(value) {
  return (
    (value &&
      !!value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) ||
    "请输入正确的邮箱！"
  )
}

export function requiredValidator(value) {
  return (
    (value !== undefined && value !== null && value !== "") ||
    "This field is required"
  )
}
