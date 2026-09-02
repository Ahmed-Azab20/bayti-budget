import { useState } from "react";
import { ArrowRight, Check, Cloud, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, WalletCards } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) return toast.error("اكتب البريد الإلكتروني وكلمة المرور أولاً");
    setLoading(true);
    window.setTimeout(() => { setLoading(false); toast.success("واجهة الدخول جاهزة للربط بالسحابة"); }, 650);
  };

  return <main className="login-page" dir="rtl"><div className="login-decoration decoration-one" /><div className="login-decoration decoration-two" /><section className="login-intro"><div className="login-brand"><div className="logo-mark"><WalletCards size={21} /></div><div><strong>بيتي</strong><span>ميزانية البيت</span></div></div><div className="login-message"><span className="eyebrow">بياناتك معاك في كل مكان</span><h1>نظّم فلوس بيتك،<br /><em>واطمن عليها.</em></h1><p>سجّل دخولك عشان نزامن مصاريفك وأهدافك بين الموبايل والويب بأمان.</p><div className="trust-points"><span><Check size={14} /> تعمل أوفلاين حتى بدون نت</span><span><ShieldCheck size={14} /> بياناتك مشفرة ومحمية</span><span><Cloud size={14} /> مزامنة تلقائية عند الاتصال</span></div></div><div className="login-intro-footer">١٠٠٪ تحكم في بياناتك · تقدر تصدّر نسخة في أي وقت</div></section><section className="login-card-wrap"><div className="login-card"><button className="back-link" onClick={() => window.location.href = "/"}><ArrowRight size={16} /> الرجوع للتطبيق</button><div className="login-card-heading"><div className="login-small-icon"><LockKeyhole size={19} /></div><span className="eyebrow">مساحتك الآمنة</span><h2>أهلاً بعودتك</h2><p>ادخل عشان تكمل متابعة ميزانية بيتك.</p></div><button className="google-button" onClick={() => toast("سيتم تفعيل الدخول بجوجل مع ربط الحسابات")}><span className="google-g">G</span> الدخول باستخدام حساب Google</button><div className="or-divider"><span>أو باستخدام البريد الإلكتروني</span></div><form onSubmit={submit}><label className="login-field"><span>البريد الإلكتروني</span><div><Mail size={17} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" autoComplete="email" /></div></label><label className="login-field"><span>كلمة المرور</span><div><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="إظهار كلمة المرور">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label><div className="login-options"><label><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /><span className="checkmark"><Check size={12} /></span> تذكرني</label><button type="button" onClick={() => toast("رابط استعادة كلمة المرور سيُرسل هنا")}>نسيت كلمة المرور؟</button></div><button className="login-submit" type="submit" disabled={loading}>{loading ? "جاري التحقق..." : "تسجيل الدخول"}</button></form><p className="signup-note">لسه معندكش حساب؟ <button onClick={() => toast("واجهة إنشاء الحساب ستُضاف مع ربط السحابة")}>إنشاء حساب جديد</button></p></div><p className="login-legal">بتسجيل الدخول أنت توافق على شروط الاستخدام وسياسة الخصوصية.</p></section></main>;
}
