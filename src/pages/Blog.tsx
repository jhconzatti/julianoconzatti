import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLang } from "@/hooks/use-lang";
import { usePosts } from "@/hooks/use-posts";
import { toLocale } from "@/utils/translations";

const Blog = () => {
  const { t, language } = useLanguage();
  const { lp } = useLang();
  const { data: posts = [], isLoading: loading } = usePosts();
  const locale = toLocale(language);

  useEffect(() => {
    document.title = `${t("nav.blog")} | Juliano Conzatti`;
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-card">
      <Navigation />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t("blogPage.headerPrefix")} <span className="text-gradient">{t("blogPage.headerHighlight")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("blogPage.description")}</p>
        </div>

        <div className="space-y-6 animate-fade-in-up">
          {loading ? (
            <p className="text-center text-muted-foreground">{t("blogUI.loading")}</p>
          ) : posts.length > 0 ? (
            posts.map((post, index) => (
              <Link to={lp(`/blog/${post.slug.current}`)} key={post._id} className="block group">
                <Card className="premium-glass-card p-6 transition-smooth cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{post.title}</h2>
                    <p className="text-muted-foreground">
                      {post.excerpt ? `${post.excerpt.substring(0, 150)}...` : `${t("blogUI.readMore")}...`}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishedAt).toLocaleDateString(locale, {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>

                      {post.categoryTitles && (
                        <div className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          <span className="premium-tag px-2 py-0.5 text-xs">
                            {Array.isArray(post.categoryTitles) ? post.categoryTitles[0] : post.categoryTitles}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-center text-muted-foreground">{t("blogUI.notFound")}</p>
          )}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">{t("blogPage.thanks")}</p>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Blog;
