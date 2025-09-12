import {QueryClientProvider,} from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { useEffect } from 'react'
import { getMe } from './pages/login/actions/authActions'
import { useAuthStore } from './hooks/useAuthStore'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'

function App() {

  return (
    
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  )
}

export default App
