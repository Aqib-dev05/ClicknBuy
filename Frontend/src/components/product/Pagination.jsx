function Pagination({ page, totalPages, searchParams, setSearchParams }) {
  const handlePage = (p) => {
    searchParams.set("page", p);
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-wrap max-md:px-4 mx-auto justify-center items-center gap-2 mt-6">
      {page > 1 && (
        <button
          onClick={() => handlePage((prev) => prev - 1)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          style={{
            padding: "8px 16px",
            fontSize: "1.4rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Prev
        </button>
      )}

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePage(i + 1)}
          className={
            page === i + 1
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }
          style={{
            padding: "8px 16px",
            fontSize: "1.4rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {i + 1}
        </button>
      ))}   

      {page < totalPages && (
        <button
          onClick={() => handlePage((prev) => prev + 1)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          style={{
            padding: "8px 16px",
            fontSize: "1.4rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
