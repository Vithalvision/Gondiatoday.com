async function getArticles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  return res.json();
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>

      <div className="grid gap-4">
        {articles.map((article: any) => (
          <a
            key={article.id}
            href={`/articles/${article.slug}`}
            className="border p-4 rounded hover:shadow"
          >
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-600 text-sm">
              {article.category || "General"}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}