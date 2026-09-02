import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowDownLeft,
  ArrowUpLeft,
  BarChart3,
  Bell,
  Car,
  Check,
  ChevronLeft,
  CircleHelp,
  Cloud,
  Coffee,
  CreditCard,
  Droplets,
  Edit3,
  FileText,
  Filter,
  Gift,
  Home as HomeIcon,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Moon,
  Plus,
  Receipt,
  Repeat2,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  UserRound,
  Utensils,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

type Tab = "الرئيسية" | "المصاريف" | "الأهداف" | "التقارير" | "المزيد";

type Transaction = {
  id: number;
  title: string;
  category: string;
  person: string;
  amount: number;
  time: string;
  icon: typeof Receipt;
  iconClass: string;
};

const navItems: { label: Tab; icon: typeof LayoutDashboard }[] = [
  { label: "الرئيسية", icon: LayoutDashboard },
  { label: "المصاريف", icon: Receipt },
  { label: "الأهداف", icon: Target },
  { label: "التقارير", icon: BarChart3 },
  { label: "المزيد", icon: MoreHorizontal },
];

const categories = [
  { label: "البيت", value: "١٢٬٤٥٠", total: 17000, spent: 12450, icon: HomeIcon, color: "#0E6E5C" },
  { label: "الأولاد", value: "٦٬٢٨٠", total: 9000, spent: 6280, icon: UserRound, color: "#8B6F47" },
  { label: "العربية", value: "٣٬١٢٠", total: 5000, spent: 3120, icon: Car, color: "#C2542E" },
  { label: "شخصي", value: "١٬٨٩٠", total: 3500, spent: 1890, icon: Coffee, color: "#7B6D62" },
];

const initialTransactions: Transaction[] = [
  { id: 1, title: "مشتريات البيت", category: "أكل ومشتريات", person: "البيت", amount: 860, time: "منذ ٢ ساعة", icon: ShoppingBasket, iconClass: "green" },
  { id: 2, title: "بنزين العربية", category: "مواصلات", person: "أحمد", amount: 520, time: "أمس، ٨:٣٠ م", icon: Car, iconClass: "orange" },
  { id: 3, title: "اشتراك الإنترنت", category: "فواتير", person: "البيت", amount: 450, time: "أمس، ١٠:١٥ ص", icon: Zap, iconClass: "brown" },
  { id: 4, title: "صيدلية", category: "صحة وأدوية", person: "سارة", amount: 280, time: "الأحد، ٦:٤٠ م", icon: ShieldCheck, iconClass: "blue" },
];

const formatEGP = (amount: number) => `${amount.toLocaleString("ar-EG")} ج.م`;

function LogoMark() {
  return (
    <div className="logo-mark" aria-label="بيتي">
      <WalletCards size={21} strokeWidth={2.2} />
    </div>
  );
}

function SectionHeading({ eyebrow, title, action, onAction }: { eyebrow?: string; title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action && <button className="text-button" onClick={onAction}>{action}<ChevronLeft size={16} /></button>}
    </div>
  );
}

