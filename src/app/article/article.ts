export class Article {
  id: string;
  image: string;
  title: string;
  publicationDate: Date;
  content: string;
  author: string;

  public constructor(id: string, image: string, title: string, pubDate: any, content: string, author: string) {
      this.id = id;
      this.image = image;
      this.title = title;
      this.publicationDate = pubDate;
      this.content = content;
      this.author = author;
  }
}
