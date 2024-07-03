import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserProvider from './Reducers/UserProvider.jsx'
import UsersProvider from './Reducers/UsersProvider.jsx'
import NotificationProvider from './Reducers/NotificationProvider.jsx'
import App from './App.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UsersProvider>
        <UserProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </UserProvider>
      </UsersProvider>
    </QueryClientProvider>
  </Router>,
)
