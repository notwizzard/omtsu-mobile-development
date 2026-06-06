/**
 * user entity
 * @typedef {Object} User
 * @property {string} id        - unique identifier
 * @property {string} firstName - имя
 * @property {string} lastName  - фамилия
 * @property {string} birthDate - дата рождения (ISO yyyy-mm-dd)
 * @property {string} [email]   - опциональный e-mail
 * @property {string} [city]    - опциональный город
 */

/** build a normalized User object from raw form data */
export function createUser(data = {}) {
  return {
    id: data.id ?? crypto.randomUUID(),
    firstName: (data.firstName ?? '').trim(),
    lastName: (data.lastName ?? '').trim(),
    birthDate: data.birthDate ?? '',
    email: (data.email ?? '').trim(),
    city: (data.city ?? '').trim(),
  }
}

/** full name helper */
export function fullName(user) {
  return `${user.firstName} ${user.lastName}`.trim()
}

/** age in full years derived from birthDate, or null if unknown */
export function age(user) {
  if (!user.birthDate) return null
  const born = new Date(user.birthDate)
  if (Number.isNaN(born.getTime())) return null
  const now = new Date()
  let years = now.getFullYear() - born.getFullYear()
  const m = now.getMonth() - born.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < born.getDate())) years--
  return years
}
