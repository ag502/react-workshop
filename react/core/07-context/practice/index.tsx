import * as ReactDOM from 'react-dom/client'
import { LoginForm } from './LoginForm'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { MainLayout } from './MainLayout'
import { MyAccount } from './MyAccount'
import { AuthProvider } from './AuthContext'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<LoginForm />} />
      <Route path="account" element={<MyAccount />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
)

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<MainLayout />}>
//       <Route index element={<LoginForm />} />
//       <Route path="account" element={<RequireAuthentication />}>
//         <Route index element={<MyAccount />} />
//       </Route>
//       <Route path="*" element={<Navigate to="/" />} />
//     </Route>
//   )
// )

// function RequireAuthentication() {
//   // 🤔
// }