function Overview({ onAdd, transactions, onNavigate }: { onAdd: () => void; transactions: Transaction[]; onNavigate: (tab: Tab) => void }) {
  return (
    <>
      <section className="hero-card animate-in">
        <div className="hero-grid" />
        <div className="hero-copy">
          <div className="hero-topline"><span className="live-dot" /> ملخص شهر سبتمبر <span className="period-pill">١ سبتمبر — ٣٠ سبتمبر</span></div>
          <p className="hero-label">المتبقي حتى الآن</p>
          <h1>١٨٬٢٥٠ <small>ج.م</small></h1>
          <p className="hero-meta"><TrendingUp size={16} /> أقل من متوسط صرفك بـ <strong>١٢٪</strong> هذا الشهر</p>
        </div>
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-actions">
          <button className="hero-action-button" onClick={onAdd}><Plus size={18} /> إضافة مصروف</button>
          <button className="hero-icon-button" aria-label="تعديل الملخص" onClick={() => toast("يمكنك تعديل بداية الشهر من الإعدادات") }><Edit3 size={17} /></button>
        </div>
        <div className="hero-footer"><span>إجمالي الدخل <strong>٣٥٬٠٠٠ ج.م</strong></span><span className="hero-divider" /><span>المصروف <strong>١٦٬٧٥٠ ج.م</strong></span></div>
      </section>

      <div className="metric-grid animate-in delay-1">
        <button className="metric-card" onClick={() => onNavigate("المصاريف")}>
          <div className="metric-icon green-soft"><ArrowUpLeft size={18} /></div>
          <span className="metric-label">المصروف هذا الشهر</span>
          <strong>١٦٬٧٥٠ <small>ج.م</small></strong>
          <span className="metric-note positive">↓ ٨٪ عن الشهر السابق</span>
        </button>
        <button className="metric-card" onClick={() => onNavigate("الرئيسية")}>
          <div className="metric-icon brown-soft"><Target size={18} /></div>
          <span className="metric-label">الادخار المخطط</span>
          <strong>٥٬٠٠٠ <small>ج.م</small></strong>
          <span className="metric-note neutral">٦٨٪ من الهدف الشهري</span>
        </button>
        <button className="metric-card alert-card" onClick={() => onNavigate("المصاريف")}>
          <div className="metric-icon red-soft"><Bell size={18} /></div>
          <span className="metric-label">فواتير قادمة</span>
          <strong>٢٬٣٨٠ <small>ج.م</small></strong>
          <span className="metric-note warning">٣ فواتير خلال ٧ أيام</span>
        </button>
      </div>

      <div className="content-grid animate-in delay-2">
        <section className="panel spending-panel">
          <SectionHeading eyebrow="نظرة سريعة" title="صرف الشهر" action="التفاصيل" onAction={() => onNavigate("التقارير")} />
          <div className="chart-header"><div><span className="chart-value">١٦٬٧٥٠ <small>ج.م</small></span><span className="chart-change">+١٢٪ <ArrowUpLeft size={13} /></span></div><span className="muted">آخر ٧ أيام</span></div>
          <div className="chart-wrap" aria-label="رسم بياني لحركة المصروفات">
            <div className="chart-y-labels"><span>٥ك</span><span>٣ك</span><span>١ك</span><span>٠</span></div>
            <svg className="area-chart" viewBox="0 0 570 195" preserveAspectRatio="none" role="img">
              <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#0E6E5C" stopOpacity=".22" /><stop offset="100%" stopColor="#0E6E5C" stopOpacity="0" /></linearGradient></defs>
              <path d="M0,150 C25,144 37,126 62,134 S93,152 116,121 S144,117 171,129 S198,119 218,90 S253,112 274,104 S308,91 330,98 S354,77 377,86 S407,104 426,78 S454,69 472,72 S502,43 523,58 S548,32 570,25 L570,195 L0,195 Z" fill="url(#chartFill)" />
              <path d="M0,150 C25,144 37,126 62,134 S93,152 116,121 S144,117 171,129 S198,119 218,90 S253,112 274,104 S308,91 330,98 S354,77 377,86 S407,104 426,78 S454,69 472,72 S502,43 523,58 S548,32 570,25" fill="none" stroke="#0E6E5C" strokeWidth="3" strokeLinecap="round" />
              <circle cx="523" cy="58" r="5" fill="#FAF6F0" stroke="#0E6E5C" strokeWidth="3" />
            </svg>
            <div className="chart-x-labels"><span>السبت</span><span>الأحد</span><span>الإثنين</span><span>الثلاثاء</span><span>الأربعاء</span><span>الخميس</span><span>اليوم</span></div>
          </div>
          <div className="chart-legend"><span><i className="legend-dot teal" /> هذا الشهر</span><span><i className="legend-line" /> متوسطك الشهري</span></div>
        </section>

        <section className="panel budget-panel">
          <SectionHeading eyebrow="التحكم" title="حدود الفئات" action="إدارة الحدود" onAction={() => toast("إدارة الحدود ستكون متاحة في النسخة التالية")} />
          <div className="category-list">
            {categories.map((category) => {
              const Icon = category.icon;
              const percent = Math.round((category.spent / category.total) * 100);
              return <div className="category-row" key={category.label}>
                <div className="category-icon" style={{ backgroundColor: `${category.color}16`, color: category.color }}><Icon size={17} /></div>
                <div className="category-info"><div className="category-line"><span>{category.label}</span><strong>{category.value} <small>/ {category.total.toLocaleString("ar-EG")}</small></strong></div><div className="progress-track"><span style={{ width: `${percent}%`, backgroundColor: category.color }} /></div></div>
                <span className="category-percent">{percent}%</span>
              </div>;
            })}
          </div>
          <div className="tip-box"><Sparkles size={17} /><span>متبقي لك <strong>٥٬٧٥٠ ج.م</strong> في حدودك هذا الشهر</span></div>
        </section>
      </div>

      <div className="content-grid lower-grid animate-in delay-3">
        <section className="panel transactions-panel">
          <SectionHeading eyebrow="آخر ما تم تسجيله" title="العمليات الأخيرة" action="عرض الكل" onAction={() => onNavigate("المصاريف")} />
          <div className="transaction-list">{transactions.slice(0, 4).map((transaction) => <TransactionRow key={transaction.id} transaction={transaction} />)}</div>
        </section>
        <section className="panel quick-panel">
          <SectionHeading eyebrow="تسجيل سريع" title="إجراءات شائعة" />
          <div className="quick-actions">
            <button onClick={onAdd}><span className="quick-icon teal-bg"><Plus size={19} /></span><span>مصروف جديد</span><ChevronLeft size={15} /></button>
            <button onClick={() => onNavigate("الرئيسية")}><span className="quick-icon gold-bg"><ArrowDownLeft size={19} /></span><span>تسجيل دخل</span><ChevronLeft size={15} /></button>
            <button onClick={() => toast("تم تفعيل تذكير الفواتير") }><span className="quick-icon brick-bg"><Bell size={19} /></span><span>تذكير فاتورة</span><ChevronLeft size={15} /></button>
            <button onClick={() => onNavigate("الأهداف")}><span className="quick-icon ink-bg"><Target size={19} /></span><span>هدف جديد</span><ChevronLeft size={15} /></button>
          </div>
        </section>
      </div>
    </>
  );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const Icon = transaction.icon;
  return <div className="transaction-row"><div className={`transaction-icon ${transaction.iconClass}`}><Icon size={18} /></div><div className="transaction-copy"><strong>{transaction.title}</strong><span>{transaction.category} <i /> {transaction.person}</span></div><div className="transaction-amount"><strong>− {formatEGP(transaction.amount)}</strong><span>{transaction.time}</span></div><button className="row-more" aria-label={`خيارات ${transaction.title}`} onClick={() => toast("خيارات العملية ستظهر هنا")}><MoreHorizontal size={18} /></button></div>;
}

