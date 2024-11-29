import NewsItem from "./NewsItem";

function NewsList({ articles }) {
  if (!Array.isArray(articles) || articles.length === 0) {
    return <div className="news-list">Không có bài viết nào.</div>;
  }

  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <NewsItem
          key={index}
          id={article.id} // Truyền id đúng cách
          title={article.title}
          summary={article.summary}
          image={`http://localhost/api-dulich-main/api-dulich/api/Images/news/${article.image}`} // Sử dụng URL hình ảnh đúng cách
        />
      ))}
    </div>
  );
}

export default NewsList;
