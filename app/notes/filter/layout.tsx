type Props = {
  children: React.ReactNode;
};

const NotesLayout = ({ children }: Props) => {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
};

export default NotesLayout;
