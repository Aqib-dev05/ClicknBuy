function Pagination({ page, totalPages, searchParams, setSearchParams }){

const handlePage = (p)=>{
  searchParams.set("page", p)
  setSearchParams(searchParams)
}

return(
<div className="flex mx-auto justify-center items-center gap-2 mt-6">

  {Array.from({ length: totalPages }, (_, i)=>(
    <button
      key={i}
      onClick={()=>handlePage(i+1)}
      className={ page === i+1 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}
      style={{
        padding:"8px 16px",
        fontSize:"1.3rem",
        borderRadius:"4px",
        cursor:"pointer"
      }}
    >
      {i+1}
    </button>
  ))}

</div>
)

}

export default Pagination;