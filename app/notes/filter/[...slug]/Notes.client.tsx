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

  const shouldUseInitialData = page === 1 && debouncedQuery === "";
  const initialData: FetchNotesResponse = { notes, totalPages };

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", debouncedQuery, page, tag],
    queryFn: () => fetchNotes(debouncedQuery, page, tag),
    // enabled: debouncedQuery !== "",
    placeholderData: keepPreviousData,
    ...(shouldUseInitialData && { initialData }),
  });

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
      {data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
      {data?.notes.length === 0 && <p>No notes found</p>}
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default Notes;
