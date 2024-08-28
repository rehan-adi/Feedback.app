import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout