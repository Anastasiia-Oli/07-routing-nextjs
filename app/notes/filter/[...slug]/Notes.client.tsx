"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import css from "./Notes.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { FetchNotesResponse } from "@/lib/api";
import { Note } from "@/types/note";
import type { NoteTag } from "@/types/note";

type NotesProps = {
  tag?: NoteTag;
  notes: Note[];
  totalPages: number;
};

function Notes({ tag, notes, totalPages }: NotesProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", debouncedQuery, page, tag ?? null],
    queryFn: () => fetchNotes(debouncedQuery, page, tag),
    // enabled: debouncedQuery !== "",
    placeholderData: keepPreviousData,
    // initialData:
    //   page === 1 && debouncedQuery === "" ? { notes, totalPages } : undefined!,
    ...(page === 1 &&
      debouncedQuery === "" && {
        initialData: { notes, totalPages },
      }),
  });

  const currentData = data ?? { notes: [], totalPages: 1 };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleSearch} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {currentData.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={currentData.totalPages}
          onPageChange={setPage}
        />
      )}
      {currentData.notes.length === 0 && <p>No notes found</p>}
      {currentData.notes && currentData.notes.length > 0 && (
        <NoteList notes={currentData.notes} />
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default Notes;
