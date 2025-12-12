import React from 'react'

const NameGrid = ({allName}) => {
  return (
    <section className="p-6 w-[800px] mx-auto">
      <ul className="grid grid-cols-5 items-center text-center text-red-700 text-2xl font-semibold">
        <li className="col-start-1 col-end-3">Name</li>
        <li className="">Confidence</li>
        <li className="">Country</li>
        <li className="">Status</li>
      </ul>

      {allName.map((name) => (
        <ul
          key={name._id}
          className="grid grid-cols-5 border-4 items-center text-center"
        >
          <li className="col-start-1 col-end-3 self-center">{name.name}</li>
          <li className="place-items-center">{name.confidence}</li>
          <li className="place-items-center">{name.countryCode}</li>
          <li className="place-items-center self-center">{name.status}</li>
        </ul>
      ))}
    </section>
  );
}

export default NameGrid
