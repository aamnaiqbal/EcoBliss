import React, { useEffect } from "react";

const CustomPagination = ({ currentPage, setCurrentPage, totalPages }) => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [currentPage])
  return (
    <div className="join flex justify-center my-8 items-center">
      <button
        className={`join-item btn btn-square px-8 hover:bg-[#99EDC3]`}
        onClick={() => setCurrentPage(Math.max(currentPage-1, 1))}
        disabled={currentPage===1}
      >Previous</button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`join-item btn btn-square ${currentPage===index+1? "bg-lightGreen text-white hover:bg-lightGreen hover:text-white": "bg-gray text-black hover:bg-[#99EDC3]"}`}
            aria-label={`${index + 1}`}
            onClick={()=>setCurrentPage(index+1)}
            
          >{index+1}</button>
        ))}
      <button
        className={`join-item btn btn-square px-8 hover:bg-[#99EDC3]`}
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage===totalPages}
      >Next</button>
    </div>
  );
};

export default CustomPagination;
