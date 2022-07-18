/**
 * Operator options for lucene queries
 */
export const OperatorOptions = {
  Equals: {
    value: "equal",
    label: "等于",
  },
  NotEquals: {
    value: "notEqual",
    label: "不等于",
  },
  Empty: {
    value: "empty",
    label: "为空",
  },
  NotEmpty: {
    value: "notEmpty",
    label: "不为空",
  },
  StartsWith: {
    value: "string",
    label: "开始于",
  },
  Like: {
    value: "fuzzy",
    label: "类似于",
  },
  MoreThan: {
    value: "rangeLow",
    label: "大于",
  },
  LessThan: {
    value: "rangeHigh",
    label: "小于",
  },
  Contains: {
    value: "equal",
    label: "包含",
  },
  NotContains: {
    value: "notEqual",
    label: "不包含",
  },
  In: {
    value: "oneOf",
    label: "在其中",
  },
}

// Cookie names
export const Cookies = {
  Auth: "budibase:auth",
  CurrentApp: "budibase:currentapp",
  ReturnUrl: "budibase:returnurl",
}

// Table names
export const TableNames = {
  USERS: "ta_users",
}

/**
 * API version header attached to all requests.
 * Version changelog:
 * v1:
 *   - Coerce types for search endpoint
 */
export const ApiVersion = "1"

// Role IDs
export const Roles = {
  ADMIN: "ADMIN",
  POWER: "POWER",
  BASIC: "BASIC",
  PUBLIC: "PUBLIC",
  BUILDER: "BUILDER",
}

/**
 * Maximum minimum range for SQL number values
 */
export const SqlNumberTypeRangeMap = {
  integer: {
    max: 2147483647,
    min: -2147483648,
  },
  int: {
    max: 2147483647,
    min: -2147483648,
  },
  smallint: {
    max: 32767,
    min: -32768,
  },
  mediumint: {
    max: 8388607,
    min: -8388608,
  },
}
