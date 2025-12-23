// src/pages/member/History.jsx
import { useState, useEffect } from "react";
import HistoryItem from "./HistoryItem";
import { History as HistoryIcon, Search } from "lucide-react";

// MOCK DATA ARRAY
const MOCK_HISTORY = [
  {
    id: 501,
    borrowDate: "2025-11-01T10:00:00Z",
    returnDate: "2025-11-15T14:30:00Z",
    book: {
      id: "b1",
      title: "1984",
      author: "George Orwell",
      coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=200",
    }
  },
  {
    id: 502,
    borrowDate: "2025-11-20T09:00:00Z",
    returnDate: "2025-12-05T16:00:00Z",
    book: {
      id: "b2",
      title: "The Alchemist",
      author: "Paulo Coelho",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200",
    }
  },
  {
    id: 503,
    borrowDate: "2025-10-10T11:00:00Z",
    returnDate: "2025-10-25T12:00:00Z",
    book: {
      id: "b3",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=200",
    }
  }
];





export default function History() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHistory(MOCK_HISTORY);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredHistory = history.filter(item => 
    item.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReborrow = (bookId) => {
    alert(`Book ${bookId} added back to your active loans!`);
  };

  return (
    <div className="max-w-4xl mx-auto transition-colors">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary-text tracking-tight">Reading History</h1>
          <p className="text-sm text-secondary-text mt-1">A timeline of all your past literary journeys.</p>
        </div>

        {/* Search Input using semantic colors */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" size={16} />
          <input 
            type="text"
            placeholder="Search history..."
            className="w-full bg-secondary-bg border border-border-subtle text-primary-text rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-accent-light outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        /* Loading Skeletons */
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-input-bg rounded-2xl animate-pulse transition-colors" />
          ))}
        </div>
      ) : filteredHistory.length > 0 ? (
        <div className="space-y-3">
          {filteredHistory.map(record => (
            <HistoryItem 
              key={record.id} 
              record={record} 
              onReborrow={handleReborrow} 
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-secondary-bg rounded-3xl border border-dashed border-border-subtle">
          <div className="w-16 h-16 bg-input-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <HistoryIcon className="text-muted-text" size={32} />
          </div>
          <h2 className="text-lg font-semibold text-primary-text">No results found</h2>
          <p className="text-secondary-text text-sm">Try searching for a different book or author.</p>
        </div>
      )}
    </div>
  );
}