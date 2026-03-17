import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"


const AdminRoute = () => {

  const { user, loading } = useSelector(state => state.auth)

  if (loading) return <div>Loading...</div>

  if (!user) {
    return <Navigate to="/login" />
  }

  // user logged in hai but admin nahi
  if (user.role !== "admin") {
    return <Navigate to="/" />
  }

  return <Outlet/>
}

export default AdminRoute