function ExpensesView({ transactions, onAdd }: { transactions: Transaction[]; onAdd: () => void }) {
  return <div className="view animate-in"><div className="view-title-row"><div><span className="eyebrow">كل ما يخص الصرف</span><h1>المصاريف</h1><p>تابع مصروفات البيت وكل فرد في العائلة بسهولة.</p></div><button className="primary-button" onClick={onAdd}><Plus size={18} /> مصروف جديد</button></div><div className="filter-bar"><div className="search-box"><Search size={17} /><input placeholder="ابحث في العمليات..." /></div><button className="filter-button"><Filter size={16} /> هذا الشهر <ChevronLeft size={14} /></button><button className="filter-button"><UserRound size={16} /> كل الأفراد <ChevronLeft size={14} /></button></div><div className="expense-summary"><div><span>إجمالي المصاريف</span><strong>١٦٬٧٥٠ ج.م</strong><small className="positive">↓ ٨٪ عن الشهر السابق</small></div><div><span>عدد العمليات</span><strong>٢٤</strong><small>في ١١ فئة</small></div><div><span>أعلى فئة</span><strong>البيت</strong><small>١٢٬٤٥٠ ج.م</small></div></div><section className="panel full-panel"><SectionHeading title="كل العمليات" action="تصدير التقرير" onAction={() => toast("جاري تجهيز ملف التقرير...")} /><div className="transaction-list">{transactions.map((transaction) => <TransactionRow key={transaction.id} transaction={transaction} />)}<div className="empty-note"><Repeat2 size={17} /> المصاريف المتكررة القادمة تظهر هنا قبل موعدها</div></div></section></div>;
}

