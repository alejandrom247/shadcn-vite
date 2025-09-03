import LoginPage from './pages/login/loginpage'
import {QueryClientProvider,} from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { getMe } from './pages/login/actions/authActions'
import { useAuthStore } from './hooks/useAuthStore'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { CookiesProvider } from 'react-cookie'

function App() {

  return (
    <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  </ CookiesProvider>
  )
}

export default App
