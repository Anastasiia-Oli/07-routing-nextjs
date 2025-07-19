import { NoteTag } from "@/types/note";
import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: { slug?: string[] };
};

export default async function NotesPage({ params }: Props) {
  const slugArray = params.slug?.[0];
  const tagForApi =
    slugArray === "All" ? undefined : (slugArray as NoteTag | undefined);
  const tag =
    slugArray === "All" ? undefined : (slugArray as NoteTag | undefined);

  const initialData = await fetchNotes("", 1, tagForApi);
  return (
    <Notes
      tag={tag}
      notes={initialData.notes}
      totalPages={initialData.totalPages}
    />
  );
}