function GoalsView({ onAdd }: { onAdd: () => void }) {
  const goals = [{ title: "مقدم شقة جديدة", current: 72000, target: 150000, icon: HomeIcon, color: "teal" }, { title: "رحلة العائلة", current: 18500, target: 30000, icon: Gift, color: "gold" }, { title: "استثمار شهري", current: 3500, target: 5000, icon: TrendingUp, color: "brick" }];
  return <div className="view animate-in"><div className="view-title-row"><div><span className="eyebrow">خططك بوضوح</span><h1>الأهداف المالية</h1><p>كل جنيه بتوفره بيقربك خطوة من اللي نفسك فيه.</p></div><button className="primary-button" onClick={onAdd}><Plus size={18} /> هدف جديد</button></div><div className="goal-highlight"><div className="goal-highlight-icon"><Target size={24} /></div><div><span>إجمالي ما تم توفيره</span><strong>٩٤٬٠٠٠ ج.م</strong><small>في ٣ أهداف نشطة</small></div><div className="goal-ring"><span>٦٣٪</span></div></div><div className="goal-grid">{goals.map((goal) => { const Icon = goal.icon; const pct = Math.round(goal.current / goal.target * 100); return <div className="panel goal-card" key={goal.title}><div className={`goal-icon ${goal.color}`}><Icon size={19} /></div><div className="goal-card-top"><div><h3>{goal.title}</h3><span>الهدف في ديسمبر ٢٠٢٦</span></div><button className="row-more" onClick={() => toast("تعديل الهدف") }><MoreHorizontal size={18} /></button></div><strong className="goal-amount">{goal.current.toLocaleString("ar-EG")} <small>/ {goal.target.toLocaleString("ar-EG")} ج.م</small></strong><div className="progress-track goal-progress"><span className={goal.color} style={{ width: `${pct}%` }} /></div><div className="goal-meta"><span>{pct}% مكتمل</span><span>متبقي {formatEGP(goal.target - goal.current)}</span></div></div> })}</div></div>;
}

function ReportsView() {
  const reportRows = [{ label: "البيت", value: "١٢٬٤٥٠", percent: 74, color: "#0E6E5C", icon: HomeIcon }, { label: "الأولاد", value: "٦٬٢٨٠", percent: 38, color: "#8B6F47", icon: UserRound }, { label: "العربية", value: "٣٬١٢٠", percent: 19, color: "#C2542E", icon: Car }, { label: "صحي وشخصي", value: "١٬٨٩٠", percent: 11, color: "#66736D", icon: ShieldCheck }];
  return <div className="view animate-in"><div className="view-title-row"><div><span className="eyebrow">الصورة الأكبر</span><h1>التقارير والتحليل</h1><p>افهم عادات الصرف وخد قرارات أهدى لبيتك.</p></div><button className="filter-button report-period">سبتمبر ٢٠٢٦ <ChevronLeft size={14} /></button></div><div className="report-grid"><section className="panel report-chart-panel"><SectionHeading title="توزيع المصروفات" /><div className="donut-area"><div className="donut-chart"><div className="donut-center"><strong>١٦٬٧٥٠</strong><span>ج.م مصروف</span></div></div><div className="donut-legend">{reportRows.map((row) => { const Icon = row.icon; return <div key={row.label}><span className="legend-label"><i style={{ backgroundColor: row.color }} /><Icon size={15} />{row.label}</span><strong>{row.percent}%</strong></div> })}</div></div></section><section className="panel insights-panel"><SectionHeading eyebrow="ملاحظات ذكية" title="الصرف عندك بيقول إيه؟" /><div className="insight-item"><div className="insight-number">٠١</div><div><strong>أيام الأحد هي الأعلى صرفاً</strong><p>بتصرف في المتوسط ١٬١٥٠ ج.م، أغلبها أكل وخروجات.</p></div></div><div className="insight-item"><div className="insight-number">٠٢</div><div><strong>ممتاز في فواتير البيت</strong><p>صرفك أقل من الحد المحدد لفئة الفواتير بـ ١٨٪.</p></div></div><div className="insight-item"><div className="insight-number">٠٣</div><div><strong>اقتربت من هدف الادخار</strong><p>باقي ١٬٥٠٠ ج.م وتوصل لهدفك الشهري.</p></div></div></section></div><section className="panel report-breakdown"><SectionHeading title="مقارنة الفئات" action="مقارنة الشهور" onAction={() => toast("اختار شهرين للمقارنة")} />{reportRows.map((row) => { const Icon = row.icon; return <div className="breakdown-row" key={row.label}><div className="breakdown-label"><span className="category-icon" style={{ backgroundColor: `${row.color}16`, color: row.color }}><Icon size={16} /></span>{row.label}</div><div className="breakdown-bar"><span style={{ width: `${row.percent}%`, backgroundColor: row.color }} /></div><strong>{row.value} ج.م</strong></div> })}</section></div>;
}

