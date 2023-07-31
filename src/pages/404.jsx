import { Button, Result } from 'antd';
import { useRouter } from 'next/router';

export default function Custom404() {
    const router = useRouter()
    return <div className="w-full h-full min-h-[90vh] flex justify-center items-center"><Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={()=>router.push('/')}>Back Home</Button>}
  /></div>
  }