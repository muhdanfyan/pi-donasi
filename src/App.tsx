import { useState } from 'react';
import { 
  Heart, Sparkles, ShieldCheck, Users, Check, Copy, ArrowRight, 
  ExternalLink, MessageCircle, X, HelpCircle, BookOpen, Laptop, 
  Building, Zap, Clock, ThumbsUp, ChevronRight
} from 'lucide-react';

interface Campaign {
  id: number;
  title: string;
  category: string;
  target: number;
  collected: number;
  donorsCount: number;
  daysLeft: number;
  image: string;
  desc: string;
}

export default function App() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [isAnon, setIsAnon] = useState<boolean>(false);
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [donorPrayer, setDonorPrayer] = useState<string>('');
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const campaigns: Campaign[] = [
    {
      id: 1,
      title: "Sedekah Makan & Asrama Santri Dhuafa",
      category: "Konsumsi & Asrama",
      target: 50000000,
      collected: 36500000,
      donorsCount: 142,
      daysLeft: 18,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
      desc: "Menjamin asupan makanan bernutrisi dan kenyamanan tempat tinggal bagi 25 santri mukim penghafal Al-Qur'an selama masa pendidikan intensif."
    },
    {
      id: 2,
      title: "Wakaf PC Workstation & Server Lab",
      category: "Sarana Belajar IT",
      target: 40000000,
      collected: 23200000,
      donorsCount: 88,
      daysLeft: 24,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
      desc: "Pengadaan komputer spesifikasi tinggi (RAM 16GB, SSD NVMe, dual display) untuk santri berlatih coding, kompilasi software, dan arsitektur AI."
    },
    {
      id: 3,
      title: "Wakaf Mushaf Al-Qur'an & Kitab Diniyah",
      category: "Tahfidz & Kitab",
      target: 15000000,
      collected: 12600000,
      donorsCount: 64,
      daysLeft: 12,
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&auto=format&fit=crop&q=80",
      desc: "Penyediaan Mushaf Madinah tajwid warna dan kitab-kitab adab penuntut ilmu untuk setiap santri baru angkatan 2026."
    },
    {
      id: 4,
      title: "Operasional Listrik & Internet Fiber Optik",
      category: "Infrastruktur",
      target: 20000000,
      collected: 13000000,
      donorsCount: 51,
      daysLeft: 30,
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80",
      desc: "Memastikan kelancaran akses internet bandwidth simetris dan stabilitas daya listrik lab komputer selama proses pembelajaran online 24 jam."
    }
  ];

  const prayers = [
    { name: "Hamba Allah", amount: "Rp 500.000", time: "2 jam lalu", text: "Semoga santri-santri Pondok Informatika menjadi ulama dan teknolog yang amanah, membela agama dan bangsa." },
    { name: "dr. Muhammad Firdaus", amount: "Rp 1.000.000", time: "5 jam lalu", text: "Semoga berkah untuk segenap pengurus dan santri. Titip doa agar anak-anak kami diberi taufik menghafal Qur'an." },
    { name: "Keluarga Ibu Siti", amount: "Rp 250.000", time: "1 hari lalu", text: "Sedekah atas nama orang tua almarhum. Semoga menjadi amal jariyah yang terus mengalir." },
    { name: "Ahmad Fauzan (Alumni)", amount: "Rp 750.000", time: "2 hari lalu", text: "Terima kasih Pondok Informatika yang telah mendidik saya hingga mandiri berkarir di industri IT. Doa terbaik untuk adik-adik santri." }
  ];

  const presets = [25000, 50000, 100000, 250000, 500000, 1000000];

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const handleCopy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const currentAmount = customAmount ? Number(customAmount.replace(/\D/g, '')) : donationAmount;

  const handleWhatsAppConfirm = () => {
    const finalName = isAnon ? 'Hamba Allah' : (donorName.trim() || 'Hamba Allah');
    const campTitle = selectedCampaign ? selectedCampaign.title : 'Operasional Pendidikan Santri';
    
    let text = `*KONFIRMASI INFAQ / WAKAF PONDOK INFORMATIKA*\n\n`;
    text += `Nama Donatur: ${finalName}\n`;
    text += `No. WhatsApp: ${donorPhone.trim() || '-'}\n`;
    text += `Program: ${campTitle}\n`;
    text += `Nominal: ${formatRupiah(currentAmount)}\n`;
    if (donorPrayer.trim()) {
      text += `Pesan / Doa: "${donorPrayer.trim()}"\n`;
    }
    text += `\nMohon dicek bukti transfer terlampir. Semoga menjadi amal jariyah yang berkah. Aamiin.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/6282293827200?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo Pondok Informatika" className="w-10 h-10 object-contain drop-shadow" />
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white block leading-none">
                Donasi<span className="text-emerald-400">Pondok</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Wakaf &amp; Infaq Santri IT
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="https://profile.pondokinformatika.id"
              className="hidden sm:inline-flex px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              Tentang Pesantren
            </a>
            <button
              onClick={() => setSelectedCampaign(campaigns[0])}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer font-extrabold"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Donasi Sekarang</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HEADER HERO */}
      <header className="pt-32 pb-12 sm:pt-40 sm:pb-16 text-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-emerald-500/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Investasi Akhirat yang Mengalir Tiada Putus
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Bersama Cetak <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">1000 Santri IT &amp; Hafizh Al-Qur'an</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Dukung pendidikan santri yatim dan dhuafa yang belajar 100% gratis di Pondok Informatika. Setiap rupiah Anda mengalir menjadi pahala dari setiap ayat dan baris kode yang mereka tulis.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Amanah &amp; Transparan</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Laporan Penyaluran Berkala</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>100% Beasiswa Santri</span>
            </div>
          </div>
        </div>
      </header>

      {/* CAMPAIGN CARDS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 flex-1">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Program Kebaikan Pilihan</h2>
          <p className="text-xs text-slate-400 mt-1">Pilih program donasi yang ingin Anda dukung hari ini.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((c) => {
            const percent = Math.min(100, Math.round((c.collected / c.target) * 100));
            return (
              <div 
                key={c.id}
                className="rounded-3xl bg-slate-900/90 border border-slate-800/90 overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                    <img 
                      src={c.image} 
                      alt={c.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-slate-800">
                      {c.category}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {c.desc}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-5 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Terkumpul: <strong className="text-white font-extrabold">{formatRupiah(c.collected)}</strong></span>
                        <span className="text-emerald-400 font-black">{percent}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium pt-0.5">
                        <span>Target: {formatRupiah(c.target)}</span>
                        <span>{c.donorsCount} Donatur • Sisa {c.daysLeft} hari</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0">
                  <button
                    onClick={() => setSelectedCampaign(c)}
                    className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Infaq Sekarang</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* DINDING DOA */}
        <section className="mt-20 pt-16 border-t border-slate-900">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Dukungan &amp; Munajat</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">Dinding Doa Para Donatur</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prayers.map((p, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-white">{p.name}</span>
                  <span className="text-[10px] text-slate-500">{p.time}</span>
                </div>
                <div className="text-[11px] font-bold text-emerald-400 mb-2">
                  Berdonasi sebesar {p.amount}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{p.text}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* DONATION MODAL */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl my-8">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Formulir Infaq &amp; Wakaf</span>
                <h3 className="text-sm font-bold text-white line-clamp-1">{selectedCampaign.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedCampaign(null)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Preset Nominal */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">Pilih Nominal Donasi</label>
                <div className="grid grid-cols-3 gap-2">
                  {presets.map((nom) => (
                    <button
                      key={nom}
                      onClick={() => {
                        setDonationAmount(nom);
                        setCustomAmount('');
                      }}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        donationAmount === nom && !customAmount
                          ? 'bg-emerald-500 text-slate-950 shadow-md'
                          : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {formatRupiah(nom)}
                    </button>
                  ))}
                </div>

                <div className="mt-2.5">
                  <input
                    type="text"
                    placeholder="Atau masukkan nominal lainnya (Rp)..."
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Data Donatur */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-300">Nama Donatur</label>
                    <label className="flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isAnon} 
                        onChange={(e) => setIsAnon(e.target.checked)} 
                        className="rounded accent-emerald-500"
                      />
                      <span>Sebagai Hamba Allah</span>
                    </label>
                  </div>
                  {!isAnon && (
                    <input
                      type="text"
                      placeholder="Nama lengkap Anda..."
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Nomor WhatsApp (Untuk Bukti Laporan)</label>
                  <input
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Pesan / Doa Kebaikan (Opsional)</label>
                  <textarea
                    rows={2}
                    placeholder="Tuliskan doa atau harapan untuk santri..."
                    value={donorPrayer}
                    onChange={(e) => setDonorPrayer(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Rekening Transfer Resmi */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rekening Resmi Yayasan</span>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Bank Syariah Indonesia (BSI)</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">7171 888 999</span>
                    <span className="text-[10px] text-slate-400 block">a.n. Yayasan Pondok Informatika</span>
                  </div>
                  <button
                    onClick={() => handleCopy('7171888999', 'BSI')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedBank === 'BSI' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBank === 'BSI' ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div>
                    <span className="text-xs font-bold text-white block">Bank Mandiri</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">152 00 1888 9991</span>
                    <span className="text-[10px] text-slate-400 block">a.n. Yayasan Pondok Informatika</span>
                  </div>
                  <button
                    onClick={() => handleCopy('1520018889991', 'Mandiri')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedBank === 'Mandiri' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBank === 'Mandiri' ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleWhatsAppConfirm}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konfirmasi Infaq via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Donasi &amp; Wakaf — Yayasan Pondok Informatika. Amanah &amp; Akuntabel.</p>
      </footer>
    </div>
  );
}
