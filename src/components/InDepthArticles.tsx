"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface InDepthArticle {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
}

interface InDepthArticlesProps {
  articles: InDepthArticle[];
}

export function InDepthArticles({ articles }: InDepthArticlesProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="cards">
          {articles.map((article) => (
            <article
              key={article.id}
              className="card"
            >
              <div className="card__media">
                <ImageWithFallback
                  src={article.imageUrl}
                  alt={article.title}
                  className="card__image"
                />
              </div>
              <div className="card__body">
                <h3 className="card__title">
                  {article.title}
                </h3>
                <p className="card__excerpt">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
