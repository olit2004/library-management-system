import React from "react";
import Button from "../ui/Button";

export default function BookCard({ id, title, author, cover, onAction }) {
  return (
    <div
      className="
        bg-secondary-bg rounded-xl border border-border-subtle
        p-2 sm:p-3
        hover:shadow-md transition-all duration-300
        flex sm:block gap-3
      "
    >
      {/* Cover Image Container */}
      <div
        className="
          relative
          w-20 sm:w-full
          aspect-3/4
          bg-input-bg rounded-lg overflow-hidden
          shrink-0 transition-colors
        "
      >
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div className="space-y-0.5 mt-1 sm:mt-3">
          <h3 className="font-semibold text-sm sm:text-base text-primary-text line-clamp-2">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-secondary-text truncate">
            {author}
          </p>
        </div>

        <Button
          className="
            mt-3
            py-1.5 sm:py-2
            text-xs sm:text-sm
            w-full
          "
          onClick={() => onAction?.({ id, title })}
        >
          Borrow
        </Button>
      </div>
    </div>
  );
}