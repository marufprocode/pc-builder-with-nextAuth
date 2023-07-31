import Link from "next/link";
import { Button } from 'antd';
import { useSession, signOut } from "next-auth/react";
import CategoriesMenu from "./categoriesMenu";
import { useRouter } from "next/router";

export default function Navbar() {
  const {status} = useSession();
  const router = useRouter()
 
  const isAuth = status ===  "authenticated";

  return (
    <header className="w-full flex justify-between items-center py-3 border-b px-10 h-fit">
        <h5 className="font-bold cursor-pointer" onClick={()=>router.push('/')}>PC Builder</h5>
        <ul className="flex gap-2 items-center">
            <li className="cursor-pointer"><Link href="/">Home</Link></li>
            <li className="cursor-pointer"><CategoriesMenu/></li>
            {
              !isAuth && <li><Button type="primary"><Link href="/login">Login</Link></Button></li>
            }
            {
              !isAuth && <li><Button type="primary"><Link href="/signup">SignUp</Link></Button></li>
            }
            {
              isAuth && <li><Button type="primary" onClick={signOut}>LogOut</Button></li>
            }
            <li><Link href="/pc-builder"><Button type="dashed">Build PC</Button></Link></li>
        </ul>
    </header>
  )
}
