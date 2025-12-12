import { useEffect, useState } from "react";
import sendData from "../api/userApi.js";
import NameGrid from "../components/NameGrid.jsx";

function Home() {
  const [name, setName] = useState("");
  const [allName, setAllName] = useState([]);
  function changeHandler(e) {
    setName(e.target.value);
  }

  async function submitHandler(e) {
    e.preventDefault();
    await sendData(name);
    setName("");
    await fetchAllUser();
  }

  async function fetchAllUser() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getAllUser`);
    // console.log(res);
    const data = await res.json();
    setAllName(data.allUser);
  }

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <>
      <section className="bg-indigo-200 min-h-screen w-full flex  flex-col items-center gap-5">
        {/* <div className="flex flex-col"> */}
          <form onSubmit={submitHandler} className="pt-10 flex flex-col gap-2">
            <input
              type="text"
              className="border-red-600 border-2 py-2 px-4 w[200px]"
              placeholder="Enter First Name"
              onChange={changeHandler}
              value={name}
            />
            <div className="flex justify-center items-center">
              <button onClick={submitHandler} className="rounded-md bg-white py-2 text-xl px-2 font-semibold">Check Status</button>
            </div>
          </form>

          {allName.length > 0 && <NameGrid allName={allName} />}
        {/* </div> */}

      </section>
    </>
  );
}

export default Home;
