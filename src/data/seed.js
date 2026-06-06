import { createUser } from '../models/user'

/** initial demo users shown on first launch */
export const seedUsers = [
  createUser({ firstName: 'Иван', lastName: 'Петров', birthDate: '1994-03-12', email: 'ivan.petrov@example.com', city: 'Москва' }),
  createUser({ firstName: 'Мария', lastName: 'Сидорова', birthDate: '1998-07-25', email: 'maria.s@example.com', city: 'Санкт-Петербург' }),
  createUser({ firstName: 'Алексей', lastName: 'Кузнецов', birthDate: '1990-11-02', email: 'a.kuznetsov@example.com', city: 'Казань' }),
  createUser({ firstName: 'Ольга', lastName: 'Смирнова', birthDate: '2001-01-18', city: 'Новосибирск' }),
]
