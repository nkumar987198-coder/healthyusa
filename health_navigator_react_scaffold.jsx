/*
HealthNavigator - Single-file React scaffold (App.jsx)
- Tailwind CSS utility classes used (no import needed in this scaffold preview)
- Uses React Router style routing within a single component structure
- Shadcn/ui components may be referenced in comments; feel free to replace

What this file includes:
- App shell with 6 main tabs: Home, Search, Appointments, Symptoms, Emergency, More
- Each advanced feature has its own page component reachable from More
- Mock API hooks / placeholders to wire up real backend endpoints
- Guidance comments for backend endpoints, DB schema, and integrations (GoodRx, SingleCare, Stripe for rewards, telehealth video, etc.)

How to use:
1) Paste this into a React app (e.g. Vite or Create React App) at src/App.jsx
2) Install dependencies: react-router-dom, tailwindcss, @headlessui/react (optional), lucide-react (optional)
3) Add Tailwind config and include tailwind directives in index.css
4) Implement backend endpoints for /api/* used below or replace with real services

NOTE: This scaffold focuses on structure and UX placeholders — integrate with secure backend and HIPAA-compliant services for production.
*/

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'

// Simple icon placeholders
const Icon = ({ children }) => <span className="inline-block w-6 h-6 text-xl align-middle">{children}</span>

function AppShell() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="bg-white border-b p-4 sticky top-0 z-20">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Health Navigator</h1>
            <nav className="space-x-2 text-sm text-slate-600">
              <Link to="/">Home</Link>
              <Link to="/search">Search</Link>
              <Link to="/appointments">Appointments</Link>
              <Link to="/symptoms">Symptoms</Link>
              <Link to="/emergency">Emergency</Link>
              <Link to="/more">More</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/more" element={<More />} />

            {/* Advanced feature pages */}
            <Route path="/more/prescriptions" element={<PrescriptionPriceFinder />} />
            <Route path="/more/bill-decoder" element={<AIBillDecoder />} />
            <Route path="/more/wallet" element={<HealthWallet />} />
            <Route path="/more/mental" element={<MentalHealth />} />
            <Route path="/more/coach" element={<AILifestyleCoach />} />
            <Route path="/more/community" element={<CommunityQA />} />
            <Route path="/more/rewards" element={<HealthRewards />} />
            <Route path="/more/premium" element={<Premium />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="max-w-5xl mx-auto p-3 flex justify-between items-center">
            <nav className="flex gap-4 w-full justify-between">
              <NavItem to="/" label="Home" icon={<Icon>🏠</Icon>} />
              <NavItem to="/search" label="Search" icon={<Icon>🔍</Icon>} />
              <NavItem to="/appointments" label="Appt" icon={<Icon>📅</Icon>} />
              <NavItem to="/symptoms" label="Symptoms" icon={<Icon>🩺</Icon>} />
              <NavItem to="/emergency" label="Emergency" icon={<Icon>🚨</Icon>} />
              <NavItem to="/more" label="More" icon={<Icon>⋯</Icon>} />
            </nav>
          </div>
        </footer>
      </div>
    </Router>
  )
}

function NavItem({ to, label, icon }) {
  return (
    <Link to={to} className="flex-1 text-center py-2 text-xs text-slate-700 hover:text-slate-900">
      <div className="flex flex-col items-center">{icon}<span className="mt-1">{label}</span></div>
    </Link>
  )
}

function Home() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <p className="text-sm text-slate-600">Quick view of appointments, active prescriptions, and next actions.</p>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Card title="Next Appointment" subtitle="Dr. Mehta — Oct 30, 11:00 AM" />
          <Card title="Active Prescriptions" subtitle="3 medications" />
          <Card title="Steps Today" subtitle="4,200" />
          <Card title="Rewards" subtitle="420 pts" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <QuickAction title="Price Check" to="/more/prescriptions" />
        <QuickAction title="Decode Bill" to="/more/bill-decoder" />
        <QuickAction title="Emergency" to="/emergency" />
      </div>
    </div>
  )
}