function MoreView({ isDark, setIsDark }: { isDark: boolean; setIsDark: (value: boolean) => void }) {
  const settings = [{ label: "أفراد العائلة", note: "أنت · ٤ أفراد", icon: UserRound }, { label: "المصاريف المتكررة", note: "٦ مصاريف نشطة", icon: Repeat2 }, { label: "طرق الدفع", note: "نقدي · بطاقات · تحويل", icon: CreditCard }, { label: "النسخة الاحتياطية", note: "آخر نسخة منذ ٢ ساعة", icon: Cloud }];
  return <div className="view animate-in"><div className="view-title-row"><div><span className="eyebrow">مساحتك الخاصة</span><h1>المزيد والإعدادات</h1><p>ظبط بيتي بالطريقة اللي تناسب بيتك.</p></div><div className="profile-chip"><span>أ</span><div><strong>أحمد محمد</strong><small>رب الأسرة</small></div><ChevronLeft size={15} /></div></div><section className="panel settings-panel"><div className="settings-section-title">إدارة البيت</div>{settings.map((setting) => { const Icon = setting.icon; return <button className="setting-row" key={setting.label} onClick={() => toast(setting.label)}><span className="setting-icon"><Icon size={18} /></span><span className="setting-copy"><strong>{setting.label}</strong><small>{setting.note}</small></span><ChevronLeft size={17} /></button> })}</section><section className="panel settings-panel"><div className="settings-section-title">تفضيلات التطبيق</div><button className="setting-row" onClick={() => setIsDark(!isDark)}><span className="setting-icon"><Moon size={18} /></span><span className="setting-copy"><strong>الوضع الداكن</strong><small>{isDark ? "مفعل حالياً" : "مناسب للعين في الليل"}</small></span><span className={`toggle ${isDark ? "on" : ""}`}><span /></span></button><button className="setting-row" onClick={() => toast("التنبيهات مفعلة للمصاريف والفواتير")}><span className="setting-icon"><Bell size={18} /></span><span className="setting-copy"><strong>التنبيهات</strong><small>تذكير المصاريف والفواتير</small></span><span className="setting-status"><Check size={15} /> مفعلة</span></button></section><div className="backup-card"><div className="backup-icon"><Cloud size={22} /></div><div><strong>بياناتك في أمان</strong><p>نسخة احتياطية تلقائية مشفرة على Google Drive</p></div><button onClick={() => toast.success("تم تحديث النسخة الاحتياطية بنجاح")}>تحديث الآن</button></div></div>;
}

