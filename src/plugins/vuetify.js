import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { ru } from 'vuetify/locale'

const light = {
  dark: false,
  colors: {
    background: '#f5f6fa',
    surface: '#ffffff',
    primary: '#5b6ef5',
    secondary: '#7c4dff',
    success: '#22c55e',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b',
  },
}

export default createVuetify({
  locale: {
    locale: 'ru',
    messages: { ru },
  },
  theme: {
    defaultTheme: 'light',
    themes: { light },
  },
  defaults: {
    VTextField: { variant: 'outlined', density: 'comfortable' },
    VCard: { rounded: 'lg' },
    VBtn: { rounded: 'lg' },
  },
})
