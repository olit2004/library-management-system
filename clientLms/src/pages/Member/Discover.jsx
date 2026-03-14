import React, { useRef, useCallback, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BookCard from "../../components/shared/BookCard";
import BookViewer from "../../components/shared/BookViewer";
import { useBooks } from "../../hooks/useBook";
import { useLoans } from "../../hooks/useLoans";
import { useReservations } from "../../hooks/useReservation";
import {
  ArrowLeft,
  User,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  CalendarCheck,
  Info,
} from "lucide-react";
import { toast } from "react-hot-toast";

function Discover() {
  const { reserveBook, loading: reserveLoading } = useReservations();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const { books, loading, hasMore, loadMore } = useBooks(10, query);
  const { borrowBook, loading: actionLoading } = useLoans();

  const [viewingBook, setViewingBook] = useState(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const observer = useRef();
  console.log(books)

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) loadMore();
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );



  const handleBorrow = async (bookId) => {
    const res = await borrowBook(bookId);

    if (res.success) {
      setStatus({
        type: "success",
        message: 'Enjoy your new book! You can find it in "My Loans".',
      });
      toast.success("Borrowed successfully!");
    } else {
      setStatus({ type: "error", message: res.error });
      toast.error(res.error);
    }
  };

  const handleReserveAction = async (bookId) => {
    const res = await reserveBook(bookId);

    if (res.success) {
      setStatus({
        type: "success",
        message: 'Reservation placed! Check "My Reservations" for updates.',
      });
      toast.success("Reserved!");
    } else {
      setStatus({ type: "error", message: res.error });
      toast.error(res.error);
    }
  };

  const handleBack = () => {
    setViewingBook(null);
    setStatus({ type: "idle", message: "" });
  };

  /* ------------------ BOOK DETAIL VIEW ------------------ */

  if (viewingBook) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
        {/* Back */}
        <button
          onClick={handleBack}
          className="group flex items-center text-secondary-text hover:text-brand-text mb-8 transition-all"
        >
          <div className="p-2 rounded-full group-hover:bg-accent-light mr-2">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Back to Collection</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* LEFT STICKY COLUMN */}
          <div className="w-full lg:w-2/5 sticky top-24">
            {/* Cover */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-accent-base to-brand-text rounded-2xl blur opacity-15 group-hover:opacity-20 transition" />
              <img
                src={viewingBook.cover_image_url}
                alt={viewingBook.title}
                className="relative w-full rounded-xl shadow-2xl object-cover aspect-[2/3]"
              />
            </div>

            {/* Status */}
            {status.message && (
              <div
                className={`mt-6 p-4 rounded-xl border flex gap-3 ${status.type === "success"
                    ? "bg-green-500/10 border-green-500/20 text-green-600"
                    : "bg-red-500/10 border-red-500/20 text-red-600"
                  }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <p className="text-sm font-medium">{status.message}</p>
              </div>
            )}

            {/* Action Buttons Group */}
            <div className="mt-10 space-y-5">
              {/* Borrow Button - Premium Primary Action */}
              <div className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-r ${status.type === 'success' ? 'from-green-400 to-green-600' : 'from-accent-base to-brand-text'} rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500`} />
                <button
                  disabled={actionLoading || status.type === "success"}
                  onClick={() => handleBorrow(viewingBook.id)}
                  className={`relative w-full py-5 rounded-2xl font-black text-xl flex justify-center items-center gap-3 shadow-2xl transition-all duration-300 active:scale-[0.97]
                    ${status.type === "success"
                      ? "bg-green-500 text-white cursor-default"
                      : "bg-accent-base text-white hover:bg-accent-base/90"
                    }
                    ${actionLoading && "opacity-70 cursor-wait"}
                  `}
                >
                  {actionLoading ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : status.type === "success" ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      In Your Collection
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-6 h-6" />
                      Borrow This Item
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Actions Row - Glassmorphism style */}
              <div className="flex gap-4">
                {/* Reserve Button */}
                {status.type !== "success" && (
                  <button
                    disabled={reserveLoading || actionLoading}
                    onClick={() => handleReserveAction(viewingBook.id)}
                    className="flex-1 py-4 rounded-2xl font-bold border-2 border-accent-base/30 text-accent-base
                               flex items-center justify-center gap-2 transition-all duration-300
                               hover:bg-accent-base hover:text-white hover:border-accent-base active:scale-[0.96]
                               disabled:opacity-50 disabled:cursor-not-allowed bg-accent-base/5 backdrop-blur-sm"
                  >
                    {reserveLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <CalendarCheck className="w-5 h-5" />
                        Reserve
                      </>
                    )}
                  </button>
                )}

                {/* Google Books Preview Button */}
                {(viewingBook.google_volume_id || viewingBook.isbn) && (
                  <button
                    onClick={() => setIsPreviewing(true)}
                    className="flex-1 py-4 rounded-2xl font-bold bg-brand-text/5 border-2 border-brand-text/30 text-brand-text
                               flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm
                               hover:bg-brand-text hover:text-white hover:border-brand-text active:scale-[0.96]"
                  >
                    <BookOpen className="w-5 h-5" />
                    Preview
                  </button>
                )}
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-6 flex justify-center items-center gap-2 text-muted-text bg-secondary-bg/50 py-2 rounded-full border border-border-subtle/50">
              <Info className="w-3.5 h-3.5" />
              <p className="text-[11px] font-medium uppercase tracking-wider">
                Reservations are held for 48 hours
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full lg:w-3/5">
            <div className="border-b border-border-subtle pb-6 mb-8">
              <h1 className="text-4xl font-black text-primary-text">
                {viewingBook.title}
              </h1>
              <p className="text-xl text-brand-text mt-3">
                {viewingBook.author.first_name}{" "}
                {viewingBook.author.last_name}
              </p>
            </div>

            <section className="mb-10">
              <h3 className="text-sm uppercase tracking-widest text-muted-text mb-4">
                Synopsis
              </h3>
              <p className="text-lg italic text-secondary-text">
                "{viewingBook.description || "No description available."}"
              </p>
            </section>

            <section>
              <h3 className="text-sm uppercase tracking-widest text-muted-text mb-4">
                The Creator
              </h3>
              <div className="p-6 rounded-2xl bg-secondary-bg border">
                <div className="flex items-center gap-6">
                  {viewingBook.author.photo ? (
                    <img
                      src={viewingBook.author.photo}
                      className="w-20 h-20 rounded-full object-cover"
                      alt="Author"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-input-bg flex items-center justify-center">
                      <User className="w-8 h-8 text-muted-text" />
                    </div>
                  )}
                  <div>
                    <p className="text-xl font-bold">
                      {viewingBook.author.first_name}{" "}
                      {viewingBook.author.last_name}
                    </p>
                    <p className="text-sm text-secondary-text mt-1">
                      {viewingBook.author.bio ||
                        "A dedicated writer specializing in literature."}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {isPreviewing && (
          <BookViewer
            googleVolumeId={viewingBook.google_volume_id}
            isbn={viewingBook.isbn}
            onClose={() => setIsPreviewing(false)}
          />
        )}
      </div>
    );
  }

  /* ------------------ DISCOVER GRID ------------------ */

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <header className="mb-8">
        {query && (
          <button
            onClick={() => navigate("/member")}
            className="mb-3 flex items-center gap-2 text-secondary-text hover:text-brand-text"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Discover
          </button>
        )}
        <h1 className="text-2xl font-bold text-primary-text">
          {query ? `Results for "${query}"` : "Discover"}
        </h1>
        {!query && (
          <p className="text-secondary-text mt-1">
            Scrolling through our entire collection
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {books.map((book, index) => (
          <div
            key={book.id}
            ref={books.length === index + 1 ? lastBookElementRef : null}
            onClick={() => {
              setViewingBook(book);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="cursor-pointer"
          >
            <BookCard
              id={book.id}
              title={book.title}
              author={`${book.author.first_name} ${book.author.last_name}`}
              cover={book.cover_image_url}
            />
          </div>
        ))}
      </div>

      {loading && (
        <div className="mt-10 flex justify-center">
          <div className="w-8 h-8 border-4 border-accent-light border-t-accent-base rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

export default Discover;
