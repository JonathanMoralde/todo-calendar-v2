import React from "react";
import AddBtn from "./btn/styledBtn";
import { MdEdit, MdDelete } from "react-icons/md";

const List = () => {
  return (
    <>
      <section className="w-1/2 ms-4 p-4 rounded-lg bg-white">
        <div className="flex justify-between border-b-2 pb-1 mb-4">
          <h3 className="">Date</h3>
          <AddBtn />
        </div>
        <div className="flex flex-col">
          {/* INDIV ITEM */}
          <div className="flex justify-between items-center bg-gray-100 rounded-lg py-2 px-4 mb-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="checkbox1"
                className="default:ring-2 me-2"
              />
              <label htmlFor="checkbox1">Todo Task Here</label>
            </div>
            <div className="text-xl">
              <button className="me-4  transition-opacity">
                <MdEdit className=" hover:opacity-70" />
              </button>
              <button className="transition-opacity">
                <MdDelete className=" hover:opacity-70" />
              </button>
            </div>
          </div>
          {/* INDIV ITEM */}
          <div className="flex justify-between items-center bg-gray-100 rounded-lg py-2 px-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="checkbox2"
                className="default:ring-2 me-2"
              />
              <label htmlFor="checkbox2">Todo Task Here</label>
            </div>
            <div className="text-xl">
              <button className="me-4  transition-opacity">
                <MdEdit className=" hover:opacity-70" />
              </button>
              <button className="transition-opacity">
                <MdDelete className=" hover:opacity-70" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default List;
