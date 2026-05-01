import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import { Calendar, MapPin, Clock, Phone, Flame, Users, Download, CheckCircle } from "lucide-react";
import awakeningImg from "@/assets/event-awakening-night.jpg";
import macImg from "@/assets/event-mac-2026.jpg";
import logo from "@/assets/logo.jpg";

type EventInfo = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  enquiry: string[];
  image: string;
  description: string;
  whatsappNumber: string;
};

const EVENTS: EventInfo[] = [
  {
    id: "great-awakening",
    title: "The Great Awakening Night 2026",
    subtitle: "With Prophet Epas",
    date: "29th May 2026",
    time: "20:00 – 05:00",
    venue: "Government Complex",
    enquiry: ["0976747922", "0964665799"],
    image: awakeningImg,
    description:
      "An all-night encounter of worship, prophecy, deliverance and the raw power of the Holy Ghost. Come expecting a move of God that will shift your destiny forever.",
    whatsappNumber: "260976747922",
  },
  {
    id: "mac-2026",
    title: "Ministers Awakening Conference",
    subtitle: "With Prophet Epas",
    date: "30th May 2026",
    time: "14:00 – 17:00",
    venue: "Ndozo Lodge 2",
    enquiry: ["+260976747922"],
    image: macImg,
    description:
      "A gathering strictly by registration for ministers, leaders and sons of the prophets. Receive impartation, strategy and fresh fire for your assignment.",
    whatsappNumber: "260976747922",
  },
];

function GuestCardCanvas({
  guestName,
  event,
  canvasRef,
}: {
  guestName: string;
  event: EventInfo;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  return <canvas ref={canvasRef} width={900} height={500} className="hidden" />;
}

function drawGuestCard(
  canvas: HTMLCanvasElement,
  guestName: string,
  event: EventInfo
) {
  const ctx = canvas.getContext("2d")!;
  const w = canvas.width;
  const h = canvas.height;

  // Background – dark maroon
  ctx.fillStyle = "#1a0508";
  ctx.fillRect(0, 0, w, h);

  // Flame gradient stripe on left
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#a32035");
  grad.addColorStop(1, "#6b1520");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 8, h);

  // Gold accent line
  ctx.fillStyle = "#d4a017";
  ctx.fillRect(8, 0, 3, h);

  // Header
  ctx.fillStyle = "#d4a017";
  ctx.font = "bold 14px Inter, sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("SPIRIT FILLED MINISTRY", 40, 45);

  // GUEST CARD label
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 36px Cinzel, serif";
  ctx.fillText("GUEST CARD", 40, 95);

  // Divider
  ctx.fillStyle = "#d4a017";
  ctx.fillRect(40, 115, 200, 3);

  // Guest name
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 28px Inter, sans-serif";
  ctx.fillText(guestName.toUpperCase(), 40, 170);

  // Event title
  ctx.fillStyle = "#d4a017";
  ctx.font = "bold 20px Cinzel, serif";
  ctx.fillText(event.title, 40, 220);

  // Details
  ctx.fillStyle = "#cccccc";
  ctx.font = "16px Inter, sans-serif";
  const details = [
    `📅  Date: ${event.date}`,
    `🕐  Time: ${event.time}`,
    `📍  Venue: ${event.venue}`,
    `📞  Enquiry: ${event.enquiry.join(", ")}`,
  ];
  details.forEach((line, i) => {
    ctx.fillText(line, 40, 270 + i * 32);
  });

  // Footer
  ctx.fillStyle = "#a32035";
  ctx.fillRect(0, h - 55, w, 55);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 13px Inter, sans-serif";
  ctx.fillText("www.spiritfilledministry.org  |  info@spiritfilledministry.org", 40, h - 22);

  // Right side decorative gradient
  const rGrad = ctx.createLinearGradient(w - 250, 0, w, 0);
  rGrad.addColorStop(0, "rgba(163,32,53,0)");
  rGrad.addColorStop(1, "rgba(163,32,53,0.35)");
  ctx.fillStyle = rGrad;
  ctx.fillRect(w - 250, 0, 250, h - 55);

  // Right side text
  ctx.save();
  ctx.translate(w - 30, h / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "rgba(212,160,23,0.5)";
  ctx.font = "bold 48px Cinzel, serif";
  ctx.textAlign = "center";
  ctx.fillText("SFM", 0, 0);
  ctx.restore();
}

function RegistrationForm({ event }: { event: EventInfo }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("0");
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  }

  function downloadCard() {
    if (!canvasRef.current) return;
    drawGuestCard(canvasRef.current, name, event);
    const link = document.createElement("a");
    link.download = `SFM-Guest-Card-${name.replace(/\s+/g, "-")}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  function goToWhatsApp() {
    const msg = encodeURIComponent(
      `Hello, I have registered for *${event.title}*.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || "N/A"}\nGuests: ${guests}\n\nPlease confirm my registration. Thank you!`
    );
    window.open(`https://wa.me/${event.whatsappNumber}?text=${msg}`, "_blank");
  }

  if (submitted) {
    return (
      <div className="bg-background rounded-2xl p-6 sm:p-8 border border-border shadow-elegant text-center space-y-5">
        <GuestCardCanvas guestName={name} event={event} canvasRef={canvasRef} />
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
        <h3 className="font-display font-black text-2xl">Registration Successful!</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Thank you, <strong>{name}</strong>. Please confirm your registration on WhatsApp and download your Guest Card below.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={goToWhatsApp}
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Confirm on WhatsApp
          </button>
          <button
            onClick={downloadCard}
            className="inline-flex items-center justify-center gap-2 bg-gradient-flame text-primary-foreground px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider shadow-flame hover:scale-105 transition-transform"
          >
            <Download className="w-4 h-4" /> Download Guest Card
          </button>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-muted-foreground underline"
        >
          Register another person
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-background rounded-2xl p-6 sm:p-8 border border-border shadow-elegant space-y-4">
      <h3 className="font-display font-black text-xl flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" /> Register Now
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Full Name *</label>
          <input
            type="text"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Phone Number *</label>
          <input
            type="tel"
            required
            maxLength={20}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
            placeholder="+260..."
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Email (Optional)</label>
          <input
            type="email"
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Number of Guests</label>
          <input
            type="number"
            min="0"
            max="50"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-flame text-primary-foreground py-3.5 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
      >
        <Flame className="w-4 h-4" /> Complete Registration
      </button>
      <p className="text-xs text-muted-foreground text-center">
        After registering you will be redirected to WhatsApp to confirm your details.
      </p>
    </form>
  );
}