function Card({ title, subtitle }) {
  return (
    <div className="bg-slate-50 p-3 rounded border">
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-slate-500">{subtitle}</div>
    </div>
  )
}

function QuickAction({ title, to }) {
  return (
    <Link to={to} className="bg-white p-4 rounded-lg shadow hover:shadow-md">
      <div className="font-medium">{title}</div>
    </Link>
  )
}

function Search() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Find Providers</h2>
      <ProviderSearch />
    </div>
  )
}

function ProviderSearch() {
  // TODO: connect to backend /api/providers?q=&filters=
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <input className="w-full p-2 border rounded" placeholder="Search by name, specialty or location" />
      <div className="mt-3">
        <FilterChips />
        <ul className="mt-2 space-y-2">
          <li className="p-2 border rounded">Dr. A — Cardiology — In-network</li>
          <li className="p-2 border rounded">Clinic B — Urgent Care — 2.3 mi</li>
        </ul>
      </div>
    </div>
  )
}

function FilterChips(){
  return (<div className="flex gap-2">
    <button className="px-2 py-1 border rounded">In-network</button>
    <button className="px-2 py-1 border rounded">Telehealth</button>
    <button className="px-2 py-1 border rounded">Pediatrics</button>
  </div>)
}

function Appointments(){
  // TODO: integrate calendar sync and telehealth link
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Appointments</h2>
      <div className="bg-white p-4 rounded shadow-sm">
        <AppointmentItem />
      </div>
    </div>
  )
}

function AppointmentItem(){
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="font-medium">Dr. Patel — Annual Checkup</div>
        <div className="text-xs text-slate-500">Dec 10, 2025 • 9:30 AM</div>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 border rounded">Details</button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded">Start Telehealth</button>
      </div>
    </div>
  )
}

function Symptoms(){
  // AI symptom checker placeholder
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">AI Symptom Checker</h2>
      <div className="bg-white p-4 rounded shadow-sm">
        <SymptomForm />
      </div>
    </div>
  )
}

function SymptomForm(){
  // TODO: POST to /api/symptoms/check
  return (
    <form onSubmit={(e)=>{e.preventDefault(); alert('Run AI symptom check (stub)')}}>
      <textarea className="w-full p-2 border rounded" placeholder="Describe symptoms, duration, severity..."></textarea>
      <div className="mt-3 flex gap-2">
        <button className="px-4 py-2 bg-green-600 text-white rounded">Check</button>
        <button type="button" className="px-4 py-2 border rounded">Clear</button>
      </div>
    </form>
  )
}

function Emergency(){
  // Enhanced emergency page with wait times
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Emergency & Urgent Care</h2>
      <div className="bg-white p-4 rounded shadow-sm">
        <p className="text-sm text-slate-600">Nearby ERs and urgent care — live wait times (mock data).</p>
        <WaitTimes />
      </div>
    </div>
  )
}

function WaitTimes(){
  // TODO: integrate with HCF/health system APIs or crowdsourced data
  const locations = [
    {name: 'St. Mary\'s ER', wait: '15 min', urgency: 'low', dist: '1.6 mi'},
    {name: 'City Urgent Care', wait: '45 min', urgency: 'moderate', dist: '2.1 mi'},
    {name: 'North Hospital', wait: '120+ min', urgency: 'high', dist: '5.4 mi'}
  ]
  return (
    <ul className="mt-3 space-y-2">
      {locations.map(loc=> (
        <li key={loc.name} className="p-3 border rounded flex justify-between items-center">
          <div>
            <div className="font-medium">{loc.name}</div>
            <div className="text-xs text-slate-500">{loc.dist} • {loc.urgency}</div>
          </div>
          <div className="text-sm font-semibold">{loc.wait}</div>
        </li>
      ))}
    </ul>
  )
}

