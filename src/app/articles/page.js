import createClient from 'src/lib/supabase-server';
import Link from 'next/link';
const Article = ({ id, created_at, url, summary, title }) => {
  return (
    <div key={id}>
      <Link href={`/articles/${id}`}>
        <h1 className="text-xl font-semibold">{title}</h1>
      </Link>
      <p className="">{summary}</p>
      <p>{created_at}</p>
    </div>
  );
};
export default async function Articles() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const { data, error } = await supabase.from('links').select('*');
  return (
    <div>
      {data.map((article) => {
        return <Article key={article.id} summary={article.summary} {...article} />;
      })}
    </div>
  );
}
