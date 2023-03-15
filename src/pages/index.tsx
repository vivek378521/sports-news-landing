import Head from 'next/head';
import Parser, { Item } from 'rss-parser';
import Image from 'next/image';
import { GetStaticProps } from 'next';


interface LandingPageProps {
  articles: Item[];
}

export default function LandingPage({ articles }: LandingPageProps) {
  return (
    <div className="container">
      <Head>
        <title>EssentiallySports Latest News</title>
        <meta name="description" content="The latest news from EssentiallySports" />
      </Head>


      <h1>EssentiallySports Latest News</h1>


      <div className="articles-container">
        <div className="column">
          {articles.slice(0, Math.ceil(articles.length / 2)).map((article: any) => (
            <div className="article" key={article.guid}>
              {article['media:content']['$']['url'] && (
                <div style={{ position: 'relative', width: '400px', maxWidth: '100%', height: '200px', left: 0 }}>
                  <Image
                    src={article['media:content']['$']['url']}
                    alt={article.title}
                    fill
                    style={{ objectFit: "contain" }}
                    loading="eager"
                  />
                </div>
              )}
              <h2>{article.title}</h2>
              <p>{article.contentSnippet}</p>
              <a href={article.link}>Read more...</a>
            </div>
          ))}
        </div>
        <div className="column">
          {articles.slice(Math.ceil(articles.length / 2)).map((article: any) => (
            <div className="article" key={article.guid}>
              {article['media:content']['$']['url'] && (
                <div style={{ position: 'relative', width: '400px', maxWidth: '100%', height: '200px', left: 0 }}>
                  <Image
                    src={article['media:content']['$']['url']}
                    alt={article.title}
                    fill
                    style={{ objectFit: "contain" }}
                    loading="eager"
                  />
                </div>
              )}
              <h2>{article.title}</h2>
              <p>{article.contentSnippet}</p>
              <a href={article.link}>Read more...</a>
            </div>
          ))}
        </div>
      </div>


      <style jsx>{`
       .container {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }
      


       h1 {
         text-align: center;
         font-size: 2.5rem;
         margin-bottom: 2rem;
         color: #1e293b;
       }


       .articles-container {
         display: flex;
         justify-content: space-between;
         align-items: center;
         flex-wrap: wrap;
         gap: 2rem;
         padding: 2rem;
         background-color: #f9f9f9;
       }
    
       .column {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        flex: 1;
        max-width: calc(50% - 1rem); /* subtract half of the gap */
      }
      .article {
        background-color: #f2f2f2;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      }


      h1 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 2rem;
        color: #1e293b;
      }
      
      h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: black;
        text-shadow: 1px 1px 2px #333;
      }
      
      


       p {
         font-size: 1.2rem;
         color: #4b5563;
       }


       a {
         display: block;
         margin-top: 1rem;
         font-size: 1.2rem;
         color: #3182ce;
       }
     `}</style>
    </div>
  );
}


export const getStaticProps: GetStaticProps<LandingPageProps> = async () => {
  const parser = new Parser({
    customFields: {
      item: ['media:content', 'media:content', { keepArray: true }],
    },
  });
  const feed = await parser.parseURL('https://www.essentiallysports.com/feed/');
  const articles = feed.items;
  feed.items.forEach(item => {
    console.log(item.title);
    console.log(item['media:content']['$']['url']); // media:content tag url
  });
  return {
    props: {
      articles,
    },
  };
};