function More() {
  const features = [
    {slug: 'prescriptions', title: 'Prescription Price Finder'},
    {slug: 'bill-decoder', title: 'AI Bill Decoder'},
    {slug: 'wallet', title: 'Health Wallet'},
    {slug: 'mental', title: 'Mental Health'},
    {slug: 'coach', title: 'AI Lifestyle Coach'},
    {slug: 'community', title: 'Community Q&A'},
    {slug: 'rewards', title: 'Health Rewards'},
    {slug: 'premium', title: 'Premium Plan'},
  ]
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">More Tools</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {features.map(f=> (
          <Link key={f.slug} to={`/more/${f.slug}`} className="bg-white p-4 rounded shadow-sm block">{f.title}</Link>
        ))}
      </div>
    </div>
  )
}

// ---------------- Advanced feature stubs ----------------

function PrescriptionPriceFinder(){
  // Integrate: GoodRx API (or scrape partners), pharmacy price APIs, in-network checks via insurer APIs
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Prescription Price Finder</h2>
      <p className="text-sm text-slate-600">Compare prices across pharmacies and view discounts.</p>
      <div className="bg-white p-4 rounded">
        <input className="w-full p-2 border rounded" placeholder="Search medication (e.g. Lisinopril)" />
        <div className="mt-3">Sample results (mock):</div>
        <ul className="mt-2 space-y-2">
          <li className="p-3 border rounded">Walmart: $8 — Save 60% (with coupon)</li>
          <li className="p-3 border rounded">CVS: $12 — In-network</li>
          <li className="p-3 border rounded">Walgreens: $13 — GoodRx coupon</li>
        </ul>
      </div>
    </div>
  )
}

function AIBillDecoder(){
  // Integrate: OCR (Tesseract / commercial OCR), then call an AI model to parse and explain
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">AI Bill Decoder</h2>
      <p className="text-sm text-slate-600">Upload a bill (PDF or photo) and get plain-English explanations.</p>
      <div className="bg-white p-4 rounded">
        <input type="file" />
        <div className="mt-3 text-sm text-slate-500">Uploaded bills are parsed and shown line-by-line with flags for potential errors.</div>
      </div>
    </div>
  )
}

function HealthWallet(){
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Health Wallet</h2>
      <div className="bg-white p-4 rounded">
        <p className="text-sm text-slate-600">Digital insurance cards, vaccination records, prescriptions, and secure docs.</p>
        <ul className="mt-3 space-y-2">
          <li className="p-2 border rounded">Insurance Card — Provider: BestHealth</li>
          <li className="p-2 border rounded">Vaccination — COVID-19 — Completed</li>
          <li className="p-2 border rounded">Prescription — Metformin — Active</li>
        </ul>
      </div>
    </div>
  )
}

function MentalHealth(){
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Mental Health</h2>
      <div className="bg-white p-4 rounded">
        <p className="text-sm text-slate-600">Mood tracker, breathing guides, therapist search and crisis hotlines.</p>
        <div className="mt-3">
          <button className="px-3 py-1 border rounded">Start Mood Entry</button>
          <button className="px-3 py-1 border rounded ml-2">Breathing Exercises</button>
        </div>
      </div>
    </div>
  )
}

function AILifestyleCoach(){
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">AI Lifestyle Coach</h2>
      <p className="text-sm text-slate-600">Goals, wearables sync, and AI insights.</p>
      <div className="bg-white p-4 rounded">
        <p className="text-sm">Today's progress: Steps 4,200 / 8,000 • Water 5/8 cups</p>
      </div>
    </div>
  )
}

function CommunityQA(){
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Community Q&A</h2>
      <div className="bg-white p-4 rounded">
        <p className="text-sm text-slate-600">Post anonymously, filter by topic, and see verified answers.</p>
        <ul className="mt-3 space-y-2">
          <li className="p-2 border rounded">How do I refill my prescription? — Answered by Pharmacist (verified)</li>
        </ul>
      </div>
    </div>
  )
}

