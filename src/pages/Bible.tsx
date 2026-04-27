import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Search, Loader2, ExternalLink, Flame } from "lucide-react";

// Free public-domain / open translations available on bible-api.com
const FREE_TRANSLATIONS = [
  { id: "kjv", name: "King James Version (KJV)", lang: "English" },
  { id: "web", name: "World English Bible (WEB)", lang: "English" },
  { id: "asv", name: "American Standard Version (ASV)", lang: "English" },
  { id: "bbe", name: "Bible in Basic English (BBE)", lang: "English" },
  { id: "ylt", name: "Young's Literal Translation (YLT)", lang: "English" },
  { id: "darby", name: "Darby Bible (DARBY)", lang: "English" },
  { id: "oeb-us", name: "Open English Bible, US (OEB-US)", lang: "English" },
  { id: "webbe", name: "World English Bible, British (WEBBE)", lang: "English" },
  { id: "clementine", name: "Clementine Latin Vulgate", lang: "Latin" },
  { id: "almeida", name: "João Ferreira de Almeida", lang: "Português" },
  { id: "rccv", name: "Romanian Corrected Cornilescu", lang: "Română" },
];

// Modern copyrighted translations — link out to YouVersion (Bible.com) for legal reading
const YOUVERSION_TRANSLATIONS = [
  { code: "NIV", id: 111, name: "New International Version" },
  { code: "NLT", id: 116, name: "New Living Translation" },
  { code: "ESV", id: 59, name: "English Standard Version" },
  { code: "NKJV", id: 114, name: "New King James Version" },
  { code: "NASB", id: 100, name: "New American Standard Bible" },
  { code: "CSB", id: 1713, name: "Christian Standard Bible" },
  { code: "MSG", id: 97, name: "The Message" },
  { code: "AMP", id: 1588, name: "Amplified Bible" },
  { code: "TPT", id: 1849, name: "The Passion Translation" },
  { code: "GNT", id: 68, name: "Good News Translation" },
  { code: "CEV", id: 392, name: "Contemporary English Version" },
  { code: "NRSV", id: 2016, name: "New Revised Standard Version" },
];

const BOOKS = [
  // Old Testament
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth",
  "1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah",
  "Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah",
  "Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah",
  "Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi",
  // New Testament
  "Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians",
  "Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians",
  "1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter",
  "1 John","2 John","3 John","Jude","Revelation",
];

type Verse = { book_name: string; chapter: number; verse: number; text: string };
type ApiResponse = {
  reference: string;
  verses: Verse[];
  text: string;
  translation_id: string;
  translation_name: string;
  error?: string;
};

export default function Bible() {
  const [translation, setTranslation] = useState<string>("kjv");
  const [book, setBook] = useState<string>("John");
  const [chapter, setChapter] = useState<string>("3");
  const [query, setQuery] = useState<string>("John 3");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reference = useMemo(() => `${book} ${chapter}`.trim(), [book, chapter]);

  async function fetchPassage(ref: string, tr: string) {
    setLoading(true);
    setError(null);
    try {
      const url = `https://bible-api.com/${encodeURIComponent(ref)}?translation=${tr}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Passage not found. Try another reference.");
      const json: ApiResponse = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load passage.";
      setError(msg);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPassage(reference, translation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLoad() {
    const ref = query.trim() || reference;
    setQuery(ref);
    fetchPassage(ref, translation);
  }

  function changeTranslation(tr: string) {
    setTranslation(tr);
    fetchPassage(query.trim() || reference, tr);
  }

  function changeBook(b: string) {
    setBook(b);
    const ref = `${b} ${chapter}`;
    setQuery(ref);
    fetchPassage(ref, translation);
  }

  function changeChapter(c: string) {
    setChapter(c);
    const ref = `${book} ${c}`;
    setQuery(ref);
    fetchPassage(ref, translation);
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-secondary text-secondary-foreground py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
        <div className="container relative">
          <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-[0.3em] font-bold mb-4">
            <Flame className="w-4 h-4 animate-flame-flicker" /> Online Bible
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4">
            Read the <span className="text-primary">Word of God</span> Online
          </h1>
          <p className="text-base sm:text-lg text-secondary-foreground/80 max-w-2xl">
            Browse Scripture across many translations. Search any passage like
            <span className="text-accent font-semibold"> "John 3:16"</span> or
            <span className="text-accent font-semibold"> "Romans 8"</span>.
          </p>
        </div>
      </section>

      {/* Reader */}
      <section className="container py-10 sm:py-14">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                Translation
              </label>
              <Select value={translation} onValueChange={changeTranslation}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {FREE_TRANSLATIONS.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name} · {t.lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                    Book
                  </label>
                  <Select value={book} onValueChange={changeBook}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {BOOKS.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                    Chapter
                  </label>
                  <Input
                    type="number"
                    min={1}
                    value={chapter}
                    onChange={(e) => changeChapter(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                  Or search a passage
                </label>
                <div className="mt-2 flex gap-2">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. Psalm 23 or John 3:16"
                    onKeyDown={(e) => e.key === "Enter" && handleLoad()}
                  />
                  <Button onClick={handleLoad} size="icon" aria-label="Search passage">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
              <h3 className="font-display font-bold flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-primary" /> Modern Translations
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Read NIV, NLT, ESV, NKJV, MSG and more on YouVersion (free, copyright-licensed).
              </p>
              <div className="grid grid-cols-2 gap-2">
                {YOUVERSION_TRANSLATIONS.map((t) => {
                  const ref = (query || reference).trim();
                  const url = `https://www.bible.com/bible/${t.id}/${encodeURIComponent(ref)}.${t.code}`;
                  return (
                    <a
                      key={t.code}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-1 px-2.5 py-2 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors text-xs font-semibold"
                      title={t.name}
                    >
                      <span className="truncate">{t.code}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Reading pane */}
          <article className="rounded-2xl border border-border bg-card shadow-elegant p-5 sm:p-8 min-h-[60vh]">
            {loading && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" /> Loading Scripture…
              </div>
            )}

            {!loading && error && (
              <div className="text-destructive font-semibold">{error}</div>
            )}

            {!loading && !error && data && (
              <>
                <header className="mb-6 pb-5 border-b border-border">
                  <div className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-2">
                    {data.translation_name}
                  </div>
                  <h2 className="font-display text-2xl sm:text-4xl font-black">
                    {data.reference}
                  </h2>
                </header>

                <div className="prose prose-lg max-w-none font-serif text-foreground leading-relaxed text-base sm:text-lg">
                  {data.verses?.map((v) => (
                    <p key={`${v.chapter}-${v.verse}`} className="mb-3">
                      <sup className="text-primary font-bold mr-1.5">{v.verse}</sup>
                      {v.text.trim()}
                    </p>
                  ))}
                </div>

                <footer className="mt-8 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span>Source: bible-api.com · public domain translations</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changeChapter(String(Math.max(1, Number(chapter) - 1)))}
                    >
                      ← Prev Chapter
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => changeChapter(String(Number(chapter) + 1))}
                    >
                      Next Chapter →
                    </Button>
                  </div>
                </footer>
              </>
            )}
          </article>
        </div>
      </section>
    </Layout>
  );
}
