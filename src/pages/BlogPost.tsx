import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { useLanguage } from "@/contexts/LanguageContext";

// Imports de Ícones
import { FaLinkedin, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Configura o builder de imagens do Sanity
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// --- INTERFACES ---
interface Author {
  name: string;
  image: any;
}

interface Category {
  _id: string;
  title: string;
}

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  body: any;
  mainImage: any;
  author: Author | null;
  category: Category | null; // Categoria singular
  categories: Category[] | null; // Categoria plural (se for array)
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

// --- COMPONENTE PRINCIPAL ---
const BlogPost: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [postUrl, setPostUrl] = useState("");
  
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();

  const locale = language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-AR';

  useEffect(() => {
    // Scroll para o topo ao carregar novo post
    window.scrollTo(0, 0);
    setPostUrl(window.location.href);

    if (!slug) return;

    const fetchPostData = async () => {
      setLoading(true);
      setRelatedPosts([]);

      const postQuery = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        publishedAt,
        body,
        mainImage,
        author->{name, image},
        category->{_id, title}, 
        categories[]->{_id, title} 
      }`;

      try {
        const data: Post | null = await client.fetch(postQuery, { slug });
        
        if (!data || !data._id) {
          setPost(null);
          setLoading(false);
          return;
        }

        setPost(data);
        document.title = `${data.title} | Juliano Conzatti`;

        // --- Lógica de Posts Relacionados: COLETAR TODOS OS IDs ---
        const categoryRefs = [];
        if (data.category && data.category._id) {
            categoryRefs.push(data.category._id);
        }
        if (data.categories && Array.isArray(data.categories)) {
            data.categories.forEach(cat => {
                if (cat._id) categoryRefs.push(cat._id);
            });
        }
        
        const uniqueCategoryRefs = [...new Set(categoryRefs)]; 

        // --- BUSCA CORRIGIDA: USANDO 'references()' PARA ESTABILIDADE ---
        if (uniqueCategoryRefs.length > 0) {
          // Esta é a sintaxe mais estável: busca por documentos que referenciam QUALQUER ID na lista
          const relatedQuery = `*[_type == "post" && references($categoryIds) && _id != $postId] | order(publishedAt desc) [0...3] {
            _id,
            title,
            slug
          }`;
          
          const relatedData: RelatedPost[] = await client.fetch(relatedQuery, {
            categoryIds: uniqueCategoryRefs, // Passa a lista de IDs
            postId: data._id
          });
          
          setRelatedPosts(relatedData.filter(p => p && p.title && p.slug));
        }
      } catch (error) {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-card">
        <Navigation />
        <div className="pt-28 pb-20 text-center">
            <p>{t('blogUI.loading')}</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-card">
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
          <p className="text-center text-muted-foreground">{t('blogUI.notFound')}</p>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('blogUI.back')}
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Se o post foi encontrado...
  const encodedTitle = encodeURIComponent(post?.title || "");
  const encodedUrl = encodeURIComponent(postUrl);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-card">
      <Navigation />
      
      {/* Ajuste de Padding: pt-28 para compensar o menu fixo */}
      <article className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        
        {/* BOTÃO VOLTAR NO INÍCIO */}
        <Button
          variant="ghost"
          className="mb-8 group"
          asChild
        >
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {t('blogUI.back')}
          </Link>
        </Button>

        <div className="mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            {post?.title}
          </h1>
          
          {/* --- BLOCO DE INFORMAÇÕES DO POST (Autor, Data, Categoria) --- */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-muted-foreground mb-8">
            {/* Autor */}
            {post?.author && post.author.name && (
              <div className="flex items-center gap-2">
                {post.author.image ? (
                  <img 
                    src={urlFor(post.author.image).width(24).height(24).fit('crop').url()} 
                    alt={post.author.name}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span>{t('blogUI.writtenBy')} {post.author.name}</span>
              </div>
            )}
            
            {/* Data de Publicação */}
            {post?.publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{t('blogUI.publishedAt')} </span>
              {new Date(post.publishedAt).toLocaleDateString(locale, {
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })}
            </div>
            )}

            {/* Categoria */}
            {(post?.category || (post?.categories && post.categories.length > 0)) && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <div className="flex flex-wrap gap-x-2">
                  {/* Se for singular, exibe. Se for plural, mapeia todos. */}
                    {post.category && post.category.title && (
                      <span className="premium-tag px-2 py-0.5 text-xs font-medium">{post.category.title}</span>
                  )}
                  {post.categories && post.categories.map((cat, index) => (
                      <span key={index} className="premium-tag px-2 py-0.5 text-xs font-medium">
                          {cat.title}
                      </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Imagem Principal */}
        {post?.mainImage && (
          <img 
            className="w-full h-auto rounded-lg mb-8 shadow-xl"
            src={urlFor(post.mainImage).width(800).url()} 
            alt={post.title} 
          />
        )}

        {/* Corpo do Post (CLASSE "prose" para formatação) */}
        <div className="prose prose-lg dark:prose-invert max-w-none animate-fade-in-up">
          <BlockContent
            blocks={post?.body}
            projectId={client.config().projectId}
            dataset={client.config().dataset}
          />
        </div>

        {/* --- SEÇÃO DE POSTS RELACIONADOS (CALL TO ACTION) --- */}
        {relatedPosts.length > 0 && (
          <aside className="mt-16 pt-8 border-t border-border/50">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('blogUI.related')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link to={`/blog/${related.slug.current}`} key={related._id}>
                  <Card className="premium-glass-card h-full transition-smooth">
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground group-hover:text-primary">
                        {related.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </aside>          
        )}

        {/* --- SEÇÃO DE COMPARTILHAMENTO (CENTRALIZADA) --- */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">{t('blogUI.share')}</h3>
          <div className="flex gap-4">
            <Button variant="outline" size="icon" asChild>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + postUrl)}`}
                target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a 
                href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no X"
              >
                <FaXTwitter className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>


        {/* --- BOTÃO VOLTAR NO FINAL (CENTRALIZADO) --- */}
        <div className="mt-12 pt-8 border-t border-border/50 flex justify-center">
          <Button
            variant="ghost"
            className="group"
            asChild
          >
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {t('blogUI.back')}
            </Link>
          </Button>
        </div>
        
      </article>

      <Footer />
    </main>
  );
};

export default BlogPost;