function HealthRewards(){
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Health Rewards</h2>
      <div className="bg-white p-4 rounded">
        <p className="text-sm text-slate-600">Earn points for checkups, vaccines, and adherence. Redeem for gift cards.</p>
        <ul className="mt-3 space-y-2">
          <li className="p-2 border rounded">Complete Annual Checkup — 200 pts</li>
          <li className="p-2 border rounded">7-day Step Streak — 50 pts</li>
        </ul>
      </div>
    </div>
  )
}

function Premium() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Premium Membership</h2>
      <p className="text-sm text-slate-600">Unlock advanced AI tools, unlimited bill decoding, and exclusive rewards.</p>

      <div className="bg-white p-5 rounded-xl shadow border space-y-3">
        <h3 className="text-lg font-semibold">Pricing</h3>
        <ul className="text-sm space-y-2">
          <li className="p-3 border rounded flex justify-between items-center"><span>Monthly Plan</span><span className="font-bold">$20/mo</span></li>
          <li className="p-3 border rounded flex justify-between items-center bg-slate-50 font-medium"><span>Yearly Plan <span className="text-green-600">(Save $40)</span></span><span className="font-bold">$200/yr</span></li>
        </ul>
        <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-medium">Upgrade Now</button>
      </div>

      <div className="bg-white p-5 rounded-xl shadow border space-y-2">
        <h3 className="text-lg font-semibold">Premium Features</h3>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Unlimited AI Bill Decoder Usage</li>
          <li>Telehealth HD Video Calls</li>
          <li>Advanced symptom insights & risk analysis</li>
          <li>Premium Community Expert Responses</li>
          <li>Double Rewards Points Boost</li>
        </ul>
      </div>
    </div>
  )
}

function NotFound(){
  return <div className="text-center py-10">Page not found</div>
}

export default function App(){
  return <AppShell />
}

/*
----------------- Backend & Integration Guidance (copy into your backend README) -----------------
Suggested stack:
- Backend: Node.js (Express) or Python (FastAPI)
- Database: PostgreSQL (for relational data) + Redis (caching)
- File storage: S3-compatible (for medical documents)
- Auth: OAuth2 / OpenID Connect, tie to insurer federated identity if possible
- Compliance: Ensure HIPAA compliance for PHI (BAA with cloud providers, encrypted storage, audit logging)

Key API endpoints (examples):
- POST /api/auth/login
- GET /api/providers?q=&filters=
- GET /api/prescriptions/price?drug=...
- POST /api/bills/parse  (accepts multipart/form-data with file)
- GET /api/emergency/wait-times?lat=&lng=
- GET /api/user/wallet
- POST /api/rewards/claim
- POST /api/community/post

Database schema (simplified):
- users(id, name, email, hashed_password, insurer_id, created_at)
- providers(id, name, specialty, address, in_network boolean, metadata json)
- prescriptions(id, user_id, drug_name, ndc, active boolean, pharmacy_data json)
- bills(id, user_id, file_path, parsed_json, flags json)
- rewards(id, user_id, points, transactions json)
- community_posts(id, user_id_or_anonymous, topic, body, replies json, verified boolean)

Third-party integrations to consider:
- GoodRx / SingleCare / RxSaver (price data)
- OCR: Tesseract (open) or Google Vision / AWS Textract for higher quality
- LLM / AI: OpenAI / Anthropic for natural language explanations (ensure de-identification if required)
- Telehealth video: Jitsi / Twilio Programmable Video / Vonage
- Wearables: Apple HealthKit, Google Fit (server-side tokens, user consent)
- Payments/Rewards redemption: Stripe Connect, gift card APIs

Security & Privacy:
- Encrypt PHI at rest and in transit (TLS)
- Role-based access control, audit logging
- Data minimization for AI calls — redact PHI before sending to external LLMs unless covered by BAA and policies

Dev notes:
- Start by wiring the frontend to mocked JSON endpoints. Build the bill-decoder pipeline (OCR -> parser -> LLM) in backend in stages.
- For prescription pricing, aggregate pharmacy feeds into a normalized price table and compute savings compared to cash price.

-----------------------------------------------------------------------------------------------
*/
