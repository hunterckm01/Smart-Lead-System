import React, { useEffect, useState } from 'react'
import NameGrid from '../components/NameGrid';

const Verified = () => {
   const [verifiedName, setVerifiedName] = useState([]);
    async function fetchCheckName(){
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/verifiedUser`
        );
        const data = await res.json();
        setVerifiedName(data.users);
    }

    useEffect(()=>{
        fetchCheckName();
    },[])
  
    return (
    <section className="min-h-screen w-full bg-indigo-200">
      <div className='w-full mx-auto'>
        {
          verifiedName.length > 0 && <NameGrid allName = {verifiedName}/>
        }
      </div>
    </section>
    )
}

export default Verified
