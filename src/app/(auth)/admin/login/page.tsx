import MockRoleLoginForm from "../../_components/mock-role-login-form"

const AdminLoginPage = () => {
  return (
    <MockRoleLoginForm
      role="admin"
      title="Admin Login"
      description="Use this mock login to open the admin dashboard."
    />
  )
}

export default AdminLoginPage