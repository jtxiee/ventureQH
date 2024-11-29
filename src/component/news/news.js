import { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer/footer";
import NewsList from "./NewsList";
import "./style.css"; // Import file CSS

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost/api-dulich-main/api-dulich/api/news.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Kiểm tra dữ liệu nhận được
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="news">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="news">Có lỗi xảy ra: {error.message}</div>;
  }

  return (
    <div className="page-container">
      <Header />
      <div className="content-wrap">
        <h3>Tin Tức</h3>
        <NewsList articles={articles} />
      </div>
      <Footer />
    </div>
  );
}

export default News;
