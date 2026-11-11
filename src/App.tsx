import { useState } from 'react';
import { 
  HeartHandshake, Copy, Check, 
  ExternalLink, ArrowRight, ShieldCheck, 
  Sparkles, MessageSquare, Send
} from 'lucide-react';

interface Campaign {
  id: number;
  title: string;
  category: string;
  target: number;
  collected: number;
  donaturCount: number;
  desc: string;
  image: string;
}

export default function App() {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCampaignId, setSelectedCampaignId] = useState<number>(1);
  const [donaturName, setDonaturName] = useState('');
  const [donaturPrayer, setDonaturPrayer] = useState('');
  const [donorFeed, setDonorFeed] = useState([
    { name: "Hamba Allah", amount: 500000, time: "10 menit lalu", prayer: "Semoga para santri istiqomah menghafal Al-Qur'an dan menjadi programmer hebat untuk umat." },
    { name: "Keluarga Ahmad Ridwan", amount: 1000000, time: "1 jam lalu", prayer: "Wakaf untuk pengadaan PC workstation santri, berkah dunia akhirat." },
    { name: "Muh. Fajar", amount: 250000, time: "3 jam lalu", prayer: "Bismillah berkah melimpah untuk seluruh ustadz dan santri pondok." },
    { name: "Hamba Allah", amount: 150000, time: "5 jam lalu", prayer: "Jazakumullahu khair atas dedikasi membina generasi muda Islam." }
  ]);

  const campaigns: Campaign[] = [
    {
      id: 1,
      title: "Beasiswa Penuh Santri IT & Tahfidz Dhuafa",
      category: "Pendidikan & Tahfidz",
      target: 180000000,
      collected: 124500000,
      donaturCount: 312,
      desc: "Menjamin biaya hidup asrama, konsumsi bergizi, modul kurikulum, dan pengawasan tahfidz intensif santri dhuafa selama 1 tahun masa pendidikan.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Wakaf Pengadaan Workstation PC Lab Santri",
      category: "Sarana Belajar",
      target: 75000000,
      collected: 52000000,
      donaturCount: 148,
      desc: "Pengadaan unit workstation PC dual-monitor, kursi ergonomis, dan akses internet dedicated fiber-optic untuk menunjang praktik coding 12 jam/hari.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Pembangunan Ruang Asrama & Halaqah Qur'an",
      category: "Infrastruktur Asrama",
      target: 250000000,
      collected: 168000000,
      donaturCount: 420,
      desc: "Peluasan ruang mukim santri baru dan renovasi aula halaqah setoran hafalan Al-Qur'an agar semakin tertib, nyaman, dan higienis.",
      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      title: "Operasional Server Sandbox & Cloud DevOps",
      category: "Teknologi & Cloud",
      target: 35000000,
      collected: 28900000,
      donaturCount: 89,
      desc: "Sewa infrastruktur server Linux VPS, domain, lisensi developer tools, dan cloud computing untuk pengujian proyek nyata santri.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80"
    }
  ];

  const banks = [
    {
      bank: "Bank Syariah Indonesia (BSI)",
      accountNumber: "7214555890",
      accountName: "Yayasan Pondok Informatika Al-Bashirah",
      code: "451"
    },
    {
      bank: "Bank Mandiri",
      accountNumber: "1520019882200",
      accountName: "Pondok Informatika",
      code: "008"
    }
  ];

  const presetAmounts = [50000, 100000, 250000, 500000, 1000000, 2500000];

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const copyToClipboard = (text: string, bankKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankKey);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const currentDonationValue = customAmount ? Number(customAmount) : selectedAmount;
  const activeCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];

  const handleKirimDoa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donaturPrayer.trim()) return;
    const newEntry = {
      name: donaturName.trim() || "Hamba Allah",
      amount: currentDonationValue,
      time: "Baru saja",
      prayer: donaturPrayer.trim()
    };
    setDonorFeed([newEntry, ...donorFeed]);
    setDonaturPrayer('');
  };

  const handleConfirmWhatsApp = () => {
    const nameStr = donaturName.trim() || 'Hamba Allah';
    const campaignTitle = activeCampaign.title;
    const amountStr = formatRupiah(currentDonationValue);
    const doaStr = donaturPrayer.trim() ? `\nDoa/Harapan: "${donaturPrayer.trim()}"` : '';

    const msg = `*KONFIRMASI INFAQ/WAKAF PONDOK INFORMATIKA*\n` +
      `Nama: ${nameStr}\n` +
      `Program: ${campaignTitle}\n` +
      `Nominal: ${amountStr}` +
      doaStr + `\n\n` +
      `Bismillah, saya telah menyalurkan donasi. Mohon berkenan didoakan oleh para santri dan asatidzah. Terima kasih!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/6283134086899?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo Pondok Informatika" className="w-10 h-10 object-contain drop-shadow-sm" />
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-950 block leading-none">
                Donasi<span className="text-emerald-600">Santri</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                Wakaf &amp; Infaq Pendidikan Umat
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="https://profile.pondokinformatika.id"
              className="hidden sm:inline-flex px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Profil Pondok
            </a>
            <a
              href="#donasi-sekarang"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Tunaikan Donasi</span>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-36 pb-16 sm:pt-44 sm:pb-20 text-center relative bg-gradient-to-b from-emerald-50/60 via-white to-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-bold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Pahala Jariyah yang Terus Mengalir di Setiap Baris Kode &amp; Ayat Al-Qur'an
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
            Sedekah &amp; Wakaf Terbaik: <span className="text-emerald-600">Mencetak Penghafal Qur'an</span> Ahli Teknologi
          </h1>

          <p className="mt-6 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            100% donasi Anda disalurkan secara amanah untuk membiayai beasiswa santri dhuafa, infrastruktur lab komputer, asrama, dan operasional dakwah digital.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#donasi-sekarang"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>Salurkan Donasi Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#rekening"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Copy className="w-4 h-4 text-emerald-600" />
              <span>No. Rekening Resmi Yayasan</span>
            </a>
          </div>
        </div>
      </header>

      {/* CAMPAIGNS GRID */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Program Pilihan</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 mt-1">Campaign Infaq &amp; Wakaf</h2>
            <p className="text-sm text-slate-600 mt-3">
              Pilih program dakwah dan sarana pendidikan yang ingin Anda berkahi hari ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaigns.map((c) => {
              const percent = Math.min(100, Math.round((c.collected / c.target) * 100));
              const isSelected = selectedCampaignId === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCampaignId(c.id)}
                  className={`rounded-3xl bg-white border overflow-hidden transition-all cursor-pointer flex flex-col ${
                    isSelected 
                      ? 'border-emerald-500 shadow-xl ring-2 ring-emerald-500' 
                      : 'border-slate-200 shadow-sm hover:border-slate-300'
                  }`}
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white/95 text-slate-800 shadow-sm border border-slate-200">
                      {c.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-sm font-bold text-slate-950 mb-2 line-clamp-2">
                      {c.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {c.desc}
                    </p>

                    <div className="mt-auto space-y-2">
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[11px]">
                        <div>
                          <span className="text-slate-400 block">Terkumpul:</span>
                          <span className="font-extrabold text-slate-950">{formatRupiah(c.collected)}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 block">Target:</span>
                          <span className="font-semibold text-slate-600">{formatRupiah(c.target)}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{c.donaturCount} Donatur</span>
                        <span className="font-black text-emerald-600">{percent}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DONATION FORM & BANK ACCOUNTS */}
      <section id="donasi-sekarang" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                Langkah Mudah
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 mb-2">
                Pilih Nominal Infaq / Wakaf
              </h2>
              <p className="text-xs text-slate-600 mb-6">
                Untuk program: <strong className="text-slate-900">{activeCampaign.title}</strong>
              </p>

              {/* Preset buttons */}
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {presetAmounts.map((amt) => {
                  const active = selectedAmount === amt && !customAmount;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-3 px-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer shadow-sm ${
                        active 
                          ? 'bg-emerald-600 text-white shadow-emerald-600/20' 
                          : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
                      }`}
                    >
                      {formatRupiah(amt)}
                    </button>
                  );
                })}
              </div>

              {/* Custom amount */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Atau Nominal Lainnya (Rp):</label>
                <input
                  type="number"
                  placeholder="Contoh: 500000"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 shadow-sm"
                />
              </div>

              {/* Donatur name & prayer */}
              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Nama Donatur (Boleh kosongkan / Hamba Allah)"
                  value={donaturName}
                  onChange={(e) => setDonaturName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 shadow-sm"
                />
                <textarea
                  rows={3}
                  placeholder="Tuliskan doa atau niat baik Anda untuk para santri..."
                  value={donaturPrayer}
                  onChange={(e) => setDonaturPrayer(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 shadow-sm"
                />
              </div>

              <button
                onClick={handleConfirmWhatsApp}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <HeartHandshake className="w-5 h-5" />
                <span>Salurkan {formatRupiah(currentDonationValue)} via WhatsApp</span>
              </button>
            </div>

            {/* Rekening Info */}
            <div id="rekening" className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-950">Rekening Resmi Yayasan</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Seluruh dana disalurkan langsung ke rekening resmi lembaga berizin dan dapat diverifikasi.
                </p>

                <div className="space-y-4">
                  {banks.map((b) => (
                    <div key={b.bank} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800">{b.bank}</span>
                        <button
                          onClick={() => copyToClipboard(b.accountNumber, b.bank)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white text-[11px] font-bold flex items-center gap-1 transition-all"
                        >
                          {copiedBank === b.bank ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedBank === b.bank ? 'Tersalin' : 'Salin Rek'}</span>
                        </button>
                      </div>
                      <div className="text-lg font-black text-slate-950 tracking-wider">
                        {b.accountNumber}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">a.n. {b.accountName}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DINDING DOA */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Solidaritas Umat</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">Dinding Doa Para Donatur</h2>
          </div>

          <div className="space-y-4">
            {donorFeed.map((f, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-950">{f.name}</span>
                    <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {formatRupiah(f.amount)}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{f.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{f.prayer}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 py-10 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Donasi Santri — Yayasan Pondok Informatika Al-Bashirah.</p>
          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <a href="https://pondokinformatika.id" className="hover:text-slate-900">Portal Utama</a>
            <a href="https://profile.pondokinformatika.id" className="hover:text-slate-900">Profile</a>
            <a href="https://katalog.pondokinformatika.id" className="hover:text-slate-900">Katalog</a>
            <a href="https://produk.pondokinformatika.id" className="hover:text-slate-900">Produk</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
