import LoginPage from './pages/login/loginpage'
import {QueryClientProvider,} from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { useEffect } from 'react'

function App() {

  useEffect(()=>{
    
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
  <main className='flex min-h-svh flex-col items-center justify-center'>
    <LoginPage />
  </main>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  )
}

export default App
