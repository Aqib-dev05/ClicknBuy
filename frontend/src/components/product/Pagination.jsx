import { motion as Motion } from 'framer-motion';

function Pagination({ page, totalPages, searchParams, setSearchParams }) {
  const handlePage = (p) => {
    searchParams.set("page", p);
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  return (
    <Motion.div
      className="flex flex-wrap max-md:px-4 mx-auto justify-center items-center gap-2 mt-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {page > 1 && (
        <Motion.button
          onClick={() => handlePage((prev) => prev - 1)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          style={{
            padding: "8px 16px",
            fontSize: "1.4rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Prev
        </Motion.button>
      )}

      {Array.from({ length: totalPages }, (_, i) => (
        <Motion.button
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {i + 1}
        </Motion.button>
      ))}   

      {page < totalPages && (
        <Motion.button
          onClick={() => handlePage((prev) => prev + 1)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          style={{
            padding: "8px 16px",
            fontSize: "1.4rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next
        </Motion.button>
      )}
    </Motion.div>
  );
}

export default Pagination;