function AddExpenseModal({ onClose, onSave }: { onClose: () => void; onSave: (transaction: Transaction) => void }) {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("البيت");
  const [category, setCategory] = useState("أكل ومشتريات");
  const canSave = Boolean(amount && title);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="expense-modal" role="dialog" aria-modal="true" aria-labelledby="expense-modal-title"><div className="modal-header"><div><span className="eyebrow">تسجيل جديد</span><h2 id="expense-modal-title">إضافة مصروف</h2></div><button className="close-button" onClick={onClose} aria-label="إغلاق"><X size={19} /></button></div><label className="amount-field"><span>المبلغ</span><div><input autoFocus inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" /><strong>ج.م</strong></div></label><label className="form-field"><span>بتدفع في إيه؟</span><div className="input-with-icon"><Receipt size={17} /><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثال: مشتريات البيت" /></div></label><div className="form-row"><label className="form-field"><span>الفئة</span><select value={category} onChange={(e) => setCategory(e.target.value)}><option>أكل ومشتريات</option><option>فواتير</option><option>مواصلات</option><option>صحة وأدوية</option><option>تعليم</option><option>مصاريف شخصية</option><option>أخرى</option></select></label><label className="form-field"><span>يخص مين؟</span><select value={person} onChange={(e) => setPerson(e.target.value)}><option>البيت</option><option>أحمد</option><option>سارة</option><option>الأولاد</option></select></label></div><label className="repeat-check"><input type="checkbox" /><span className="checkmark"><Check size={13} /></span><span><strong>مصروف متكرر</strong><small>يتكرر كل شهر في نفس الموعد</small></span></label><button className="save-button" disabled={!canSave} onClick={() => onSave({ id: Date.now(), title, category, person, amount: Number(amount), time: "الآن", icon: Receipt, iconClass: "green" })}>حفظ المصروف <Check size={18} /></button></div></div>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("الرئيسية");
  const [isDark, setIsDark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactions);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const pageTitle = useMemo(() => activeTab === "الرئيسية" ? "أهلاً يا أحمد" : activeTab, [activeTab]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((current) => [transaction, ...current]);
    setIsModalOpen(false);
    toast.success("تم حفظ المصروف بنجاح", { description: `${transaction.title} · ${formatEGP(transaction.amount)}` });
  };

  const renderView = () => {
    if (activeTab === "المصاريف") return <ExpensesView transactions={transactions} onAdd={() => setIsModalOpen(true)} />;
    if (activeTab === "الأهداف") return <GoalsView onAdd={() => toast("نموذج إضافة هدف جديد جاهز قريباً")} />;
    if (activeTab === "التقارير") return <ReportsView />;
    if (activeTab === "المزيد") return <MoreView isDark={isDark} setIsDark={setIsDark} />;
    return <><div className="welcome-row animate-in"><div><span className="eyebrow">الثلاثاء، ١ سبتمبر ٢٠٢٦</span><h1>{pageTitle} <span>👋</span></h1><p>دي نظرة سريعة على فلوس البيت النهارده.</p></div><div className="header-actions"><button className="notification-button" onClick={() => toast("مفيش تنبيهات جديدة") }><Bell size={19} /><i /></button><button className="avatar-button" onClick={() => setActiveTab("المزيد")}>أ</button></div></div><Overview onAdd={() => setIsModalOpen(true)} transactions={transactions} onNavigate={setActiveTab} /></>;
  };

  return <div className="app-shell" dir="rtl"><header className="topbar"><div className="brand"><LogoMark /><div><strong>بيتي</strong><span>ميزانية البيت</span></div></div><nav className="desktop-nav" aria-label="التنقل الرئيسي">{navItems.map(({ label, icon: Icon }) => <button className={activeTab === label ? "active" : ""} key={label} onClick={() => setActiveTab(label)}><Icon size={16} />{label}</button>)}</nav><div className="topbar-actions"><button className="theme-button" onClick={() => setIsDark(!isDark)} aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</button><div className="header-line" /><span className="sync-status"><span className="sync-dot" /> متزامن</span></div></header><main className="main-content">{renderView()}</main><div className="mobile-tabbar">{navItems.map(({ label, icon: Icon }) => <button className={activeTab === label ? "active" : ""} key={label} onClick={() => setActiveTab(label)}><Icon size={20} /><span>{label}</span></button>)}</div>{isModalOpen && <AddExpenseModal onClose={() => setIsModalOpen(false)} onSave={addTransaction} />}</div>;
}
