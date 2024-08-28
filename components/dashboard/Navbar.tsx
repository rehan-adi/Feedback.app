import { Button } from "../ui/button"


const Navbar = () => {
  return (
    <div className='bg-black flex justify-between items-center px-20 text-white h-20 w-full '>
         <h1>Logo</h1>
        <Button variant="secondary">
            Logout
        </Button>
    </div>
  )
}

export default Navbar