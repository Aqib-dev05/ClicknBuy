import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById, deleteProduct } from "../../services/productService";
import { toast } from "react-toastify";
import {
    ArrowLeft,
    Edit,
    Trash2,
    Loader2,
    Package,
    Tag,
    Layers,
    Calendar,
    Clock,
    Info,
    BadgePercent,
    Coins,
    Star,
} from "lucide-react";
import cloudinaryOptimizer from "../../utils/cloudinaryOptimizer";
import { motion } from "framer-motion";

function ProductView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const data = await getProductById(id);
            if (data) {
                setProduct(data);

                if (data?.images && data?.images?.length > 0) {
                    setMainImage(data.images[0].url);
                }
            } else {
                // Fallback for different API response structures
                setProduct(data);
                if (data?.images && data.images.length > 0) {
                    setMainImage(data.images[0].url);
                }
            }
            setError(null);
        } catch (err) {
            console.error("Error fetching product:", err);
            const message =
                err.response?.data?.message || "Failed to load product details";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (
            window.confirm(
                `Are you sure you want to delete "${product?.name}"? This action cannot be undone.`,
            )
        ) {
            try {
                setDeleting(true);
                await deleteProduct(id);
                toast.success("Product deleted successfully");
                navigate("/admin/products");
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to delete product");
            } finally {
                setDeleting(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin h-10 w-10 text-[rgb(219,68,68)] mb-4" />
                <p className="text-gray-500 font-medium">Loading product details...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="text-center p-10 bg-red-50 border border-red-200 rounded-xl">
                <h3 className="text-xl font-bold text-red-600 mb-2">Error</h3>
                <p className="text-red-500 mb-6">{error || "Product not found"}</p>
                <button
                    onClick={() => navigate("/admin/products")}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto pb-12"
        >
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <button
                    onClick={() => navigate("/admin/products")}
                    className="p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
                    title="Go Back"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 line-clamp-1">
                            {product?.name}
                        </h1>
                        <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
                            <Package size={14} />
                            Prod.ID:{" "}
                            <span className="font-mono  text-gray-700">{product?._id}</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link
                        to={`/admin/products/edit/${product?._id}`}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-100 transition-all border border-blue-200"
                    >
                        <Edit size={18} />
                        <span>Edit</span>
                    </Link>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-red-100 transition-all border border-red-200 disabled:opacity-50"
                    >
                        {deleting ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Trash2 size={18} />
                        )}
                        <span>Delete</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Media Gallery */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px] overflow-hidden group">
                        <motion.img
                            key={mainImage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            src={
                                cloudinaryOptimizer(mainImage) ||
                                "https://via.placeholder.com/400x400?text=No+Image"
                            }
                            alt={product.name}
                            loading="lazy"
                            className="max-w-full max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {product.images && product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-3 bg-white p-3 rounded-xl border border-gray-100">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(img.url)}
                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${mainImage === img.url ? "border-red-500 shadow-md" : "border-transparent hover:border-gray-300"}`}
                                >
                                    <img
                                        src={cloudinaryOptimizer(img.url)}
                                        alt={`Product ${idx}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Detailed Information */}
                <div className="lg:col-span-7 space-y-6">
                    {/* General Information Card */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Info className="text-red-500" size={20} />
                            General Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Brand
                                </span>
                                <p className="text-gray-900 font-semibold">
                                    {product?.brand || "Not specified"}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Slug
                                </span>
                                <p className="text-gray-600 font-mono text-sm break-all">
                                    {product.slug || "N/A"}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                    <Layers size={12} /> Category
                                </span>
                                <div className="flex gap-2 mt-1">
                                    <span
                                        onClick={() => navigate("/admin/categories")}
                                        className="bg-gray-100 cursor-pointer text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                        {product.SubCategory?.parent?.name || "Global"}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs cur font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                    <Tag size={12} /> Subcategory
                                </span>
                                <div className="flex gap-2 mt-1">
                                    <span onClick={() => navigate(`/admin/subcategories`)} className="bg-red-50 cursor-pointer text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                                        {product.SubCategory?.name || "None"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Price and Inventory Card */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Coins className="text-amber-500" size={20} />
                            Pricing & Inventory
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Pricing */}
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 ring-1 ring-black ring-opacity-5">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider italic">
                                        Financials
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-gray-500 text-sm">
                                            Discounted Price:
                                        </span>
                                        <span className="text-sm font-semibold font-black text-gray-900">
                                            Rs. {product?.discountedPrice || product?.basePrice}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center decoration-red-400">
                                        <span className="text-gray-500 text-sm">Base Price:</span>
                                        <span className="text-gray-400 line-through">
                                            Rs. {product.basePrice}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Inventory */}
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 ring-1 ring-black ring-opacity-5">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider italic">
                                        Stock Control
                                    </span>
                                    <span
                                        className={`px - 2 py - 0.5 rounded - md text - xs font - bold ${product.quantity > 0 ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}
                                    >
                                        {product.quantity > 10
                                            ? "Healthy"
                                            : product.quantity > 0
                                                ? "Low Stock"
                                                : "Out of Stock"}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-gray-500 text-sm font-semibold">
                                            Available Qty:
                                        </span>
                                        <span className="text-lg font-semibold text-gray-900">
                                            {product.quantity || 0}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Description Card */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            Product Description
                        </h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm">
                            {product.description ||
                                "No description provided for this product."}
                        </p>
                    </section>

                    {/* Reviews */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            Reviews
                        </h2>
                        <div className="space-y-4">
                            {product.reviews?.map((review) => (
                                <div key={review._id} className="border-b border-gray-100 pb-4 last:border-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-gray-900">
                                            {review.user?.name || "Anonymous"}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="text-yellow-400" size={14} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Administrative Metadata */}
                    <div className="flex flex-wrap gap-4 text-xs font-bold bg-gray-800 text-gray-300 p-4 rounded-xl shadow-inner">
                        <div className="flex items-center gap-2 px-3 border-r border-gray-700">
                            <Calendar size={14} />
                            <span>
                                Created: {new Date(product.createdAt).toLocaleDateString()}{" "}
                                {new Date(product.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-3">
                            <Clock size={14} />
                            <span>
                                Last Updated: {new Date(product.updatedAt).toLocaleDateString()}{" "}
                                {new Date(product.updatedAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProductView;
