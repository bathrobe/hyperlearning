import createClient from '../../../lib/supabase-server';
async function getPost(postId: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from('links').select('*').eq('id', postId);
  return data;
}

export default async function IdPage({ params }: any) {
  let article = await getPost(params.id);
  article = article[0];
  return (
    <div>
      <h1>{article?.title}</h1>
      <p>{article?.created_at}</p>
      <p>{article?.url}</p>
      <article>{article?.summary}</article>
    </div>
  );
}
