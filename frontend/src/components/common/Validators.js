export const requireValidation = (target) => {
  if (typeof target === "number") {
    return !target
  }
  if (typeof target === "string") {
    return target.trim() === ""
  }
}

export const nameValidation = (fieldValue) => {
  if (requireValidation(fieldValue)) {
    return `name is required`
  }
  if (fieldValue.trim().length < 3) {
    return `name needs to be at least three characters`
  }
  return null
}

export const passwordValidation = (fieldValue) => {
  if (requireValidation(fieldValue)) {
    return `password is required`
  }
  if (fieldValue.trim().length < 8) {
    return `password needs to be at least 8 characters`
  }
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
      fieldValue
    )
  ) {
    return "Invalid characters"
  }
  return null
}

export const emailValidation = (email) => {
  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return null
  }
  if (requireValidation(email)) {
    return "Email is required"
  }
  return "Please enter a valid email"
}

export const ageValidation = (age) => {
  if (requireValidation(age)) {
    return "Age is required"
  }
  if (age < 18) {
    return "Age must be at least 18"
  }
  if (age > 99) {
    return "Age must be under 99"
  }
  return null
}

export const topicValidation = (fieldValue, fieldName) => {
  if (requireValidation(fieldValue)) {
    return `${fieldName} is required`
  }
  if (fieldValue.trim().length < 5) {
    return `file needs to be at least 5 characters`
  }
  return null
}
