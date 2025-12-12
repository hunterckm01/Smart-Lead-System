import React, { useEffect, useState } from 'react'
import NameGrid from '../components/NameGrid.jsx';

const ToCheck = () => {
    const [toCheckName, setToCheckName] = useState([]);
    async function fetchCheckName(){
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/toCheckUser`
        );
        const data = await res.json();
        setToCheckName(data.users);
    }

    useEffect(()=>{
        fetchCheckName();
    },[])

  return (
    <section className="min-h-screen w-full bg-indigo-200 mx-auto">
      {toCheckName.length > 0 && <NameGrid allName={toCheckName} />}
    </section>
  );
}

export default ToCheck
