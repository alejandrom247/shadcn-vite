import LoginPage from './pages/login/loginpage'
import {QueryClientProvider,} from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { useEffect } from 'react'
import Cookies from 'node_modules/@types/js-cookie'
import { getMe } from './pages/login/actions/authActions'
import { useAuthStore } from './hooks/useAuthStore'

function App() {

  

  useEffect(()=>{
    const token = Cookies.get('access_token');
    if(token){
      getMe().then(user => {
        useAuthStore.getState().setUser(user)
      }
      ).catch(
        _error=>{
          useAuthStore.getState().setUser(null);
          console.error(_error)
        }
      )
    }
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
