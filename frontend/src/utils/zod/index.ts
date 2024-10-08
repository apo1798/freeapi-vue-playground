import { type ZodErrorMap, ZodIssueCode, z as baseZod } from 'zod'

const defaultInvalidMessage = { message: '輸入錯誤' }

const customErrorMap: ZodErrorMap = (issue, _ctx) => {
  if (_ctx.defaultError === 'Required') {
    return { message: '此項目為必填' }
  }

  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.expected === 'string') {
        return { message: '請輸入字串' }
      }
      return { message: '此項目為必填' }
    case ZodIssueCode.invalid_enum_value:
      return { message: 'Invalid option selected.' }
    case ZodIssueCode.too_small:
      return { message: 'Value is too small.' }
    case ZodIssueCode.too_big:
      return { message: 'Value is too big.' }
    case ZodIssueCode.invalid_string:
      if (issue.validation === 'email') return { message: '請輸入正確的信箱格式' }
      break
  }

  return defaultInvalidMessage
}

baseZod.setErrorMap(customErrorMap)

export { baseZod as customZod }
