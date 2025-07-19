import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
// type NotePreviewProps = {
//   params: { id: string };
// };

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const note = await fetchNoteById(id);
  return (
    <Modal>
      <div className={css.header}>
        <h2>{note.title}</h2>
        <button className={css.editBtn}>Edit note</button>
      </div>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>{note.createdAt}</p>
      <span className={css.tag}>{note.tag}</span>
    </Modal>
  );
}