export default function UpcomingPrograms() {
  return (
    <Layout>
      <HeroBanner
        variant="gallery"
        eyebrow="Upcoming Programs"
        title={<>Upcoming <span className="text-gradient-flame">Events</span></>}
        caption="Register for our next Spirit-filled gatherings. Don't miss what God is about to do."
      />

      {EVENTS.map((event, idx) => (
        <section
          key={event.id}
          className={`py-16 sm:py-24 ${idx % 2 === 0 ? "bg-muted" : "bg-background"}`}
        >
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Event Poster */}
              <div className="order-2 lg:order-1">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-elegant"
                />
              </div>

              {/* Event Details + Registration */}
              <div className="order-1 lg:order-2 space-y-6">
                <div>
                  <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">
                    {event.subtitle}
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl mt-2 mb-4">
                    {event.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {event.description}
                  </p>
                </div>

                {/* Info cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background border border-border rounded-xl p-4 flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Date</div>
                      <div className="font-bold text-sm">{event.date}</div>
                    </div>
                  </div>
                  <div className="bg-background border border-border rounded-xl p-4 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Time</div>
                      <div className="font-bold text-sm">{event.time}</div>
                    </div>
                  </div>
                  <div className="bg-background border border-border rounded-xl p-4 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Venue</div>
                      <div className="font-bold text-sm">{event.venue}</div>
                    </div>
                  </div>
                  <div className="bg-background border border-border rounded-xl p-4 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Enquiry</div>
                      <div className="font-bold text-sm break-all">{event.enquiry.join(", ")}</div>
                    </div>
                  </div>
                </div>

                {/* Registration Form */}
                <RegistrationForm event={event} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </Layout>
  );
}