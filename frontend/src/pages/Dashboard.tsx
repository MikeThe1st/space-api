import NavDashboard from '../components/NavDashboard.tsx'
import UserDashboard from '../components/UserDashboard.tsx'
import Footer from '../components/Footer.tsx'

const Dashboard: React.FC = () => {

  return (
    <div>
      <NavDashboard />
      <UserDashboard />
      <Footer />
    </div>
  )
}

export default Dashboard
