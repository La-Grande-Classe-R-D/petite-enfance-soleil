"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  premium?: boolean;
}

interface RecentArticlesProps {
  articles: Article[];
}

export function RecentArticles({ articles }: RecentArticlesProps) {
  return (
    <section className="section reveal snap-section" data-reveal>
      <div className="container">
        <h2 id="activites-title" className="section-title section-title--lg">Activités</h2>
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
                <p className="card__excerpt line-clamp-2">
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
