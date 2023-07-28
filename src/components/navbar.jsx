import Link from "next/link";
import { Button } from 'antd';
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const {status} = useSession();
 
  const isAuth = status ===  "authenticated";

  return (
    <header className="w-full flex justify-between items-center py-3 border-b px-10 h-fit">
        <h5>PC Builder</h5>
        <ul className="flex gap-2 items-center">
            {
              !isAuth && <li><Button type="primary"><Link href="login">Login</Link></Button></li>
            }
            {
              !isAuth && <li><Button type="primary"><Link href="signup">SignUp</Link></Button></li>
            }
            {
              isAuth && <li><Button type="primary" onClick={signOut}>LogOut</Button></li>
            }
        </ul>
    </header>
  )
}
