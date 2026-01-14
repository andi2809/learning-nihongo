import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Target, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb,
  GraduationCap,
  Users,
  Headphones,
  Repeat,
  Calendar,
  Award,
  ArrowLeft,
  ChevronRight,
  Star,
  TrendingUp,
  BookMarked,
  MessageSquare
} from "lucide-react";

const Roadmap = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-bold text-lg text-primary">JapanReader AI</span>
          </Link>
          <Badge variant="secondary" className="font-medium">
            Roadmap Belajar
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Section 1: Pendahuluan */}
        <section className="mb-12 animate-zen-in">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Panduan Lengkap
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Roadmap Belajar Bahasa Jepang
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Panduan terstruktur dari nol hingga mahir untuk pembelajar mandiri
            </p>
          </div>

          <Card className="bg-gradient-to-br from-accent/30 to-background border-accent/50">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Apa itu Roadmap Belajar?</h2>
                  <p className="text-muted-foreground mb-4">
                    Roadmap belajar bahasa Jepang adalah peta perjalanan yang menunjukkan tahapan-tahapan 
                    yang perlu Anda lalui untuk menguasai bahasa Jepang secara sistematis. Berbeda dengan 
                    belajar tanpa arah, roadmap ini membantu Anda fokus pada materi yang tepat sesuai level.
                  </p>
                  <h3 className="font-semibold mb-2">Mengapa perlu tahapan yang jelas?</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Menghindari kebingungan memilih materi
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Membangun fondasi yang kuat sebelum materi lanjutan
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Mengukur progres belajar dengan jelas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Meningkatkan motivasi dengan target yang terukur
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-card rounded-lg border border-border">
                    <p className="font-medium text-foreground flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Hasil Akhir yang Bisa Dicapai
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Dengan mengikuti roadmap ini secara konsisten, Anda dapat mencapai kemampuan 
                      JLPT N1 (level tertinggi) dalam waktu 3-5 tahun, mampu membaca novel, 
                      menonton anime tanpa subtitle, bekerja di perusahaan Jepang, atau melanjutkan 
                      studi di Jepang.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Section 2: Gambaran Umum Level */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Gambaran Umum Level Belajar
          </h2>

          <div className="grid gap-4">
            {[
              { level: "Level 0", name: "Pra-Pemula", color: "bg-slate-100 dark:bg-slate-800", desc: "Mengenal huruf Hiragana dan Katakana, dasar-dasar pelafalan" },
              { level: "Level 1", name: "JLPT N5", color: "bg-green-100 dark:bg-green-900/30", desc: "Percakapan dasar, 100 kanji, 800 kosakata" },
              { level: "Level 2", name: "JLPT N4", color: "bg-blue-100 dark:bg-blue-900/30", desc: "Komunikasi sehari-hari, 300 kanji, 1.500 kosakata" },
              { level: "Level 3", name: "JLPT N3", color: "bg-yellow-100 dark:bg-yellow-900/30", desc: "Pemahaman konteks umum, 650 kanji, 3.750 kosakata" },
              { level: "Level 4", name: "JLPT N2", color: "bg-orange-100 dark:bg-orange-900/30", desc: "Bahasa formal & informal kompleks, 1.000 kanji, 6.000 kosakata" },
              { level: "Level 5", name: "JLPT N1", color: "bg-red-100 dark:bg-red-900/30", desc: "Penguasaan penuh, 2.000+ kanji, 10.000+ kosakata" },
            ].map((item, idx) => (
              <Card key={idx} className={`${item.color} border-0`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <Badge variant="outline" className="shrink-0 font-bold">
                    {item.level}
                  </Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Section 3: Roadmap Detail Per Level */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookMarked className="h-6 w-6 text-primary" />
            Roadmap Detail Per Level
          </h2>

          <Tabs defaultValue="level0" className="w-full">
            <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
              <TabsTrigger value="level0" className="flex-1 min-w-[80px]">Level 0</TabsTrigger>
              <TabsTrigger value="level1" className="flex-1 min-w-[80px]">N5</TabsTrigger>
              <TabsTrigger value="level2" className="flex-1 min-w-[80px]">N4</TabsTrigger>
              <TabsTrigger value="level3" className="flex-1 min-w-[80px]">N3</TabsTrigger>
              <TabsTrigger value="level4" className="flex-1 min-w-[80px]">N2</TabsTrigger>
              <TabsTrigger value="level5" className="flex-1 min-w-[80px]">N1</TabsTrigger>
            </TabsList>

            {/* Level 0: Pra-Pemula */}
            <TabsContent value="level0" className="mt-6">
              <LevelDetail
                level="Level 0: Pra-Pemula"
                description="Tahap persiapan sebelum belajar formal"
                competencies={{
                  reading: "Membaca Hiragana dan Katakana dengan lancar",
                  writing: "Menulis semua huruf Hiragana (46) dan Katakana (46)",
                  listening: "Mengenali bunyi dasar bahasa Jepang",
                  speaking: "Pelafalan dasar, salam sederhana"
                }}
                materials={{
                  scripts: "Hiragana (あいうえお), Katakana (アイウエオ)",
                  grammar: "Belum dipelajari secara formal",
                  vocabulary: "~50 kata dasar (salam, angka, warna)",
                  patterns: "Belum ada",
                  particles: "Belum ada"
                }}
                conversations={[
                  "Memperkenalkan diri: はじめまして (Hajimemashite)",
                  "Salam pagi/siang/malam",
                  "Terima kasih & permisi"
                ]}
                studyTime={{
                  duration: "2-4 minggu",
                  daily: "30-60 menit per hari"
                }}
                commonMistakes={[
                  { mistake: "Menghafal romaji bukan huruf asli", solution: "Langsung belajar Hiragana/Katakana dari awal" },
                  { mistake: "Melewati Katakana karena dianggap kurang penting", solution: "Katakana sama pentingnya untuk kata serapan" },
                  { mistake: "Tidak melatih penulisan tangan", solution: "Tulis setiap huruf minimal 10 kali" }
                ]}
              />
            </TabsContent>

            {/* Level 1: JLPT N5 */}
            <TabsContent value="level1" className="mt-6">
              <LevelDetail
                level="Level 1: Pemula (JLPT N5)"
                description="Dasar-dasar bahasa Jepang untuk pemula"
                competencies={{
                  reading: "Membaca kalimat sederhana dengan Hiragana, Katakana, dan 100 Kanji dasar",
                  writing: "Menulis kalimat sederhana tentang diri sendiri dan aktivitas sehari-hari",
                  listening: "Memahami percakapan pendek dengan topik familiar",
                  speaking: "Percakapan sederhana tentang diri sendiri, keluarga, hobi"
                }}
                materials={{
                  scripts: "100 Kanji dasar (一二三日本人月火水)",
                  grammar: "です/ます form, partikel dasar, kata tanya",
                  vocabulary: "~800 kata (keluarga, waktu, tempat, aktivitas)",
                  patterns: "AはBです、AがBです、AをVます",
                  particles: "は、が、を、に、へ、で、の、と、も、か"
                }}
                conversations={[
                  "Memperkenalkan diri lengkap",
                  "Berbelanja di toko",
                  "Menanyakan arah",
                  "Memesan makanan di restoran",
                  "Berbicara tentang hobi"
                ]}
                studyTime={{
                  duration: "3-6 bulan",
                  daily: "1-2 jam per hari"
                }}
                commonMistakes={[
                  { mistake: "Mencampur partikel は dan が", solution: "は untuk topik, が untuk subjek baru/penekanan" },
                  { mistake: "Salah urutan kata (SVO bukan SOV)", solution: "Ingat: Subjek-Objek-Kata Kerja" },
                  { mistake: "Tidak belajar kanji dari awal", solution: "Mulai dengan 5 kanji per minggu" }
                ]}
              />
            </TabsContent>

            {/* Level 2: JLPT N4 */}
            <TabsContent value="level2" className="mt-6">
              <LevelDetail
                level="Level 2: Dasar-Menengah (JLPT N4)"
                description="Memperluas kemampuan komunikasi sehari-hari"
                competencies={{
                  reading: "Membaca paragraf pendek, pengumuman, email sederhana",
                  writing: "Menulis diary, email informal, deskripsi sederhana",
                  listening: "Memahami percakapan sehari-hari dengan kecepatan normal",
                  speaking: "Berpartisipasi dalam percakapan kasual dengan penutur asli"
                }}
                materials={{
                  scripts: "300 Kanji (tambahan 200 dari N5)",
                  grammar: "Te-form, bentuk potensial, bentuk pasif dasar, ~たい",
                  vocabulary: "~1.500 kata",
                  patterns: "~ている、~てもいい、~なければならない、~と思う",
                  particles: "より、ほど、など、だけ、しか"
                }}
                conversations={[
                  "Menceritakan pengalaman liburan",
                  "Membuat janji dengan teman",
                  "Menjelaskan masalah kesehatan ke dokter",
                  "Wawancara kerja paruh waktu sederhana",
                  "Diskusi tentang rencana masa depan"
                ]}
                studyTime={{
                  duration: "6-12 bulan",
                  daily: "1-2 jam per hari"
                }}
                commonMistakes={[
                  { mistake: "Kesulitan dengan te-form", solution: "Hafal pola: う/つ/る→って, む/ぬ/ぶ→んで, く→いて, ぐ→いで" },
                  { mistake: "Mengabaikan keigo (bahasa sopan)", solution: "Mulai kenalkan です/ます secara konsisten" },
                  { mistake: "Tidak cukup latihan listening", solution: "Dengarkan podcast/drama Jepang 30 menit/hari" }
                ]}
              />
            </TabsContent>

            {/* Level 3: JLPT N3 */}
            <TabsContent value="level3" className="mt-6">
              <LevelDetail
                level="Level 3: Menengah (JLPT N3)"
                description="Pemahaman konteks umum dan nuansa bahasa"
                competencies={{
                  reading: "Membaca artikel berita sederhana, manga, novel ringan",
                  writing: "Menulis esai pendek, laporan, surat formal sederhana",
                  listening: "Memahami berita, podcast, dialog anime dengan subtitle",
                  speaking: "Berdiskusi tentang topik umum, mengekspresikan pendapat"
                }}
                materials={{
                  scripts: "650 Kanji",
                  grammar: "Bentuk kausatif, pasif, kondisional (~ば/~たら/~なら)",
                  vocabulary: "~3.750 kata",
                  patterns: "~ようにする、~ことにする、~はずだ、~わけだ",
                  particles: "こそ、さえ、すら、ばかり、くらい"
                }}
                conversations={[
                  "Berdebat tentang isu sosial",
                  "Negosiasi dalam situasi bisnis sederhana",
                  "Menjelaskan prosedur atau instruksi",
                  "Wawancara kerja formal",
                  "Presentasi topik sederhana"
                ]}
                studyTime={{
                  duration: "12-18 bulan",
                  daily: "1.5-2 jam per hari"
                }}
                commonMistakes={[
                  { mistake: "Tidak memahami nuansa ~ば vs ~たら vs ~なら", solution: "Pelajari konteks penggunaan masing-masing" },
                  { mistake: "Vocabulary stagnan", solution: "Baca artikel berita Jepang setiap hari" },
                  { mistake: "Menghindari kanji sulit", solution: "Gunakan SRS (Spaced Repetition System)" }
                ]}
              />
            </TabsContent>

            {/* Level 4: JLPT N2 */}
            <TabsContent value="level4" className="mt-6">
              <LevelDetail
                level="Level 4: Menengah-Lanjut (JLPT N2)"
                description="Kemampuan bekerja dan studi di Jepang"
                competencies={{
                  reading: "Membaca artikel kompleks, novel, dokumen bisnis",
                  writing: "Menulis laporan bisnis, esai akademik, email formal",
                  listening: "Memahami berita TV, diskusi, presentasi bisnis",
                  speaking: "Presentasi formal, negosiasi, debat"
                }}
                materials={{
                  scripts: "1.000 Kanji",
                  grammar: "Keigo lengkap, ekspresi formal, nuansa halus",
                  vocabulary: "~6.000 kata",
                  patterns: "~ざるを得ない、~に関して、~にもかかわらず、~つつある",
                  particles: "Penggunaan kompleks semua partikel"
                }}
                conversations={[
                  "Meeting bisnis dengan klien",
                  "Presentasi proyek di perusahaan",
                  "Diskusi akademik",
                  "Negosiasi kontrak",
                  "Wawancara beasiswa"
                ]}
                studyTime={{
                  duration: "18-24 bulan",
                  daily: "2-3 jam per hari"
                }}
                commonMistakes={[
                  { mistake: "Keigo (sonkeigo vs kenjougo) tercampur", solution: "Praktik dengan role-play situasi bisnis" },
                  { mistake: "Reading comprehension lambat", solution: "Latihan membaca cepat dengan timer" },
                  { mistake: "Tidak familiar dengan idiom", solution: "Pelajari 慣用句 secara sistematis" }
                ]}
              />
            </TabsContent>

            {/* Level 5: JLPT N1 */}
            <TabsContent value="level5" className="mt-6">
              <LevelDetail
                level="Level 5: Mahir (JLPT N1)"
                description="Penguasaan bahasa Jepang tingkat profesional"
                competencies={{
                  reading: "Membaca literatur, jurnal akademik, dokumen hukum",
                  writing: "Menulis makalah akademik, dokumen resmi, sastra",
                  listening: "Memahami semua konteks tanpa kesulitan",
                  speaking: "Berbicara seperti penutur asli dalam semua situasi"
                }}
                materials={{
                  scripts: "2.000+ Kanji (常用漢字)",
                  grammar: "Semua pola gramatikal termasuk arkais dan sastra",
                  vocabulary: "10.000+ kata",
                  patterns: "~やいなや、~が早いか、~とあって、古語表現",
                  particles: "Penguasaan penuh termasuk nuansa sastra"
                }}
                conversations={[
                  "Pidato formal di acara resmi",
                  "Debat politik atau akademik",
                  "Interpretasi profesional",
                  "Diskusi filosofis atau teknis",
                  "Komunikasi diplomatik"
                ]}
                studyTime={{
                  duration: "24-36 bulan setelah N2",
                  daily: "2-4 jam per hari"
                }}
                commonMistakes={[
                  { mistake: "Berhenti belajar setelah lulus N1", solution: "N1 adalah awal, bukan akhir perjalanan" },
                  { mistake: "Kurang exposure ke dialek", solution: "Pelajari Kansai-ben dan dialek lainnya" },
                  { mistake: "Tidak memperdalam kanji langka", solution: "Baca literatur klasik Jepang" }
                ]}
              />
            </TabsContent>
          </Tabs>
        </section>

        <Separator className="my-8" />

        {/* Section 4: Metode Belajar */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            Metode Belajar yang Direkomendasikan
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <MethodCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Belajar Mandiri (Self-Study)"
              description="Belajar dengan buku teks dan materi terstruktur sesuai jadwal sendiri."
              pros={["Fleksibel waktu", "Hemat biaya", "Bisa fokus pada kelemahan"]}
            />
            <MethodCard
              icon={<GraduationCap className="h-6 w-6" />}
              title="Belajar dengan Aplikasi"
              description="Menggunakan aplikasi seperti Anki, Bunpo, atau WaniKani untuk latihan harian."
              pros={["Interaktif & gamified", "Tracking progress otomatis", "Dapat diakses di mana saja"]}
            />
            <MethodCard
              icon={<Users className="h-6 w-6" />}
              title="Belajar dengan Native Speaker"
              description="Praktik langsung dengan penutur asli melalui language exchange atau tutor."
              pros={["Koreksi pelafalan langsung", "Belajar bahasa natural", "Membangun kepercayaan diri"]}
            />
            <MethodCard
              icon={<Headphones className="h-6 w-6" />}
              title="Shadowing & Listening Aktif"
              description="Meniru pelafalan dan intonasi dari audio/video asli Jepang."
              pros={["Meningkatkan fluency", "Memperbaiki aksen", "Melatih telinga"]}
            />
            <MethodCard
              icon={<Repeat className="h-6 w-6" />}
              title="Spaced Repetition (SRS)"
              description="Sistem pengulangan terjadwal untuk menghafal kanji dan kosakata secara efisien."
              pros={["Retensi jangka panjang", "Efisiensi waktu", "Berbasis sains"]}
            />
            <MethodCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="Immersion (Pencelupan)"
              description="Mengelilingi diri dengan konten Jepang: anime, drama, berita, musik."
              pros={["Belajar konteks nyata", "Menyenangkan", "Meningkatkan pemahaman budaya"]}
            />
          </div>
        </section>

        <Separator className="my-8" />

        {/* Section 5: Contoh Jadwal Belajar */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Contoh Jadwal Belajar
          </h2>

          <Tabs defaultValue="30min" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="30min">30 Menit/Hari</TabsTrigger>
              <TabsTrigger value="1hour">1 Jam/Hari</TabsTrigger>
              <TabsTrigger value="2hour">2 Jam/Hari</TabsTrigger>
            </TabsList>

            <TabsContent value="30min" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Jadwal 30 Menit per Hari</CardTitle>
                  <p className="text-sm text-muted-foreground">Ideal untuk pemula atau yang sibuk bekerja</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Hari</th>
                          <th className="text-left p-2">Aktivitas</th>
                          <th className="text-left p-2">Durasi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="p-2 font-medium">Senin</td><td className="p-2">Review Kanji (SRS)</td><td className="p-2">30 menit</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Selasa</td><td className="p-2">Grammar baru</td><td className="p-2">30 menit</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Rabu</td><td className="p-2">Listening practice</td><td className="p-2">30 menit</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Kamis</td><td className="p-2">Reading practice</td><td className="p-2">30 menit</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Jumat</td><td className="p-2">Vocabulary baru</td><td className="p-2">30 menit</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Sabtu</td><td className="p-2">Review mingguan</td><td className="p-2">30 menit</td></tr>
                        <tr><td className="p-2 font-medium">Minggu</td><td className="p-2">Immersion (anime/drama)</td><td className="p-2">30 menit</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <strong>Estimasi progress:</strong> Mencapai N5 dalam 12-18 bulan
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="1hour" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Jadwal 1 Jam per Hari</CardTitle>
                  <p className="text-sm text-muted-foreground">Keseimbangan optimal antara progres dan komitmen</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Waktu</th>
                          <th className="text-left p-2">Aktivitas</th>
                          <th className="text-left p-2">Durasi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="p-2 font-medium">Sesi 1</td><td className="p-2">Kanji & Vocabulary (SRS)</td><td className="p-2">20 menit</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Sesi 2</td><td className="p-2">Grammar study</td><td className="p-2">20 menit</td></tr>
                        <tr><td className="p-2 font-medium">Sesi 3</td><td className="p-2">Reading atau Listening</td><td className="p-2">20 menit</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <strong>Estimasi progress:</strong> Mencapai N5 dalam 6-9 bulan, N4 dalam 12-15 bulan
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="2hour" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Jadwal 2 Jam per Hari</CardTitle>
                  <p className="text-sm text-muted-foreground">Untuk pembelajar serius yang ingin progres cepat</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Waktu</th>
                          <th className="text-left p-2">Aktivitas</th>
                          <th className="text-left p-2">Durasi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="p-2 font-medium">Pagi</td><td className="p-2">Kanji & Vocabulary (SRS intensif)</td><td className="p-2">30 menit</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Siang</td><td className="p-2">Grammar study & exercise</td><td className="p-2">30 menit</td></tr>
                        <tr className="border-b"><td className="p-2 font-medium">Sore</td><td className="p-2">Reading comprehension</td><td className="p-2">30 menit</td></tr>
                        <tr><td className="p-2 font-medium">Malam</td><td className="p-2">Listening & Shadowing</td><td className="p-2">30 menit</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <strong>Estimasi progress:</strong> Mencapai N5 dalam 3-4 bulan, N4 dalam 6-8 bulan, N3 dalam 12-15 bulan
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator className="my-8" />

        {/* Section 6: Sumber Belajar */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Sumber Belajar yang Disarankan
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  📚 Buku
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Minna no Nihongo</strong> - Textbook standar untuk pemula</p>
                <p><strong>Genki</strong> - Buku teks populer dengan penjelasan bahasa Inggris</p>
                <p><strong>Tobira</strong> - Untuk level menengah (N3-N2)</p>
                <p><strong>Shinkanzen Master</strong> - Persiapan JLPT lengkap</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  🌐 Website
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Tae Kim's Guide</strong> - Grammar gratis dan lengkap</p>
                <p><strong>Imabi</strong> - Referensi grammar mendalam</p>
                <p><strong>NHK World</strong> - Berita Jepang dengan teks</p>
                <p><strong>Jisho.org</strong> - Kamus online terbaik</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  📱 Aplikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Anki</strong> - Flashcard SRS untuk kanji/vocabulary</p>
                <p><strong>WaniKani</strong> - Belajar kanji sistematis</p>
                <p><strong>Bunpo</strong> - Grammar JLPT interaktif</p>
                <p><strong>Takoboto</strong> - Kamus offline Android</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  📺 YouTube
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Japanese Ammo with Misa</strong> - Grammar dengan contoh natural</p>
                <p><strong>Nihongo no Mori</strong> - Persiapan JLPT (dalam bahasa Jepang)</p>
                <p><strong>Cure Dolly</strong> - Penjelasan grammar unik</p>
                <p><strong>Sambon Juku</strong> - Listening JLPT</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  🎧 Podcast
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>JapanesePod101</strong> - Podcast pembelajaran terstruktur</p>
                <p><strong>Nihongo con Teppei</strong> - Cerita pendek untuk pemula</p>
                <p><strong>Let's Learn Japanese from Small Talk</strong> - Percakapan natural</p>
                <p><strong>Bilingual News</strong> - Berita dwibahasa</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  🎮 Immersion
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p><strong>Anime</strong> - Mulai dengan subtitle Jepang</p>
                <p><strong>Drama</strong> - Bahasa lebih natural</p>
                <p><strong>Light Novel</strong> - Bacaan dengan furigana</p>
                <p><strong>Game Jepang</strong> - RPG untuk latihan membaca</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Section 7: Indikator Keberhasilan */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Indikator Keberhasilan
          </h2>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Tanda-tanda Anda Siap Naik Level:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Checklist Evaluasi Diri
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Dapat membaca materi level saat ini tanpa banyak kesulitan
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Menguasai 80%+ grammar points level saat ini
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Dapat mengikuti percakapan/audio level saat ini
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Lulus simulasi ujian JLPT dengan nilai 70%+
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Merasa bosan dengan materi saat ini (tanda sudah menguasai!)
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    Tanda Belum Siap Naik Level
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">×</span>
                      Masih sering lupa kanji/vocabulary dasar
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">×</span>
                      Kesulitan memahami 50%+ kalimat saat reading
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">×</span>
                      Tidak bisa menyusun kalimat dasar dengan lancar
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">×</span>
                      Gagal simulasi ujian JLPT (di bawah 50%)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">×</span>
                      Terburu-buru ingin naik level tanpa fondasi kuat
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Section 8: Penutup */}
        <section className="mb-12">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/20 border-primary/30">
            <CardContent className="p-6 md:p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">🌸 Pesan Penutup</h2>
                <p className="text-muted-foreground mb-4">
                  Belajar bahasa Jepang adalah maraton, bukan sprint. Setiap orang memiliki kecepatan 
                  belajar yang berbeda, dan itu sangat normal. Yang terpenting bukanlah seberapa cepat 
                  Anda mencapai N1, melainkan <strong>konsistensi Anda setiap hari</strong>.
                </p>
                <p className="text-muted-foreground mb-6">
                  Lebih baik belajar 30 menit setiap hari selama setahun, daripada belajar 5 jam 
                  sehari selama seminggu lalu menyerah. Ingat pepatah Jepang:
                </p>
                <blockquote className="text-xl font-japanese font-semibold text-foreground mb-2">
                  「継続は力なり」
                </blockquote>
                <p className="text-sm text-muted-foreground mb-6">
                  (Keizoku wa chikara nari - Konsistensi adalah kekuatan)
                </p>
                <p className="font-medium text-foreground mb-6">
                  Mulailah dari Level 0 hari ini. Satu huruf Hiragana per hari sudah cukup untuk memulai!
                </p>
                <Link to="/">
                  <Button size="lg" className="gap-2">
                    Mulai Belajar Sekarang
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>JapanReader AI - Platform Belajar Bahasa Jepang dengan AI</p>
        </div>
      </footer>
    </div>
  );
};

// Component for Level Detail
interface LevelDetailProps {
  level: string;
  description: string;
  competencies: {
    reading: string;
    writing: string;
    listening: string;
    speaking: string;
  };
  materials: {
    scripts: string;
    grammar: string;
    vocabulary: string;
    patterns: string;
    particles: string;
  };
  conversations: string[];
  studyTime: {
    duration: string;
    daily: string;
  };
  commonMistakes: {
    mistake: string;
    solution: string;
  }[];
}

const LevelDetail = ({ level, description, competencies, materials, conversations, studyTime, commonMistakes }: LevelDetailProps) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold text-foreground">{level}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>

    {/* Target Kompetensi */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Target Kompetensi
        </CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
        <div><strong>Membaca:</strong> {competencies.reading}</div>
        <div><strong>Menulis:</strong> {competencies.writing}</div>
        <div><strong>Mendengar:</strong> {competencies.listening}</div>
        <div><strong>Berbicara:</strong> {competencies.speaking}</div>
      </CardContent>
    </Card>

    {/* Materi yang Dipelajari */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Materi yang Dipelajari
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div><strong>Huruf:</strong> {materials.scripts}</div>
        <div><strong>Tata Bahasa:</strong> {materials.grammar}</div>
        <div><strong>Kosakata:</strong> {materials.vocabulary}</div>
        <div><strong>Pola Kalimat:</strong> {materials.patterns}</div>
        <div><strong>Partikel:</strong> {materials.particles}</div>
      </CardContent>
    </Card>

    {/* Contoh Topik Percakapan */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Contoh Topik Percakapan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 text-sm">
          {conversations.map((conv, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              {conv}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>

    {/* Estimasi Waktu Belajar */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Estimasi Waktu Belajar
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground">Total Durasi</p>
            <p className="font-semibold text-lg">{studyTime.duration}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Rekomendasi Harian</p>
            <p className="font-semibold text-lg">{studyTime.daily}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Kesalahan Umum */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          Kesalahan Umum yang Harus Dihindari
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {commonMistakes.map((item, idx) => (
          <div key={idx} className="text-sm border-l-2 border-primary/30 pl-4">
            <p className="text-destructive font-medium">❌ {item.mistake}</p>
            <p className="text-green-600 dark:text-green-400">✅ {item.solution}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

// Component for Method Card
interface MethodCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  pros: string[];
}

const MethodCard = ({ icon, title, description, pros }: MethodCardProps) => (
  <Card className="h-full">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center gap-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="space-y-1">
        {pros.map((pro, idx) => (
          <p key={idx} className="text-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
            {pro}
          </p>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default Roadmap;
