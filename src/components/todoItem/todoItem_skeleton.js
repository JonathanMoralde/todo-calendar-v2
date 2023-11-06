import React from "react";

const TodoItemSkeleton = () => {
  return (
    <>
      <div className="bg-gray-300 py-3 px-4 h-11 animate-pulse rounded-lg mb-2"></div>
      <div className="bg-gray-300 py-3 px-4 h-11 animate-pulse rounded-lg mb-2"></div>
      <div className="bg-gray-300 py-3 px-4 h-11 animate-pulse rounded-lg"></div>
    </>
  );
};

export default TodoItemSkeleton;
