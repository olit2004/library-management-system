import React, { useRef, useCallback, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BookCard from "../../components/shared/BookCard";
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

  /* ------------------ ACTION HANDLERS ------------------ */

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
                className={`mt-6 p-4 rounded-xl border flex gap-3 ${
                  status.type === "success"
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

            {/* Borrow Button */}
            <button
              disabled={actionLoading || status.type === "success"}
              onClick={() => handleBorrow(viewingBook.id)}
              className={`w-full mt-8 py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2 shadow-lg transition
                ${
                  status.type === "success"
                    ? "bg-green-500 text-white cursor-default"
                    : "bg-accent-base text-white hover:bg-accent-base/90"
                }
                ${actionLoading && "opacity-70 cursor-wait"}
              `}
            >
              {actionLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : status.type === "success" ? (
                "Already Borrowed"
              ) : (
                <>
                  <BookOpen className="w-5 h-5" />
                  Borrow this Book
                </>
              )}
            </button>

            {/* Reserve Button */}
            {status.type !== "success" && (
              <button
                disabled={reserveLoading || actionLoading}
                onClick={() => handleReserveAction(viewingBook.id)}
                className="w-full mt-3 py-4 rounded-xl font-bold text-lg border-2 border-accent-base text-accent-base
                           flex items-center justify-center gap-2 transition
                           hover:bg-accent-light/10 active:scale-[0.98]
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {reserveLoading ? (
                  <div className="w-6 h-6 border-2 border-accent-base border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CalendarCheck className="w-5 h-5" />
                    Reserve for Later
                  </>
                )}
              </button>
            )}

            {/* Help Text */}
            <p className="mt-4 text-center text-xs text-muted-text flex justify-center gap-1">
              <Info className="w-3 h-3" />
              Reservations are held for 48 hours once ready.
            </p>
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
