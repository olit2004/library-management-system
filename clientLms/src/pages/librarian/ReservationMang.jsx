// pages/librarian/LibrarianReservations.jsx
import React, { useEffect, useState } from "react";
import ReservationRow from "./ReservationRow";
import EmptyState from "../../components/ui/EmptyState";
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  Search,
  ArrowRight,
  Inbox,
} from "lucide-react";



const MOCK_RESERVATIONS = [
  {
    id: "a1b2c3d4e5",
    status: "PENDING",
    queue_position: 1,
    Book: {
      title: "Clean Code",
      cover_image_url:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    User: {
      name: "Alice Johnson",
    },
  },
  {
    id: "f6g7h8i9j0",
    status: "READY",
    queue_position: 2,
    Book: {
      title: "Design Patterns",
      cover_image_url:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
    User: {
      name: "Michael Smith",
    },
  },
  {
    id: "k1l2m3n4o5",
    status: "PENDING",
    queue_position: 3,
    Book: {
      title: "You Don’t Know JS",
      cover_image_url:
        "https://images.unsplash.com/photo-1524578271613-d550eacf6099",
    },
    User: {
      name: "Sara Ahmed",
    },
  },
];



export default function LibrarianReservations() {
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // UI-first: load mock data
    setReservations(MOCK_RESERVATIONS);
  }, []);

  const filtered = reservations.filter((r) => {
    const bookTitle = r.Book?.title?.toLowerCase() || "";
    const userName = r.User?.name?.toLowerCase() || "";

    return (
      bookTitle.includes(searchTerm.toLowerCase()) ||
      userName.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary-text tracking-tight flex items-center gap-3">
            <CalendarCheck className="text-brand-text" />
            Reservation Queue
          </h1>
          <p className="text-secondary-text mt-1">
            Manage book requests and notify members for pickup.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by book or member..."
            className="w-full bg-secondary-bg border border-border-subtle rounded-2xl pl-10 pr-4 py-3 text-sm text-primary-text focus:ring-2 ring-accent-base outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((res) => (
            <ReservationRow key={res.id} res={res} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}




