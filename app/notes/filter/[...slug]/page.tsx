import { NoteTag } from "@/types/note";
import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: { slug?: string[] };
};

export default async function NotesPage({ params }: Props) {
  const slugArray = params.slug;
  const tag = Array.isArray(slugArray) ? (slugArray[0] as NoteTag) : undefined;

  const initialData = await fetchNotes("", 1);
  return (
    <Notes
      tag={tag}
      notes={initialData.notes}
      totalPages={initialData.totalPages}
    />
  );
}
