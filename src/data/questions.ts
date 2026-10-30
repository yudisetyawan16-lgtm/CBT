export type QuestionType = 'single_c4_c5' | 'complex' | 'matching';

export interface SingleChoiceQuestion {
  id: number;
  type: 'single_c4_c5';
  title: string;
  category: string;
  cognitiveLevel: 'C4 (Menganalisis)' | 'C5 (Mengevaluasi)';
  stimulus: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
}

export interface ComplexChoiceQuestion {
  id: number;
  type: 'complex';
  title: string;
  category: string;
  cognitiveLevel: 'C4-C5 Kompleks';
  stimulus: string;
  question: string;
  instruction: string;
  statements: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface MatchingItem {
  id: string;
  leftText: string;
  correctRightId: string;
}

export interface MatchingOption {
  id: string;
  text: string;
}

export interface MatchingQuestion {
  id: number;
  type: 'matching';
  title: string;
  category: string;
  cognitiveLevel: 'C4-C5 Menjodohkan';
  stimulus: string;
  question: string;
  instruction: string;
  pairs: MatchingItem[];
  rightOptions: MatchingOption[];
  explanation: string;
}

export type Question = SingleChoiceQuestion | ComplexChoiceQuestion | MatchingQuestion;

export const QUESTIONS_DATA: Question[] = [
  // ==========================================
  // BAGIAN 1: 20 SOAL PILIHAN GANDA LEVEL C4-C5 (Soal 1 - 20)
  // 5 Opsi (A, B, C, D, E) tipe literasi mendalam
  // ==========================================
  {
    id: 1,
    type: 'single_c4_c5',
    title: 'Analisis Keterkaitan Sila Pertama dan Sila Kedua',
    category: 'Keterkaitan Antarsila Pancasila',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Dalam buku "Uraian Pancasila" (1984), Mohammad Hatta bersama para tokoh pendiri bangsa lainnya menegaskan bahwa kelima sila merupakan kesatuan organis yang tak dapat dipisahkan. Sila Ketuhanan Yang Maha Esa berada di posisi paling atas yang memimpin dan menjiwai seluruh sila lainnya. Hal ini bermakna bahwa religiositas bangsa Indonesia tidak boleh berhenti pada ritus ibadah personal semata di tempat ibadah.`,
    question: `Berdasarkan teks di atas, manakah analisis tindakan sosial berikut yang paling tepat mencerminkan keterkaitan langsung antara sila pertama dan sila kedua dalam kehidupan bermasyarakat?`,
    options: [
      { key: 'A', text: 'Seseorang hanya mau memberikan sumbangan korban bencana alam kepada korban yang berasal dari agama yang sama dengannya.' },
      { key: 'B', text: 'Melakukan aksi donor darah sukarela dan membantu sesama manusia tanpa membedakan latar belakang agama atas dasar ketaatan kepada Tuhan.' },
      { key: 'C', text: 'Mendirikan tempat ibadah secara sepihak di permukiman padat tanpa memedulikan izin lingkungan sekitar demi syiar agama.' },
      { key: 'D', text: 'Menganggap bahwa kegiatan kemanusiaan tidak perlu dikaitkan dengan nilai keimanan karena urusan sosial bersifat profan.' },
      { key: 'E', text: 'Mengharuskan semua orang menjalankan ritual ibadah yang seragam agar tercipta kesetaraan derajat di hadapan sesama manusia.' }
    ],
    correctAnswer: 'B',
    explanation: 'Hubungan sila pertama dan kedua menegaskan bahwa keimanan kepada Tuhan Yang Maha Esa harus diejawantahkan dalam bentuk cinta kasih sesama manusia sebagai makhluk ciptaan-Nya tanpa diskriminasi, seperti aksi donor darah (Buku Hal. 5 & 11).'
  },
  {
    id: 2,
    type: 'single_c4_c5',
    title: 'Evaluasi Konsep Sukarno: Kosmopolitanisme & Kebangsaan',
    category: 'Keterkaitan Antarsila Pancasila',
    cognitiveLevel: 'C5 (Mengevaluasi)',
    stimulus: `Ir. Sukarno dalam pidato lahirnya Pancasila 1 Juni 1945 menyatakan bahwa kebangsaan Indonesia bukanlah kebangsaan yang menyendiri (chauvinisme), melainkan kebangsaan yang bergandeng tangan dengan perikemanusiaan. Sukarno menghendaki terjadinya keseimbangan status dalam diri setiap insan Indonesia antara menjadi bagian dari bangsa Indonesia dan menjadi bagian dari keluarga besar umat manusia di dunia.`,
    question: `Apabila suatu kelompok masyarakat menolak segala bentuk bantuan internasional untuk korban bencana alam dengan alasan bahwa bangsa Indonesia harus steril dari pengaruh dunia luar dan merasa martabatnya lebih tinggi dari bangsa lain, bagaimana evaluasi Anda terhadap fenomena ini berdasarkan keterkaitan Sila II dan Sila III?`,
    options: [
      { key: 'A', text: 'Tindakan tersebut sangat tepat karena menunjukkan kedaulatan nasional yang kokoh sesuai asas persatuan nasional.' },
      { key: 'B', text: 'Sikap tersebut keliru karena melanggar prinsip bahwa nasionalisme Indonesia adalah bagian dari kemanusiaan universal yang menolak chauvinisme.' },
      { key: 'C', text: 'Tindakan tersebut sesuai dengan amanat pidato 1 Juni 1945 agar bangsa Indonesia mengutamakan kepentingan kelompok sendiri di atas segalanya.' },
      { key: 'D', text: 'Sikap tersebut wajar sebagai respon adaptif terhadap potensi hegemoni kebudayaan asing yang merusak identitas nasional.' },
      { key: 'E', text: 'Tindakan tersebut merupakan bentuk aktualisasi Leitstar Dinamis dalam membentengi ketahanan ideologi negara.' }
    ],
    correctAnswer: 'B',
    explanation: 'Hubungan Sila II dan III mendudukkan identitas kebangsaan Indonesia sebagai bagian integral dari kemanusiaan universal. Indonesia tidak menganggap dirinya lebih unggul dari bangsa lain dan menjunjung tinggi kesetaraan global (Buku Hal. 6).'
  },
  {
    id: 3,
    type: 'single_c4_c5',
    title: 'Analisis Prinsip Demokrasi Berkeadilan Sosial',
    category: 'Keterkaitan Antarsila Pancasila',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Keterkaitan sila keempat dan sila kelima menunjukkan bahwa demokrasi di Indonesia tidak hanya dimaknai secara sempit dalam aspek politik (prosedural), seperti sekadar menggunakan hak suara saat pemilu. Mohammad Hatta dan para pendiri bangsa menekankan bahwa kedaulatan rakyat harus bermuara pada kesetaraan di bidang sosial-ekonomi bagi kemakmuran rakyat banyak.`,
    question: `Manakah kebijakan pemerintah berikut yang paling tepat merefleksikan integrasi substansial antara kedaulatan politik (Sila IV) dan keadilan sosial (Sila V)?`,
    options: [
      { key: 'A', text: 'Penyelenggaraan pemilu secara serentak berbiaya mahal meskipun anggaran jaminan kesehatan masyarakat dipotong.' },
      { key: 'B', text: 'Musyawarah perencanaan pembangunan (Musrenbang) yang melibatkan warga dari tingkat RT untuk mengalokasikan anggaran pemberdayaan ekonomi marjinal.' },
      { key: 'C', text: 'Pemberian izin eksplorasi tambang skala besar tanpa konsultasi publik demi mempercepat pertumbuhan penerimaan devisa pusat.' },
      { key: 'D', text: 'Pengesahan undang-undang strategis secara tertutup oleh parlemen demi mempercepat stabilitas politik dan iklim investasi.' },
      { key: 'E', text: 'Pelaksanaan jajak pendapat di media sosial tanpa verifikasi representasi daerah terdepan dan terluar nusantara.' }
    ],
    correctAnswer: 'B',
    explanation: 'Musrenbang melibatkan partisipasi rakyat (Sila IV) untuk menghasilkan kebijakan anggaran yang mewujudkan pemerataan dan keadilan sosial (Sila V), sesuai amanat buku halaman 7.'
  },
  {
    id: 4,
    type: 'single_c4_c5',
    title: 'Analisis Kedudukan Agama dalam Negara Menurut Pasal 29',
    category: 'Makna Sila-Sila dalam Pancasila',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Berdasarkan Buku Pendidikan Pancasila Kelas XI, Indonesia ditegaskan bukan negara teokrasi/agama (theocratic state) yang mendasarkan hukum pada syariat satu agama tertentu, namun juga bukan negara sekuler yang memisahkan urusan agama dari kehidupan publik. Nilai-nilai ketuhanan hadir sebagai roh dan landasan moral bagi seluruh tatanan hukum dan bernegara sebagaimana tertuang dalam Pasal 29 UUD 1945.`,
    question: `Berdasarkan uraian tersebut, kedudukan yang paling tepat bagi negara Republik Indonesia dalam memosisikan relasi agama dan negara adalah...`,
    options: [
      { key: 'A', text: 'Negara bebas nilai yang tidak mencampuri sama sekali kebebasan berkeyakinan penduduknya.' },
      { key: 'B', text: 'Negara mewajibkan satu agama resmi bagi seluruh warga negara sebagai syarat mutlak status kewarganegaraan.' },
      { key: 'C', text: 'Negara berketuhanan yang aktif menjamin kebebasan tiap penduduk beribadah sesuai keyakinan dan menempatkan nilai ilahiah sebagai kompas moral.' },
      { key: 'D', text: 'Negara ateis modern yang mengutamakan rasionalisme murni di atas keyakinan spiritual.' },
      { key: 'E', text: 'Negara federal yang menyerahkan penentuan agama resmi sepenuhnya kepada masing-masing yurisdiksi daerah bagian.' }
    ],
    correctAnswer: 'C',
    explanation: 'Indonesia adalah negara berketuhanan yang menjamin kebebasan memeluk agama dan beribadat (Pasal 29 UUD 1945) serta menempatkan nilai moral agama sebagai roh penyelenggaraan negara (Buku Hal. 9).'
  },
  {
    id: 5,
    type: 'single_c4_c5',
    title: 'Analisis Hakikat Kemanusiaan Beradab',
    category: 'Makna Sila-Sila dalam Pancasila',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Kata "kemanusiaan" merujuk pada makhluk ciptaan Tuhan yang memiliki potensi cipta, rasa, karsa, dan karya. Kata "adil" bermakna bahwa keputusan didasarkan pada norma yang objektif dan tidak sewenang-wenang. Kata "beradab" berasal dari kata adab, yaitu keluhuran budi pekerti yang berlandaskan norma sosial dan moral kesusilaan.`,
    question: `Di sebuah perusahaan terjadi pemotongan upah sepihak bagi pekerja magang disabilitas tanpa ada perjanjian kerja yang jelas, sementara staf lain memperoleh tunjangan penuh. Berdasarkan Sila Kemanusiaan yang Adil dan Beradab, tindakan perusahaan tersebut melanggar prinsip...`,
    options: [
      { key: 'A', text: 'Objektivitas dan perlakuan manusiawi yang menghargai derajat dan kesetaraan harkat martabat manusia.' },
      { key: 'B', text: 'Sentralisasi kekuasaan dan pembagian wewenang yang diatur dalam undang-undang ketenagakerjaan.' },
      { key: 'C', text: 'Prinsip efisiensi korporasi dalam menghadapi tantangan ekonomi era globalisasi.' },
      { key: 'D', text: 'Hak otonomi pengusaha untuk menetapkan aturan internal di luar kewenangan negara.' },
      { key: 'E', text: 'Asas kepatuhan hierarkis antara bawahan dan atasan di lingkungan kerja formal.' }
    ],
    correctAnswer: 'A',
    explanation: 'Sila II mengajarkan bahwa seluruh manusia wajib diperlakukan setara sesuai harkat dan martabatnya secara adil tanpa diskriminasi latar belakang atau kondisi fisik (Buku Hal. 11-12).'
  },
  {
    id: 6,
    type: 'single_c4_c5',
    title: 'Evaluasi Implementasi Sila Persatuan dalam Pelestarian Alam',
    category: 'Makna Sila-Sila dalam Pancasila',
    cognitiveLevel: 'C5 (Mengevaluasi)',
    stimulus: `Buku Pendidikan Pancasila Kelas XI Hal. 13 menegaskan bahwa Sila Ketiga "Persatuan Indonesia" tidak hanya menghendaki bangsa Indonesia mencintai keragaman etnis dan budaya, melainkan juga menjaga kelestarian lingkungan hidup nusantara yang kaya akan flora dan fauna sebagai modal keberlanjutan masa depan generasi penerus.`,
    question: `Manakah kasus berikut yang merupakan pelanggaran paling nyata terhadap esensi ekologis Sila Persatuan Indonesia?`,
    options: [
      { key: 'A', text: 'Pemerintah daerah menggalakkan festival tarian tradisional antarbudaya di kawasan pariwisata.' },
      { key: 'B', text: 'Pembakaran hutan adat secara ilegal demi ekspansi perkebunan yang memicu kabut asap lintas provinsi dan kepunahan satwa endemik.' },
      { key: 'C', text: 'Warga desa bergotong royong membersihkan saluran irigasi bersama suku pendatang.' },
      { key: 'D', text: 'Penyelenggaraan lomba cerdas cermat empat pilar kebangsaan di lingkungan SMK.' },
      { key: 'E', text: 'Penggunaan bahasa daerah dalam percakapan informal sehari-hari di lingkungan keluarga.' }
    ],
    correctAnswer: 'B',
    explanation: 'Pembakaran hutan merusak keutuhan alam Indonesia yang diamanatkan Sila III untuk dijaga kelestariannya demi keberlanjutan hidup bersama lintas generasi (Buku Hal. 13).'
  },
  {
    id: 7,
    type: 'single_c4_c5',
    title: 'Analisis Demokrasi Konsensus Bung Hatta',
    category: 'Makna Sila-Sila dalam Pancasila',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Pakar hukum Munir Fuady (2010) mencatat bahwa demokrasi Pancasila di Indonesia merupakan jenis dari teori demokrasi konsensus. Mohammad Hatta (1960) juga menekankan bahwa demokrasi asli Indonesia berakar dari tradisi musyawarah desa yang lebih mengedepankan asas saling merangkul daripada saling memusuhi, serta lebih mengutamakan mufakat daripada prinsip '50% plus 1' (mayoritarianisme murni).`,
    question: `Mengapa model demokrasi konsensus dinilai paling sesuai dengan kepribadian bangsa Indonesia dibandingkan sistem mayoritarianisme murni?`,
    options: [
      { key: 'A', text: 'Karena pemungutan suara terbanyak selalu menghasilkan keputusan yang mutlak benar secara hukum.' },
      { key: 'B', text: 'Karena sistem demokrasi konsensus menghapus fungsi lembaga legislatif dan yudikatif.' },
      { key: 'C', text: 'Karena kebhinekaan suku dan budaya membutuhkan mekanisme dialog kekeluargaan yang mencegah dominasi mayoritas dan tirani minoritas.' },
      { key: 'D', text: 'Karena masyarakat Indonesia secara tradisi tidak mengenal adanya perbedaan pendapat sama sekali.' },
      { key: 'E', text: 'Karena sistem konsensus menjamin tidak adanya pergantian kepemimpinan negara secara berkala.' }
    ],
    correctAnswer: 'C',
    explanation: 'Demokrasi konsensus bersumber dari kekeluargaan untuk merangkul semua perbedaan dan menghindari tirani mayoritas di tengah bangsa yang sangat majemuk (Buku Hal. 34-35).'
  },
  {
    id: 8,
    type: 'single_c4_c5',
    title: 'Analisis Makna Pidato Bung Karno Tahun 1955',
    category: 'Pancasila dalam Tindakan',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Pada 24 September 1955, di hadapan Kongres Rakyat Jawa Timur, Sukarno berpidato: "Aku bukan pencipta Pancasila. Pancasila diciptakan oleh bangsa Indonesia sendiri. Aku hanya menggali Pancasila daripada buminya bangsa Indonesia. Pancasila terbenam di dalam bumi bangsa Indonesia 350 tahun lamanya. Aku gali kembali dan aku persembahkan Pancasila ini di atas persada bangsa Indonesia kembali."`,
    question: `Makna filosofis mendasar dari ungkapan "menggali dari buminya bangsa Indonesia" dalam pidato Sukarno tersebut adalah...`,
    options: [
      { key: 'A', text: 'Pancasila disalin secara langsung dari sistem filsafat Barat dan ideologi Timur Tengah yang masuk ke Nusantara.' },
      { key: 'B', text: 'Pancasila dirumuskan secara mendadak saat tentara Jepang membentuk BPUPK pada tahun 1945.' },
      { key: 'C', text: 'Nilai-nilai Pancasila telah hidup, berurat berakar dalam tradisi, gotong royong, dan kearifan nenek moyang nusantara jauh sebelum kemerdekaan diproklamasikan.' },
      { key: 'D', text: 'Pancasila merupakan doktrin kekuasaan yang diciptakan sepihak oleh Sukarno untuk memimpin revolusi.' },
      { key: 'E', text: 'Pancasila hanya berlaku selama masa perjuangan fisik kemerdekaan melawan kolonialisme.' }
    ],
    correctAnswer: 'C',
    explanation: 'Sukarno memposisikan dirinya hanya sebagai penggali nilai-nilai luhur yang telah ratusan tahun hidup dalam sanubari dan kebudayaan rakyat Indonesia (Buku Hal. 21-22).'
  },
  {
    id: 9,
    type: 'single_c4_c5',
    title: 'Analisis Tiga Unsur Esensial Ideologi Koento Wibisono',
    category: 'Pancasila sebagai Ideologi Negara',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Prof. Koento Wibisono menemukan adanya tiga unsur esensial yang terkandung dalam setiap ideologi di dunia, yaitu: (1) Keyakinan (adanya gagasan vital yang diyakini kebenarannya sebagai landasan tujuan), (2) Mitos (memitoskan suatu ajaran yang optimis menjamin tercapainya tujuan), dan (3) Loyalitas (menuntut keterlibatan optimal atas dasar kesetiaan para pendukungnya).`,
    question: `Seorang siswa SMK aktif mengikuti upacara bendera, mematuhi kode etik sekolah, serta rela mengorbankan waktu senggangnya untuk membela nama baik almamater dan bangsanya dalam ajang kejuaraan teknologi. Sikap siswa tersebut merupakan wujud konkret dari unsur ideologi...`,
    options: [
      { key: 'A', text: 'Mitos, karena meyakini takhayul keberuntungan.' },
      { key: 'B', text: 'Loyalitas, karena menunjukkan dedikasi, komitmen, dan keterlibatan aktif subjek pendukung ideologi.' },
      { key: 'C', text: 'Keyakinan kognitif belaka tanpa adanya tindakan nyata.' },
      { key: 'D', text: 'Eksklusivisme golongan dalam lingkup organisasi tertutup.' },
      { key: 'E', text: 'Oligarki pendidikan yang membatasi hak siswa lain.' }
    ],
    correctAnswer: 'B',
    explanation: 'Unsur loyalitas menuntut keterlibatan aktif, kesetiaan, dan dedikasi optimal para pendukungnya dalam mewujudkan cita-cita bersama (Buku Hal. 23-24).'
  },
  {
    id: 10,
    type: 'single_c4_c5',
    title: 'Evaluasi Dimensi Meja Statis dan Leitstar Dinamis',
    category: 'Pancasila sebagai Ideologi Negara',
    cognitiveLevel: 'C5 (Mengevaluasi)',
    stimulus: `Sukarno menegaskan Pancasila memiliki dwifungsi: sebagai "Meja Statis" dan "Leitstar Dinamis" (bintang penuntun dari bahasa Jerman leitstern). Sebagai meja statis, Pancasila mempertemukan dan menyatukan seluruh keragaman etnis, agama, dan golongan. Sebagai Leitstar Dinamis, Pancasila tidak kaku melainkan luwes menuntun bangsa menghadapi perkembangan zaman dan revolusi teknologi tanpa kehilangan jati diri.`,
    question: `Di era kecerdasan buatan (AI) dan digitalisasi global saat ini, bagaimana implementasi peran Pancasila sebagai "Leitstar Dinamis" yang paling tepat?`,
    options: [
      { key: 'A', text: 'Menolak pemanfaatan teknologi internet secara total agar nilai-nilai lokal tidak terkontaminasi budaya asing.' },
      { key: 'B', text: 'Mengubah isi lima sila Pancasila agar sesuai dengan tren teknologi yang berlaku di negara maju.' },
      { key: 'C', text: 'Memanfaatkan perkembangan teknologi digital untuk inovasi dan literasi publik sambil tetap memfilter konten berlandaskan etika moral Pancasila.' },
      { key: 'D', text: 'Menganggap bahwa nilai Pancasila telah usang dan hanya berlaku untuk generasi sebelum reformasi.' },
      { key: 'E', text: 'Menghapuskan hukum positif nasional dan menyerahkan regulasi siber sepenuhnya kepada korporasi transnasional.' }
    ],
    correctAnswer: 'C',
    explanation: 'Sebagai Leitstar Dinamis, Pancasila adaptif merespon zaman, menuntun transformasi digital dan kemajuan Iptek dengan tetap berpijak teguh pada fondasi etika dan jati diri bangsa (Buku Hal. 27-28).'
  },
  {
    id: 11,
    type: 'single_c4_c5',
    title: 'Analisis Dinamika UUD 1945 Periode Pertama (1945-1949)',
    category: 'Periodisasi Pemberlakuan UUD',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Pada periode 18 Agustus 1945 - 27 Desember 1949, UUD 1945 disahkan oleh PPKI. Sukarno dalam pidatonya menyebut UUD 1945 sebagai "revolutiegrondwet" atau undang-undang dasar kilat yang bersifat sementara. Berdasarkan Pasal IV Aturan Peralihan, sebelum MPR, DPR, dan DPA terbentuk, segala kekuasaan dijalankan oleh Presiden dengan bantuan Komite Nasional Indonesia Pusat (KNIP).`,
    question: `Dampak ketatanegaraan yang terjadi setelah diterbitkannya Maklumat Wakil Presiden No. X tanggal 16 Oktober 1945 pada periode tersebut adalah...`,
    options: [
      { key: 'A', text: 'KNIP dibubarkan dan digantikan oleh kabinet parlementer di bawah kendali Sultan Hamengku Buwono IX.' },
      { key: 'B', text: 'Kekuasaan Presiden menjadi mutlak tanpa ada lembaga pengawas sama sekali.' },
      { key: 'C', text: 'KNIP diserahi kekuasaan legislatif dan menetapkan GBHN serta dibentuk BP KNIP yang mengusulkan pembentukan partai politik.' },
      { key: 'D', text: 'Indonesia resmi beralih menjadi negara serikat di bawah naungan Kerajaan Belanda.' },
      { key: 'E', text: 'Dihapuskannya sistem presidensial secara permanen dalam teks Pembukaan UUD 1945.' }
    ],
    correctAnswer: 'C',
    explanation: 'Maklumat Wapres No. X tanggal 16 Oktober 1945 memberi KNIP wewenang legislatif dan ikut menetapkan GBHN sebelum terbentuknya MPR/DPR definitif (Buku Hal. 39).'
  },
  {
    id: 12,
    type: 'single_c4_c5',
    title: 'Analisis Bentuk Negara dan Pemerintahan Era Konstitusi RIS 1949',
    category: 'Periodisasi Pemberlakuan UUD',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Berdasarkan hasil Konferensi Meja Bundar (KMB), pada 27 Desember 1949 diberlakukan Konstitusi RIS. Bentuk negara Indonesia berubah menjadi negara serikat (federasi), bentuk pemerintahan republik, dan sistem pemerintahan parlementer di mana kabinet dipimpin oleh Perdana Menteri. Wilayah RI terpecah menjadi negara-negara bagian, dan UUD 1945 hanya berlaku di wilayah Negara Bagian RI yang beribu kota di Yogyakarta.`,
    question: `Siapakah tokoh yang menjabat sebagai Presiden pada Negara Bagian Republik Indonesia di Yogyakarta selama berlakunya Konstitusi RIS 1949?`,
    options: [
      { key: 'A', text: 'Mr. Assaat' },
      { key: 'B', text: 'Mohammad Hatta' },
      { key: 'C', text: 'Sutan Sjahrir' },
      { key: 'D', text: 'Sri Sultan Hamengku Buwono IX' },
      { key: 'E', text: 'Mr. Amir Sjarifuddin' }
    ],
    correctAnswer: 'A',
    explanation: 'Dalam buku teks halaman 40 ditegaskan bahwa saat UUD RIS berlaku, UUD 1945 tetap berlaku di Negara Bagian Republik Indonesia di Yogyakarta dengan Presiden Mr. Assaat.'
  },
  {
    id: 13,
    type: 'single_c4_c5',
    title: 'Evaluasi Ketidakstabilan Politik pada Masa UUDS 1950',
    category: 'Periodisasi Pemberlakuan UUD',
    cognitiveLevel: 'C5 (Mengevaluasi)',
    stimulus: `Pada masa berlakunya UUDS 1950 (17 Agustus 1950 - 5 Juli 1959), Indonesia menerapkan bentuk negara kesatuan dengan sistem parlementer. Selama kurun waktu sembilan tahun tersebut terjadi pergantian kabinet sebanyak tujuh kali akibat seringnya mosi tidak percaya di parlemen. Hal ini memicu ketidakpuasan daerah dan kelambanan pembangunan nasional.`,
    question: `Faktor konstitusional dan politis utama yang menyebabkan instabilitas pemerintahan yang kronis pada masa UUDS 1950 tersebut adalah...`,
    options: [
      { key: 'A', text: 'Kekuasaan Presiden yang terlalu kuat dan bersifat otoriter melebihi batas konstitusi.' },
      { key: 'B', text: 'Sistem multipartai yang terfragmentasi di mana kabinet sangat rapuh terhadap mosi tidak percaya parlemen serta Konstituante macet merumuskan UUD tetap.' },
      { key: 'C', text: 'Belum adanya pemilihan umum untuk memilih anggota DPR dan Dewan Konstituante.' },
      { key: 'D', text: 'Adanya intervensi militer asing yang membubarkan kabinet koalisi secara paksa.' },
      { key: 'E', text: 'Pembatasan hak berserikat dan berkumpul bagi partai-partai politik lokal di daerah.' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada era UUDS 1950 terjadi sistem multipartai yang rapuh mosi parlemen (7 kali kabinet jatuh bangun) dan Dewan Konstituante gagal menyepakati UUD tetap hingga lahir Dekrit Presiden 5 Juli 1959 (Buku Hal. 42-43).'
  },
  {
    id: 14,
    type: 'single_c4_c5',
    title: 'Analisis Faktor Historis Dekrit Presiden 5 Juli 1959',
    category: 'Periodisasi Pemberlakuan UUD',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Pada 22 April 1959, Presiden Sukarno berpidato di hadapan sidang Konstituante mengusulkan kembali ke UUD 1945 tanpa amandemen. Tiga kali pemungutan suara diadakan (30 Mei, 1 Juni, dan 2 Juni 1959), namun seluruhnya gagal mencapai kuorum 2/3 suara dari anggota yang hadir. Situasi kebuntuan politik ini mendorong dikeluarkannya Dekrit Presiden 5 Juli 1959.`,
    question: `Manakah dari ketiga hal berikut yang merupakan isi pokok resmi Dekrit Presiden 5 Juli 1959?`,
    options: [
      { key: 'A', text: 'Membubarkan Konstituante, menetapkan berlakunya kembali UUD 1945 dan tidak berlakunya UUDS 1950, serta pembentukan MPRS dan DPAS.' },
      { key: 'B', text: 'Menetapkan bentuk negara federal, membubarkan DPR hasil pemilu 1955, dan melantik Perdana Menteri baru.' },
      { key: 'C', text: 'Mengangkat Presiden Sukarno seumur hidup, membekukan partai politik, dan membentuk Mahkamah Konstitusi.' },
      { key: 'D', text: 'Melaksanakan amandemen UUD 1945 tahap pertama dan membentuk Dewan Perwakilan Daerah.' },
      { key: 'E', text: 'Menyerahkan mandat kekuasaan sementara kepada Komite Nasional Indonesia Pusat (KNIP).' }
    ],
    correctAnswer: 'A',
    explanation: 'Dekrit Presiden 5 Juli 1959 memuat tiga putusan pokok: pembubaran Konstituante, berlakunya kembali UUD 1945 & tidak berlakunya UUDS 1950, serta pembentukan MPRS dan DPAS (Buku Hal. 43).'
  },
  {
    id: 15,
    type: 'single_c4_c5',
    title: 'Evaluasi Lima Indikator Demokrasi Menurut Affan Gaffar',
    category: 'Periodisasi Pemberlakuan UUD',
    cognitiveLevel: 'C5 (Mengevaluasi)',
    stimulus: `Affan Gaffar mengemukakan lima indikator negara demokrasi: (1) Akuntabilitas pejabat publik, (2) Rotasi kekuasaan yang teratur dan damai, (3) Rekrutmen politik yang terbuka, (4) Pemilihan umum yang bebas dan adil, dan (5) Pemenuhan hak-hak dasar warga negara (pers, berserikat, berpendapat).`,
    question: `Pada masa Demokrasi Terpimpin (1959-1965) dan Orde Baru (1966-1998), indikator demokrasi manakah yang mengalami degradasi paling mendasar akibat dominasi kekuasaan eksekutif?`,
    options: [
      { key: 'A', text: 'Pelaksanaan upacara peringatan kemerdekaan nasional yang kurang semarak.' },
      { key: 'B', text: 'Rotasi kekuasaan eksekutif dan akuntabilitas politik karena minimnya sistem saling mengawasi dan mengimbangi (checks and balances).' },
      { key: 'C', text: 'Jumlah lembaga tinggi negara yang terlalu banyak dan tumpang tindih anggaran.' },
      { key: 'D', text: 'Penggunaan bahasa Indonesia sebagai bahasa resmi komunikasi kenegaraan.' },
      { key: 'E', text: 'Penyusunan rencana pembangunan lima tahun yang terlalu desentralistis ke tingkat RT.' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada era pra-reformasi, rotasi kekuasaan eksekutif terhambat (Presiden Soeharto berkuasa 32 tahun) dan checks and balances tidak berjalan optimal karena kekuasaan terpusat di tangan eksekutif (Buku Hal. 47-48).'
  },
  {
    id: 16,
    type: 'single_c4_c5',
    title: 'Analisis Latar Belakang Amandemen UUD NRI Tahun 1945',
    category: 'Perubahan UUD NRI Tahun 1945',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Gelombang reformasi Mei 1998 memunculkan tuntutan perubahan mendasar atas UUD NRI 1945. Salah satu kelemahan konstitusional sebelum amandemen adalah struktur ketatanegaraan yang menempatkan MPR sebagai pemegang kekuasaan tertinggi mutlak ("executive heavy" & subordinasi lembaga lain), serta adanya pasal-pasal yang multitafsir yang rentan disalahgunakan penguasa.`,
    question: `Perubahan mendasar pada Pasal 1 ayat (2) UUD 1945 setelah amandemen menunjukkan pergeseran filosofis konsepsi kedaulatan, yaitu dari...`,
    options: [
      { key: 'A', text: 'Kedaulatan di tangan Presiden menjadi kedaulatan di tangan Mahkamah Agung.' },
      { key: 'B', text: 'Kedaulatan di tangan rakyat dan dilakukan sepenuhnya oleh MPR, menjadi kedaulatan di tangan rakyat dan dilakukan menurut Undang-Undang Dasar.' },
      { key: 'C', text: 'Kedaulatan di tangan parlemen menjadi kedaulatan di tangan perdana menteri.' },
      { key: 'D', text: 'Kedaulatan daerah serikat menjadi kedaulatan mutlak pemerintah pusat monarki.' },
      { key: 'E', text: 'Kedaulatan militer menjadi kedaulatan koalisi partai politik pemenang pemilu.' }
    ],
    correctAnswer: 'B',
    explanation: 'Pasal 1 ayat (2) sebelum amandemen berbunyi "dilakukan sepenuhnya oleh MPR", setelah amandemen menjadi "dilakukan menurut Undang-Undang Dasar", mengubah kedaulatan subjektif menjadi objektif konstitusional (Buku Hal. 35 & 48).'
  },
  {
    id: 17,
    type: 'single_c4_c5',
    title: 'Analisis Kesepakatan Dasar Perubahan UUD NRI Tahun 1945',
    category: 'Perubahan UUD NRI Tahun 1945',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Panitia Ad Hoc MPR dalam menyusun amandemen UUD NRI 1945 (1999-2002) menetapkan lima kesepakatan dasar: (1) Tidak mengubah Pembukaan UUD 1945, (2) Tetap mempertahankan NKRI, (3) Mempertegas sistem pemerintahan presidensial, (4) Meniadakan Penjelasan UUD 1945 dan memasukkan hal-hal normatif ke pasal-pasal, dan (5) Melakukan perubahan secara adendum.`,
    question: `Mengapa MPR sepakat untuk TIDAK mengubah Pembukaan UUD NRI Tahun 1945?`,
    options: [
      { key: 'A', text: 'Karena Pembukaan UUD 1945 ditulis dalam bahasa Sansekerta yang sulit diterjemahkan kembali.' },
      { key: 'B', text: 'Karena mengubah Pembukaan UUD 1945 sama halnya membubarkan Negara Kesatuan Republik Indonesia yang diproklamasikan 17 Agustus 1945 karena memuat staatsidee dan dasar filosofis negara.' },
      { key: 'C', text: 'Karena jumlah kata dalam Pembukaan UUD 1945 sudah ditentukan oleh piagam internasional PBB.' },
      { key: 'D', text: 'Karena seluruh anggota MPR saat itu tidak memiliki kewenangan legislatif untuk mengubah teks pembuka.' },
      { key: 'E', text: 'Karena Pembukaan UUD 1945 hanya berisi aturan peralihan yang tidak mengikat secara hukum.' }
    ],
    correctAnswer: 'B',
    explanation: 'Pembukaan memuat dasar filosofis (Pancasila), cita-cita dan tujuan berdirinya NKRI (staatsidee). Mengubah Pembukaan berarti membubarkan hakikat negara yang didirikan para pendiri bangsa (Buku Hal. 54).'
  },
  {
    id: 18,
    type: 'single_c4_c5',
    title: 'Analisis Prosedur Amandemen Menurut Pasal 37 UUD 1945',
    category: 'Perubahan UUD NRI Tahun 1945',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Pasal 37 UUD NRI Tahun 1945 hasil amandemen mengatur tata cara perubahan undang-undang dasar dengan syarat ketat: usul diajukan tertulis oleh sekurang-kurangnya 1/3 dari jumlah anggota MPR, sidang dihadiri sekurang-kurangnya 2/3 dari jumlah anggota MPR, dan putusan disetujui sekurang-kurangnya 50% ditambah satu anggota dari seluruh anggota MPR. Pasal 37 ayat (5) secara tegas melarang perubahan terhadap bentuk NKRI.`,
    question: `Jika MPR memiliki 711 anggota dan hendak mengagendakan sidang pengubahan pasal UUD, berapakah jumlah minimal kehadiran anggota MPR agar sidang tersebut sah (memenuhi kuorum)?`,
    options: [
      { key: 'A', text: '237 anggota (1/3 dari jumlah anggota MPR)' },
      { key: 'B', text: '356 anggota (50% dari jumlah anggota MPR)' },
      { key: 'C', text: '474 anggota (2/3 dari jumlah anggota MPR)' },
      { key: 'D', text: '711 anggota (100% kehadiran penuh)' },
      { key: 'E', text: '100 anggota dari perwakilan fraksi mayoritas' }
    ],
    correctAnswer: 'C',
    explanation: 'Pasal 37 ayat (3) mensyaratkan sidang MPR untuk mengubah pasal-pasal UUD wajib dihadiri sekurang-kurangnya 2/3 anggota MPR (2/3 x 711 = 474 anggota) (Buku Hal. 50).'
  },
  {
    id: 19,
    type: 'single_c4_c5',
    title: 'Evaluasi Data Indeks Demokrasi EIU (Flawed Democracy)',
    category: 'Perilaku Demokratis Era Keterbukaan Informasi',
    cognitiveLevel: 'C5 (Mengevaluasi)',
    stimulus: `Berdasarkan riset The Economist Intelligence Unit (EIU) yang diulas pada Buku Siswa Hal. 56, Indonesia meraih skor Indeks Demokrasi sebesar 6,71 dan dikategorikan sebagai demokrasi cacat (flawed democracy). Penurunan tajam tercatat pada indikator budaya politik yang demokratis (4,38) dan kebebasan sipil (6,18), di mana polarisasi sosial, intoleransi opini, serta maraknya ujaran kebencian di ruang digital menjadi faktor pemicu utamanya.`,
    question: `Sebagai pelajar Pancasila generasi muda SMK/SMA, langkah solutif konkret apa yang paling mendesak untuk memperbaiki indikator budaya politik yang demokratis tersebut?`,
    options: [
      { key: 'A', text: 'Menghindari partisipasi politik sama sekali dan bersikap apatis terhadap pemilu.' },
      { key: 'B', text: 'Membiasakan budaya literasi kritis, saling menghargai perbedaan pendapat, santun bermedia sosial, dan menolak hoaks/ujaran kebencian.' },
      { key: 'C', text: 'Melakukan aksi perundungan siber (cyberbullying) kepada siapapun yang berbeda pandangan politik di media sosial.' },
      { key: 'D', text: 'Mendorong pemerintah mematikan seluruh akses internet dan jaringan telekomunikasi nasional.' },
      { key: 'E', text: 'Membentuk kelompok eksklusif yang hanya mau berinteraksi dengan sesama golongan sendiri.' }
    ],
    correctAnswer: 'B',
    explanation: 'Budaya demokrasi diperbaiki melalui pembiasaan bernalar kritis, santun dalam berpendapat, menghargai keberagaman, dan cerdas berliterasi digital agar terhindar dari polarisasi hoaks (Buku Hal. 56, 59, 63-64).'
  },
  {
    id: 20,
    type: 'single_c4_c5',
    title: 'Analisis Hak Kebebasan Berpendapat yang Bertanggung Jawab',
    category: 'Perilaku Demokratis Era Keterbukaan Informasi',
    cognitiveLevel: 'C4 (Menganalisis)',
    stimulus: `Pasal 28E ayat (3) UUD NRI 1945 menjamin bahwa setiap orang berhak atas kebebasan berserikat, berkumpul, dan mengeluarkan pendapat. Namun demikian, Buku Pendidikan Pancasila Hal. 57 mengingatkan bahwa kebebasan dalam demokrasi Pancasila bukanlah kebebasan tanpa batas, melainkan kebebasan yang bertanggung jawab (diatur dalam Pasal 28J) dengan menjaga norma moral, ketertiban umum, dan hak orang lain.`,
    question: `Seorang pembuat konten di media sosial mengunggah video bernada provokatif yang menuduh salah satu pemuka agama melakukan korupsi tanpa bukti valid, yang kemudian memicu kericuhan massa. Dilihat dari perspektif Pasal 28 dan etika demokrasi Pancasila, tindakan tersebut dinilai...`,
    options: [
      { key: 'A', text: 'Sah dan dilindungi konstitusi sepenuhnya karena setiap warga negara bebas berbicara apapun tanpa sanksi hukum.' },
      { key: 'B', text: 'Penyalahgunaan hak kebebasan berpendapat karena menyebarkan disinformasi tanpa verifikasi dan merusak ketertiban serta kehormatan orang lain.' },
      { key: 'C', text: 'Bentuk kebebasan mutlak yang merupakan ciri hakiki dari negara demokrasi modern liberal.' },
      { key: 'D', text: 'Tindakan yang harus didukung masyarakat sebagai wujud partisipasi kritis anak muda di media sosial.' },
      { key: 'E', text: 'Bukan masalah hukum karena terjadi di dunia maya yang berada di luar jangkauan UUD 1945.' }
    ],
    correctAnswer: 'B',
    explanation: 'Kebebasan berekspresi dijamin namun dibatasi oleh kewajiban menghormati hak orang lain, kesantunan, kebenaran bukti, dan ketertiban umum (Pasal 28J & Buku Hal. 57, 62).'
  },

  // ==========================================
  // BAGIAN 2: 10 SOAL PILIHAN GANDA KOMPLEKS (Soal 21 - 30)
  // Tipe literasi stimulus dengan multi-centang / kombinasi jawaban benar
  // ==========================================
  {
    id: 21,
    type: 'complex',
    title: 'Pilihan Ganda Kompleks: Karakteristik Ideologi Menurut Buku Siswa',
    category: 'Pancasila sebagai Ideologi Negara',
    cognitiveLevel: 'C4-C5 Kompleks',
    stimulus: `Ideologi berasal dari bahasa Yunani "ideos" (gagasan/ide) dan "logos" (ilmu/pengetahuan). Pada Buku Teks Hal. 24 dipaparkan enam ciri umum ideologi: berpandangan dunia, mengandung nilai dan tujuan, berpengaruh pada kebijakan publik, pemberi dan pembeda identitas, pendorong perubahan sosial, serta bersifat adaptif dan kontekstual.`,
    question: `Pilihlah seluruh pernyataan berikut yang BENAR mencerminkan ciri-ciri umum ideologi menurut buku teks!`,
    instruction: `Pilihlah semua pernyataan yang benar (centang opsi yang sesuai):`,
    statements: [
      { id: '21_1', text: 'Ideologi memberikan cara pandang menyeluruh dan konsisten terhadap masyarakat, kekuasaan, dan kebudayaan.', isCorrect: true },
      { id: '21_2', text: 'Ideologi bersifat kaku, statis, dan tertutup sehingga menolak segala bentuk perubahan zaman.', isCorrect: false },
      { id: '21_3', text: 'Ideologi memengaruhi arah pembentukan kebijakan politik, distribusi kesejahteraan, dan hukum negara.', isCorrect: true },
      { id: '21_4', text: 'Ideologi menjadi sumber identitas dan pembeda bagi suatu kelompok atau bangsa.', isCorrect: true }
    ],
    explanation: 'Ciri umum ideologi mencakup cara pandang dunia, memengaruhi kebijakan, menjadi pembeda identitas, dan bersifat adaptif/kontekstual (bukan kaku/menolak perubahan zaman) (Buku Hal. 24).'
  },
  {
    id: 22,
    type: 'complex',
    title: 'Pilihan Ganda Kompleks: Kesepakatan Dasar Amandemen UUD 1945',
    category: 'Perubahan UUD NRI Tahun 1945',
    cognitiveLevel: 'C4-C5 Kompleks',
    stimulus: `Sebelum melakukan perubahan pasal-pasal UUD NRI Tahun 1945 pada Sidang MPR tahun 1999-2002, seluruh fraksi di MPR membuat komitmen bersama berupa 5 Kesepakatan Dasar agar arah perubahan tetap berada pada koridor konstitusional bangsa.`,
    question: `Manakah poin-poin yang termasuk ke dalam 5 Kesepakatan Dasar Perubahan UUD NRI Tahun 1945?`,
    instruction: `Pilihlah semua butir kesepakatan dasar yang benar:`,
    statements: [
      { id: '22_1', text: 'Tidak mengubah Pembukaan UUD NRI Tahun 1945.', isCorrect: true },
      { id: '22_2', text: 'Mengubah bentuk Negara Kesatuan Republik Indonesia menjadi Negara Serikat.', isCorrect: false },
      { id: '22_3', text: 'Mempertegas sistem pemerintahan presidensial.', isCorrect: true },
      { id: '22_4', text: 'Melakukan perubahan secara adendum (mempertahankan naskah asli dan meletakkan perubahan melekat padanya).', isCorrect: true }
    ],
    explanation: 'Kesepakatan dasar MPR meliputi: tidak ubah Pembukaan, pertahankan NKRI (bukan serikat), perkuat presidensial, penjelasan dimasukkan pasal, dan perubahan secara adendum (Buku Hal. 54).'
  },
  {
    id: 23,
    type: 'complex',
    title: 'Pilihan Ganda Kompleks: Tradisi Demokrasi Asli Nusantara Bung Hatta',
    category: 'Demokrasi Berdasarkan UUD 1945',
    cognitiveLevel: 'C4-C5 Kompleks',
    stimulus: `Mohammad Hatta (1960) menyatakan bahwa gagasan demokrasi bukan hal asing bagi bangsa Indonesia. Di tingkat pedesaan, bangsa Indonesia telah lama mempraktikkan demokrasi asli yang mengedepankan musyawarah mufakat untuk menyelesaikan masalah bersama.`,
    question: `Manakah pasangan istilah demokrasi adat daerah dan asal wilayahnya yang TEPAT sesuai uraian buku teks?`,
    instruction: `Centang seluruh pasangan tradisi demokrasi lokal yang benar:`,
    statements: [
      { id: '23_1', text: 'Rembug Desa di masyarakat Jawa untuk memusyawarahkan kepentingan bersama warga.', isCorrect: true },
      { id: '23_2', text: 'Kerapatan Adat Nagari di masyarakat Sumatera Barat (Minangkabau).', isCorrect: true },
      { id: '23_3', text: 'Tudang Sipulung di masyarakat Sulawesi Selatan (Bugis/Makassar).', isCorrect: true },
      { id: '23_4', text: 'Riungan di masyarakat Jawa Barat (Sunda).', isCorrect: true }
    ],
    explanation: 'Keempat tradisi tersebut secara gamblang diuraikan oleh Mohammad Hatta dalam buku halaman 35 sebagai bukti demokrasi asli nusantara.'
  },
  {
    id: 24,
    type: 'complex',
    title: 'Pilihan Ganda Kompleks: Hasil Amandemen Tahap Ketiga (Tahun 2001)',
    category: 'Perubahan UUD NRI Tahun 1945',
    cognitiveLevel: 'C4-C5 Kompleks',
    stimulus: `Perubahan ketiga UUD NRI Tahun 1945 disahkan pada Sidang Tahunan MPR tanggal 1-9 November 2001. Tahap ini menghasilkan reformasi ketatanegaraan yang sangat luas menyangkut pemilihan presiden langsung dan lembaga peradilan konstitusi baru.`,
    question: `Manakah materi ketatanegaraan yang lahir dan disahkan pada Amandemen Ketiga UUD NRI Tahun 1945?`,
    instruction: `Pilihlah semua materi yang disahkan pada amandemen ketiga:`,
    statements: [
      { id: '24_1', text: 'Pemilihan Presiden dan Wakil Presiden secara langsung oleh rakyat dalam satu pasangan.', isCorrect: true },
      { id: '24_2', text: 'Pembentukan Dewan Perwakilan Daerah (DPD) sebagai perwakilan aspirasi daerah.', isCorrect: true },
      { id: '24_3', text: 'Pembentukan Mahkamah Konstitusi (MK) dan Komisi Yudisial (KY).', isCorrect: true },
      { id: '24_4', text: 'Penghapusan Dewan Pertimbangan Agung (DPA) digantikan Wantimpres.', isCorrect: false }
    ],
    explanation: 'Pemilihan presiden langsung, DPD, MK, KY, BPK, dan Pemilu diatur pada Amandemen Ketiga (2001). Penghapusan DPA dilakukan pada Amandemen Keempat (2002) (Buku Hal. 52-53).'
  },
  {
    id: 25,
    type: 'complex',
    title: 'Pilihan Ganda Kompleks: Alur Bernalar Kritis dalam Memecahkan Masalah',
    category: 'Perilaku Demokratis Era Keterbukaan Informasi',
    cognitiveLevel: 'C4-C5 Kompleks',
    stimulus: `Profil Pelajar Pancasila menghendaki peserta didik bernalar kritis dalam merespons derasnya arus informasi. Pada infografik Gambar 2.9 (Buku Hal. 60), dijelaskan empat elemen kunci alur bernalar kritis saat menghadapi persoalan di masyarakat.`,
    question: `Manakah elemen kunci yang termasuk ke dalam tahapan alur bernalar kritis menurut buku teks?`,
    instruction: `Centang semua elemen kunci yang benar:`,
    statements: [
      { id: '25_1', text: 'Memperoleh dan memproses informasi serta gagasan secara objektif.', isCorrect: true },
      { id: '25_2', text: 'Menganalisis dan mengevaluasi penalaran.', isCorrect: true },
      { id: '25_3', text: 'Merefleksi pemikiran dan proses berpikir.', isCorrect: true },
      { id: '25_4', text: 'Mengambil keputusan berdasarkan pertimbangan matang.', isCorrect: true }
    ],
    explanation: 'Keempat tahapan tersebut adalah 4 elemen kunci bernalar kritis yang tertera di infografik Buku Hal. 60.'
  },
  {
    id: 26,
    type: 'complex',
    title: 'Pilihan Ganda Kompleks: Praktik Pancasila dalam Tindakan',
    category: 'Pancasila dalam Tindakan',
    cognitiveLevel: 'C4-C5 Kompleks',
    stimulus: `Buku Siswa Bab 1 menyajikan contoh konkret bagaimana nilai-nilai Pancasila hidup dalam realitas tindakan masyarakat, mulai dari dukungan suporter tim nasional hingga aksi gotong royong warga desa.`,
    question: `Manakah dari tindakan berikut yang menjadi contoh konkret "Pancasila dalam Tindakan" sebagaimana diuraikan dalam Buku Pendidikan Pancasila Kelas XI?`,
    instruction: `Centang seluruh contoh yang sesuai dengan teks buku:`,
    statements: [
      { id: '26_1', text: 'Warga Desa Tambakua di Sulawesi Tenggara bergotong royong menyemai bibit jagung di ladang milik warga.', isCorrect: true },
      { id: '26_2', text: 'Aksi kemanusiaan donor darah yang diselenggarakan oleh peserta didik SMA/SMK.', isCorrect: true },
      { id: '26_3', text: 'Suporter sepak bola melantunkan lagu kebangsaan dan "Garuda di Dadaku" dengan menjunjung tinggi sportivitas.', isCorrect: true },
      { id: '26_4', text: 'Memaksakan seluruh warga desa untuk beralih menanam komoditas tunggal tanpa musyawarah.', isCorrect: false }
    ],
    explanation: 'Gotong royong Tambakua (Hal. 13), donor darah siswa (Hal. 11), dan sportivitas suporter Garuda (Hal. 17-20) adalah contoh resmi pada buku.'
  },
  {
    id: 27,
    type: 'complex',
    title: 'Pilihan Ganda Kompleks: Kriteria Negara Demokratis Menurut Kemdikbudristek',
    category: 'Demokrasi Berdasarkan UUD 1945',
    cognitiveLevel: 'C4-C5 Kompleks',
    stimulus: `Berdasarkan uraian materi Aktivitas 2.8 dan kutipan resmi Kemdikbudristek (Buku Hal. 59), pada hakikatnya karakteristik pokok negara demokratis meliputi empat sendi fundamental dalam kehidupan bernegara.`,
    question: `Manakah di antara prinsip berikut yang merupakan karakteristik negara demokratis menurut teks buku tersebut?`,
    instruction: `Pilihlah seluruh karakteristik yang tepat:`,
    statements: [
      { id: '27_1', text: 'Persamaan kedudukan di depan hukum (equality before the law).', isCorrect: true },
      { id: '27_2', text: 'Partisipasi rakyat dalam pembuatan keputusan politik dan kebijakan publik.', isCorrect: true },
      { id: '27_3', text: 'Distribusi pendapatan dan kesejahteraan secara adil.', isCorrect: true },
      { id: '27_4', text: 'Kebebasan mutlak bagi aparatur negara tanpa kewajiban bertanggung jawab.', isCorrect: false }
    ],
    explanation: 'Empat karakteristik negara demokrasi menurut Kemdikbudristek (Hal. 59): persamaan di depan hukum, partisipasi pembuatan keputusan, distribusi pendapatan adil, dan kebebasan yang bertanggung jawab.'
  },
  {
    id: 28,
    type: 'complex',
    title: 'Pilihan Ganda Kompleks: Visi Indonesia Emas 2045 & Impian 2085',
    category: 'Pancasila sebagai Ideologi Negara',
    cognitiveLevel: 'C4-C5 Kompleks',
    stimulus: `Pancasila sebagai ideologi negara memandu peta jalan pembangunan nasional jangka panjang. Dalam Buku Siswa Hal. 26 dicantumkan visi "Indonesia 2045: Berdaulat, Maju, Adil, dan Makmur" serta proyeksi "Impian Indonesia 2085".`,
    question: `Manakah kondisi capaian yang dicita-citakan dalam Visi Indonesia Emas 2045 dan Impian Indonesia 2085?`,
    instruction: `Centang semua pernyataan yang benar sesuai proyeksi buku:`,
    statements: [
      { id: '28_1', text: 'Terwujudnya Generasi Emas yang cerdas, produktif, inovatif, berkarakter kuat, dan berjiwa gotong royong.', isCorrect: true },
      { id: '28_2', text: 'Masyarakat dan aparatur pemerintah Indonesia terbebas sepenuhnya dari perilaku korupsi.', isCorrect: true },
      { id: '28_3', text: 'Terbangunnya infrastruktur yang merata dan inklusif di seluruh penjuru tanah air.', isCorrect: true },
      { id: '28_4', text: 'Pemberlakuan kembali sistem monarki absolut untuk mempercepat pengambilan keputusan.', isCorrect: false }
    ],
    explanation: 'Visi 2045 dan Impian 2085 mencita-citakan generasi unggul, bebas korupsi, infrastruktur merata, dan Indonesia mandiri di panggung peradaban dunia (Buku Hal. 26).'
  },
  {
    id: 29,
    type: 'complex',
    title: 'Pilihan Ganda Kompleks: Ciri Sistem Presidensial Pasca-Amandemen',
    category: 'Perubahan UUD NRI Tahun 1945',
    cognitiveLevel: 'C4-C5 Kompleks',
    stimulus: `Pasca-amandemen UUD NRI 1945, sistem presidensial Indonesia dipertegas. Prof. Dr. Soemantri (2003) dan ketentuan UUD NRI 1945 menegaskan bahwa Presiden dipilih langsung oleh rakyat, masa jabatannya dibatasi, dan menteri diangkat serta diberhentikan oleh Presiden.`,
    question: `Manakah ciri-ciri sistem presidensial di Indonesia pasca-amandemen UUD 1945?`,
    instruction: `Centang semua ciri sistem presidensial yang berlaku:`,
    statements: [
      { id: '29_1', text: 'Presiden memegang kekuasaan sebagai kepala negara sekaligus kepala pemerintahan.', isCorrect: true },
      { id: '29_2', text: 'Masa jabatan Presiden dibatasi paling banyak dua kali masa jabatan (maksimal 10 tahun).', isCorrect: true },
      { id: '29_3', text: 'Presiden dapat sewaktu-waktu dibubarkan oleh DPR melalui mosi tidak percaya.', isCorrect: false },
      { id: '29_4', text: 'Menteri-menteri negara bertanggung jawab langsung kepada Presiden, bukan kepada parlemen.', isCorrect: true }
    ],
    explanation: 'Dalam presidensial, eksekutif tidak bertanggung jawab kepada parlemen dan DPR tidak bisa menjatuhkan presiden dengan mosi tidak percaya. Menteri adalah pembantu presiden (Buku Hal. 48 & 52).'
  },
  {
    id: 30,
    type: 'complex',
    title: 'Pilihan Ganda Kompleks: Prinsip Demokrasi Ahmad Sanusi (2006)',
    category: 'Perilaku Demokratis Era Keterbukaan Informasi',
    cognitiveLevel: 'C4-C5 Kompleks',
    stimulus: `Prof. Ahmad Sanusi (2006) merumuskan 10 pilar demokrasi konstitusional Indonesia berdasarkan Pancasila dan UUD 1945 (Buku Hal. 63-64). Pilar-pilar ini membedakan demokrasi Pancasila dengan demokrasi liberal maupun komunis.`,
    question: `Manakah di antara prinsip berikut yang termaktub dalam 10 Pilar Demokrasi Ahmad Sanusi?`,
    instruction: `Pilihlah seluruh prinsip pilar demokrasi yang sesuai:`,
    statements: [
      { id: '30_1', text: 'Demokrasi yang Berketuhanan Yang Maha Esa.', isCorrect: true },
      { id: '30_2', text: 'Demokrasi dengan kecerdasan (Rule of Intelligence).', isCorrect: true },
      { id: '30_3', text: 'Demokrasi dengan pemisahan kekuasaan negara dan pengadilan yang merdeka.', isCorrect: true },
      { id: '30_4', text: 'Demokrasi yang mengutamakan kepentingan pemilik modal di atas kedaulatan rakyat.', isCorrect: false }
    ],
    explanation: 'Pilar Sanusi mencakup Demokrasi Berketuhanan YME, dengan kecerdasan, pemisahan kekuasaan, peradilan merdeka, HAM, otonomi daerah, kemakmuran, dan keadilan sosial (Buku Hal. 63-64).'
  },

  // ==========================================
  // BAGIAN 3: 10 SOAL MENJODOHKAN (Soal 31 - 40)
  // Menjodohkan Konsep / Tokoh / Peristiwa ke Definisi / Contoh yang Tepat
  // ==========================================
  {
    id: 31,
    type: 'matching',
    title: 'Menjodohkan: Sila Pancasila dan Makna Filosofis Kuncinya',
    category: 'Makna Sila-Sila dalam Pancasila',
    cognitiveLevel: 'C4-C5 Menjodohkan',
    stimulus: `Setiap sila dalam Pancasila memuat nilai dasar fundamental yang saling menjiwai. Hubungkan masing-masing sila dengan rumusan makna pokoknya menurut Buku Pendidikan Pancasila Kelas XI.`,
    question: `Pasangkanlah Sila Pancasila di kolom kiri dengan makna pokoknya di kolom kanan!`,
    instruction: `Pilih pasangan yang tepat untuk masing-masing item:`,
    pairs: [
      { id: 'p31_1', leftText: 'Sila Ke-1 (Ketuhanan YME)', correctRightId: 'r31_A' },
      { id: 'p31_2', leftText: 'Sila Ke-2 (Kemanusiaan Adil & Beradab)', correctRightId: 'r31_B' },
      { id: 'p31_3', leftText: 'Sila Ke-3 (Persatuan Indonesia)', correctRightId: 'r31_C' },
      { id: 'p31_4', leftText: 'Sila Ke-5 (Keadilan Sosial)', correctRightId: 'r31_D' }
    ],
    rightOptions: [
      { id: 'r31_A', text: 'Landasan moral luhur; negara bukan negara agama dan bukan negara sekuler' },
      { id: 'r31_B', text: 'Kesadaran budi rohani menghargai harkat martabat manusia tanpa perbudakan' },
      { id: 'r31_C', text: 'Bersatunya aneka corak ragam kebulatan dan kecintaan menjaga kelestarian alam' },
      { id: 'r31_D', text: 'Cita-cita kemakmuran bersama tanpa adanya kemiskinan di Indonesia merdeka' }
    ],
    explanation: 'Sila 1 = landasan moral luhur (Hal 9); Sila 2 = martabat manusia (Hal 11); Sila 3 = persatuan & kelestarian alam (Hal 12); Sila 5 = keadilan & kemakmuran tanpa kemiskinan (Hal 15).'
  },
  {
    id: 32,
    type: 'matching',
    title: 'Menjodohkan: Periodisasi Konstitusi dan Karakteristik Pokoknya',
    category: 'Periodisasi Pemberlakuan UUD',
    cognitiveLevel: 'C4-C5 Menjodohkan',
    stimulus: `Sepanjang sejarah kemerdekaan, Indonesia telah mengalami beberapa kali pergantian konstitusi tertulis sesuai dinamika perpolitikan nasional.`,
    question: `Jodohkan periodisasi konstitusi di sebelah kiri dengan karakteristik ketatanegaraannya di sebelah kanan!`,
    instruction: `Pasangkan setiap periode konstitusi dengan ciri pokok yang tepat:`,
    pairs: [
      { id: 'p32_1', leftText: 'UUD 1945 Periode I (1945-1949)', correctRightId: 'r32_A' },
      { id: 'p32_2', leftText: 'Konstitusi RIS (1949-1950)', correctRightId: 'r32_B' },
      { id: 'p32_3', leftText: 'UUDS 1950 (1950-1959)', correctRightId: 'r32_C' },
      { id: 'p32_4', leftText: 'UUD 1945 Era Dekrit (1959-1999)', correctRightId: 'r32_D' }
    ],
    rightOptions: [
      { id: 'r32_A', text: 'Disebut UUD kilat/sementara; KNIP menjalankan fungsi legislatif lewat Maklumat X' },
      { id: 'r32_B', text: 'Bentuk negara serikat (federal); UUD 1945 hanya berlaku di negara bagian Yogyakarta' },
      { id: 'r32_C', text: 'Bentuk negara kesatuan dengan sistem parlementer; terjadi 7 kali pergantian kabinet' },
      { id: 'r32_D', text: 'Diberlakukan kembali lewat Dekrit 5 Juli 1959 akibat kebuntuan sidang Konstituante' }
    ],
    explanation: 'Karakteristik periodisasi konstitusi sesuai pembahasan Bab 2 Buku Siswa halaman 37 hingga 44.'
  },
  {
    id: 33,
    type: 'matching',
    title: 'Menjodohkan: Empat Tahap Amandemen UUD NRI 1945 dan Fokus Materinya',
    category: 'Perubahan UUD NRI Tahun 1945',
    cognitiveLevel: 'C4-C5 Menjodohkan',
    stimulus: `Amandemen UUD NRI Tahun 1945 dilakukan oleh MPR dalam empat tahapan beruntun kurun waktu 1999-2002 dengan fokus materi perubahan yang terarah.`,
    question: `Pasangkan tahapan amandemen di sebelah kiri dengan materi pokok perubahannya di sebelah kanan!`,
    instruction: `Pilih materi yang tepat untuk setiap tahap amandemen:`,
    pairs: [
      { id: 'p33_1', leftText: 'Perubahan Pertama (1999)', correctRightId: 'r33_A' },
      { id: 'p33_2', leftText: 'Perubahan Kedua (2000)', correctRightId: 'r33_B' },
      { id: 'p33_3', leftText: 'Perubahan Ketiga (2001)', correctRightId: 'r33_C' },
      { id: 'p33_4', leftText: 'Perubahan Keempat (2002)', correctRightId: 'r33_D' }
    ],
    rightOptions: [
      { id: 'r33_A', text: 'Pembatasan kekuasaan Presiden (Pasal 7) dan penguatan wewenang DPR (Pasal 20-21)' },
      { id: 'r33_B', text: 'Pemerintahan Daerah (Pasal 18), Bab Hak Asasi Manusia lengkap, dan atribut bendera/lagu' },
      { id: 'r33_C', text: 'Pemilihan Presiden langsung, pembentukan lembaga DPD, MK, KY, dan bab Pemilu' },
      { id: 'r33_D', text: 'Penghapusan DPA (diganti Wantimpres), Bank Sentral, bab Pendidikan dan Anggaran 20%' }
    ],
    explanation: 'Empat tahap amandemen UUD 1945 dijelaskan secara rinci pada buku halaman 52-53.'
  },
  {
    id: 34,
    type: 'matching',
    title: 'Menjodohkan: Tokoh Pendiri Bangsa/Pakar dan Konsep Pemikirannya',
    category: 'Pancasila & Demokrasi Indonesia',
    cognitiveLevel: 'C4-C5 Menjodohkan',
    stimulus: `Berbagai tokoh dan akademisi Indonesia menyumbangkan gagasan penting dalam merumuskan dasar negara dan teori ketatanegaraan.`,
    question: `Jodohkan nama tokoh/ahli di sebelah kiri dengan konsep/gagasan kuncinya di sebelah kanan!`,
    instruction: `Pasangkan setiap tokoh dengan pemikiran yang tepat:`,
    pairs: [
      { id: 'p34_1', leftText: 'Ir. Sukarno', correctRightId: 'r34_A' },
      { id: 'p34_2', leftText: 'Dr. Mohammad Hatta', correctRightId: 'r34_B' },
      { id: 'p34_3', leftText: 'Prof. Koento Wibisono', correctRightId: 'r34_C' },
      { id: 'p34_4', leftText: 'Prof. Affan Gaffar', correctRightId: 'r34_D' }
    ],
    rightOptions: [
      { id: 'r34_A', text: 'Pancasila sebagai "Meja Statis" pemersatu bangsa dan "Leitstar Dinamis" penuntun zaman' },
      { id: 'r34_B', text: 'Demokrasi asli nusantara bersumber dari musyawarah mufakat desa (rembug desa, tudang sipulung)' },
      { id: 'r34_C', text: 'Tiga unsur esensial ideologi: Keyakinan, Mitos, dan Loyalitas' },
      { id: 'r34_D', text: 'Lima indikator negara demokratis: akuntabilitas, rotasi, rekrutmen, pemilu, hak dasar' }
    ],
    explanation: 'Sukarno (Hal 27), Hatta (Hal 34-35), Koento Wibisono (Hal 23), Affan Gaffar (Hal 36).'
  },
  {
    id: 35,
    type: 'matching',
    title: 'Menjodohkan: Tradisi Musyawarah Desa dan Daerah Asalnya',
    category: 'Demokrasi Berdasarkan UUD 1945',
    cognitiveLevel: 'C4-C5 Menjodohkan',
    stimulus: `Keragaman budaya nusantara memiliki kearifan lokal dalam mempraktikkan musyawarah untuk mencapai mufakat.`,
    question: `Pasangkan istilah musyawarah tradisional berikut dengan daerah asalnya di Indonesia!`,
    instruction: `Pilih daerah asal yang sesuai:`,
    pairs: [
      { id: 'p35_1', leftText: 'Rembug Desa', correctRightId: 'r35_A' },
      { id: 'p35_2', leftText: 'Kerapatan Adat Nagari', correctRightId: 'r35_B' },
      { id: 'p35_3', leftText: 'Riungan', correctRightId: 'r35_C' },
      { id: 'p35_4', leftText: 'Tudang Sipulung', correctRightId: 'r35_D' }
    ],
    rightOptions: [
      { id: 'r35_A', text: 'Masyarakat suku Jawa di pedesaan Jawa' },
      { id: 'r35_B', text: 'Masyarakat Minangkabau di Sumatera Barat' },
      { id: 'r35_C', text: 'Masyarakat suku Sunda di Jawa Barat' },
      { id: 'r35_D', text: 'Masyarakat suku Bugis-Makassar di Sulawesi Selatan' }
    ],
    explanation: 'Sesuai kutipan Mohammad Hatta dalam Buku Siswa halaman 35 tentang demokrasi desa asli Indonesia.'
  },
  {
    id: 36,
    type: 'matching',
    title: 'Menjodohkan: Pasal UUD NRI 1945 dan Muatan Materinya',
    category: 'Perubahan UUD NRI Tahun 1945',
    cognitiveLevel: 'C4-C5 Menjodohkan',
    stimulus: `UUD NRI Tahun 1945 memuat pasal-pasal kunci yang mengatur hak warga negara dan struktur kelembagaan negara Republik Indonesia.`,
    question: `Pasangkan pasal UUD 1945 di sebelah kiri dengan muatan materinya di sebelah kanan!`,
    instruction: `Pilih pasal yang tepat untuk tiap materi:`,
    pairs: [
      { id: 'p36_1', leftText: 'Pasal 1 ayat (2)', correctRightId: 'r36_A' },
      { id: 'p36_2', leftText: 'Pasal 7', correctRightId: 'r36_B' },
      { id: 'p36_3', leftText: 'Pasal 28E ayat (3)', correctRightId: 'r36_C' },
      { id: 'p36_4', leftText: 'Pasal 37 ayat (5)', correctRightId: 'r36_D' }
    ],
    rightOptions: [
      { id: 'r36_A', text: 'Kedaulatan berada di tangan rakyat dan dilaksanakan menurut Undang-Undang Dasar' },
      { id: 'r36_B', text: 'Pembatasan masa jabatan Presiden dan Wakil Presiden maksimal dua periode berturut-turut' },
      { id: 'r36_C', text: 'Hak setiap orang atas kebebasan berserikat, berkumpul, dan mengeluarkan pendapat' },
      { id: 'r36_D', text: 'Khusus mengenai bentuk Negara Kesatuan Republik Indonesia tidak dapat dilakukan perubahan' }
    ],
    explanation: 'Pasal 1 ayat (2) (Hal 35), Pasal 7 (Hal 53), Pasal 28E ayat 3 (Hal 34, 57), Pasal 37 ayat 5 (Hal 50).'
  },
  {
    id: 37,
    type: 'matching',
    title: 'Menjodohkan: Sikap Demokratis di Empat Lingkungan Kehidupan',
    category: 'Perilaku Demokratis Berdasarkan UUD 1945',
    cognitiveLevel: 'C4-C5 Menjodohkan',
    stimulus: `Sikap dan perilaku demokratis harus dibiasakan mulai dari lingkungan terkecil hingga kehidupan berbangsa dan bernegara (Buku Siswa Hal. 64-65).`,
    question: `Jodohkan lingkungan kehidupan di sebelah kiri dengan contoh perilaku demokratis yang relevan di sebelah kanan!`,
    instruction: `Pasangkan setiap lingkungan dengan aksi demokratis yang tepat:`,
    pairs: [
      { id: 'p37_1', leftText: 'Lingkungan Keluarga', correctRightId: 'r37_A' },
      { id: 'p37_2', leftText: 'Lingkungan Sekolah', correctRightId: 'r37_B' },
      { id: 'p37_3', leftText: 'Lingkungan Masyarakat', correctRightId: 'r37_C' },
      { id: 'p37_4', leftText: 'Lingkungan Bangsa & Negara', correctRightId: 'r37_D' }
    ],
    rightOptions: [
      { id: 'r37_A', text: 'Memutuskan tujuan liburan atau pembagian tugas rumah secara musyawarah dan menghargai suara anak' },
      { id: 'r37_B', text: 'Menghargai pendapat teman dalam diskusi kelompok dan tidak memaksakan kehendak saat rapat OSIS' },
      { id: 'r37_C', text: 'Menghormati keputusan rembug RT/RW serta aktif dalam gotong royong warga desa' },
      { id: 'r37_D', text: 'Menggunakan hak pilih dalam pemilihan umum secara bertanggung jawab dan mematuhi aturan hukum' }
    ],
    explanation: 'Contoh perilaku demokratis di keluarga, sekolah, masyarakat, dan berbangsa/bernegara diatur di Buku Siswa Hal. 64-66.'
  },
  {
    id: 38,
    type: 'matching',
    title: 'Menjodohkan: Lagu Nasional/Patriotik dan Pesan Kebangsaannya',
    category: 'Pancasila dalam Tindakan',
    cognitiveLevel: 'C4-C5 Menjodohkan',
    stimulus: `Lagu bertema Garuda dan Pancasila menumbuhkan nasionalisme, sportivitas, dan kebanggaan berbangsa (Buku Siswa Bab 1 Hal. 17-20).`,
    question: `Pasangkan judul lagu di sebelah kiri dengan pencipta/musisi dan karakteristiknya di sebelah kanan!`,
    instruction: `Pilih pencipta dan nuansa lagu yang tepat:`,
    pairs: [
      { id: 'p38_1', leftText: 'Garuda di Dadaku', correctRightId: 'r38_A' },
      { id: 'p38_2', leftText: 'Garuda Pancasila', correctRightId: 'r38_B' },
      { id: 'p38_3', leftText: 'Garuda', correctRightId: 'r38_C' }
    ],
    rightOptions: [
      { id: 'r38_A', text: 'Dipopulerkan oleh grup band Netral; nyanyian pembangkit semangat suporter timnas di stadion' },
      { id: 'r38_B', text: 'Lagu nasional ciptaan Prohar Sudharnoto; menegaskan rakyat adil makmur sentosa pribadi bangsaku' },
      { id: 'r38_C', text: 'Dinyanyikan oleh grup band Cokelat; mengusung pesan darah dan cinta bersatulah merah putih berkibar' }
    ],
    explanation: 'Sesuai Aktivitas 1.8, 1.9, dan 1.10 di Buku Siswa halaman 18-20.'
  },
  {
    id: 39,
    type: 'matching',
    title: 'Menjodohkan: Indikator Demokrasi Affan Gaffar dan Contoh Praktiknya',
    category: 'Demokrasi Berdasarkan UUD 1945',
    cognitiveLevel: 'C4-C5 Menjodohkan',
    stimulus: `Affan Gaffar menguraikan lima indikator pokok untuk menilai apakah suatu negara benar-benar telah mempraktikkan demokrasi secara substantif (Buku Hal. 36).`,
    question: `Jodohkan nama indikator di sebelah kiri dengan pengertian operasionalnya di sebelah kanan!`,
    instruction: `Pasangkan setiap indikator dengan penjelasannya:`,
    pairs: [
      { id: 'p39_1', leftText: 'Akuntabilitas', correctRightId: 'r39_A' },
      { id: 'p39_2', leftText: 'Rotasi Kekuasaan', correctRightId: 'r39_B' },
      { id: 'p39_3', leftText: 'Rekrutmen Terbuka', correctRightId: 'r39_C' },
      { id: 'p39_4', leftText: 'Pemenuhan Hak Dasar', correctRightId: 'r39_D' }
    ],
    rightOptions: [
      { id: 'r39_A', text: 'Pejabat publik yang dipilih rakyat wajib mempertanggungjawabkan ucapan dan kebijakan kepada rakyat' },
      { id: 'r39_B', text: 'Pergantian pemegang kekuasaan berlangsung secara damai, berkala, dan sesuai konstitusi' },
      { id: 'r39_C', text: 'Setiap warga negara memiliki peluang yang setara untuk mencalonkan diri menduduki jabatan publik' },
      { id: 'r39_D', text: 'Warga negara bebas menikmati hak berpendapat, berserikat, berkumpul, dan pers yang merdeka' }
    ],
    explanation: 'Definisi kelima indikator demokrasi Affan Gaffar dimuat pada Buku Hal. 36.'
  },
  {
    id: 40,
    type: 'matching',
    title: 'Menjodohkan: Dampak Amandemen UUD 1945 bagi Ketatanegaraan RI',
    category: 'Perubahan UUD NRI Tahun 1945',
    cognitiveLevel: 'C4-C5 Menjodohkan',
    stimulus: `Amandemen UUD NRI Tahun 1945 menghasilkan 6 dampak besar dalam tatanan ketatanegaraan Indonesia sebagaimana dijelaskan pada Buku Siswa Hal. 48.`,
    question: `Pasangkan aspek perubahan ketatanegaraan di sebelah kiri dengan penjelasannya di sebelah kanan!`,
    instruction: `Pilih penjelasan dampak amandemen yang tepat:`,
    pairs: [
      { id: 'p40_1', leftText: 'Rule of Law', correctRightId: 'r40_A' },
      { id: 'p40_2', leftText: 'Checks and Balances', correctRightId: 'r40_B' },
      { id: 'p40_3', leftText: 'Penghapusan Lembaga Tertinggi', correctRightId: 'r40_C' },
      { id: 'p40_4', leftText: 'Kedaulatan Objektif', correctRightId: 'r40_D' }
    ],
    rightOptions: [
      { id: 'r40_A', text: 'Negara hukum menjadi panglima tertinggi (Pasal 1 ayat 3); semua warga negara tunduk pada hukum' },
      { id: 'r40_B', text: 'Mekanisme saling mengawasi dan mengimbangi antarlembaga negara (eksekutif, legislatif, yudikatif)' },
      { id: 'r40_C', text: 'MPR tidak lagi menjadi lembaga tertinggi negara; hubungan antarlembaga setara sesuai fungsinya' },
      { id: 'r40_D', text: 'Kedaulatan dilakukan menurut UUD, bukan lagi di tangan subjek tunggal parlemen/MPR' }
    ],
    explanation: 'Dampak amandemen UUD 1945 tertera di Buku Siswa Halaman 48 poin 1 s.d. 6.'
  }
];

export const CLASS_OPTIONS = [
  'XI NKPI 1',
  'XI NKPI 2',
  'XI TJKT 1',
  'XI TJKT 2',
  'XI TJKT 3',
  'XI TJKT 4',
  'XI TAV',
  'XI TEI',
  'XI Busana 1',
  'XI Busana 2'
];

export const SPREADSHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycby48WE1aBPKMSt8osR-kJAhMOY_S58fvfHKeEgqdj5Re36I4D2Vsle00RQDDMUBa5O2/exec';

/**
 * Mengacak urutan opsi pilihan ganda (A, B, C, D, E) untuk setiap butir soal
 * dan menyesuaikan kunci jawaban (correctAnswer) ke opsi baru yang sesuai.
 */
export function shuffleSingleChoiceOptions(questions: Question[]): Question[] {
  return questions.map((q) => {
    if (q.type === 'single_c4_c5') {
      const singleQ = q as SingleChoiceQuestion;
      const originalOptions = singleQ.options;
      const correctOption = originalOptions.find((o) => o.key === singleQ.correctAnswer);
      const correctText = correctOption ? correctOption.text : '';

      // Fisher-Yates shuffle
      const shuffled = [...originalOptions];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const keys: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
      let newCorrectKey: 'A' | 'B' | 'C' | 'D' | 'E' = 'A';

      const reindexedOptions = shuffled.map((item, idx) => {
        const key = keys[idx];
        if (item.text === correctText) {
          newCorrectKey = key;
        }
        return {
          key,
          text: item.text,
        };
      });

      return {
        ...singleQ,
        options: reindexedOptions,
        correctAnswer: newCorrectKey,
      };
    }

    if (q.type === 'matching') {
      const matchingQ = q as MatchingQuestion;
      const shuffledRight = [...matchingQ.rightOptions];
      for (let i = shuffledRight.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledRight[i], shuffledRight[j]] = [shuffledRight[j], shuffledRight[i]];
      }
      return {
        ...matchingQ,
        rightOptions: shuffledRight,
      };
    }

    return q;
  });
}

