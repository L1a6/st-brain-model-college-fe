import MockRoleLoginForm from "../../_components/mock-role-login-form"

const SuperAdminLogin = () => {
  return (
    <MockRoleLoginForm
      role="super-admin"
      title="Super Admin Login"
      description="Use this mock login to open the super-admin dashboard."
    />
  )
}

export default SuperAdminLogin
