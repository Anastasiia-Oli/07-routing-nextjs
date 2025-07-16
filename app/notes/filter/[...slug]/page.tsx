import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  const initialData = await fetchNotes("", 1);
  return (
    <Notes
      tag={slug}
      notes={initialData.notes}
      totalPages={initialData.totalPages}
    />
  );
}
