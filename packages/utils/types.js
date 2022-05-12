// types
export const getType = target => {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}

export const isObject = target => getType(target) === 'object'
export const isArray = Array.isArray
export const isFunction = target => getType(target) === 'function'
