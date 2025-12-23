import { useState, useEffect } from "react";
import HistoryItem from "./HistoryItem";
import { History as HistoryIcon, Search, Loader2 } from "lucide-react";
import { useLoans } from "../../hooks/useLoans";
import { toast } from "react-hot-toast";

export default function History() {
  
  const [searchTerm, setSearchTerm] = useState("");

 const { items: history, loading, fetchHistory, borrowBook } = useLoans();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleReborrow = async (bookId) => {
    const res = await borrowBook(bookId);
    if (res.success) {
      toast.success("Book borrowed again!");
    } else {
      toast.error(res.error);
    }
  };

  // Filter history based on search term
  const filteredHistory = history.filter(item => 
    item.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${item.book.author.first_name} ${item.book.author.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="max-w-4xl mx-auto transition-colors px-4 lg:px-0">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary-text tracking-tight">Reading History</h1>
          <p className="text-sm text-secondary-text mt-1">A timeline of all your past literary journeys.</p>
        </div>

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

      {loading && history.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-brand-text animate-spin" />
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
        <div className="text-center py-20 bg-secondary-bg rounded-3xl border border-dashed border-border-subtle">
          <div className="w-16 h-16 bg-input-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <HistoryIcon className="text-muted-text" size={32} />
          </div>
          <h2 className="text-lg font-semibold text-primary-text">
            {searchTerm ? "No results found" : "Your history is empty"}
          </h2>
          <p className="text-secondary-text text-sm">
            {searchTerm ? "Try searching for another title." : "Books you return will appear here."}
          </p>
        </div>
      )}
    </div>
  );
}